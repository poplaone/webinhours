import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const startTime = Date.now();
    const { message, action, context } = await req.json();
    
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Check rate limit
    const { data: rateLimitCheck } = await supabaseClient.rpc('check_ai_rate_limit', {
      _user_id: user.id,
      _action_type: action || 'read_data',
      _max_requests: 20,
      _window_minutes: 60
    });

    if (!rateLimitCheck) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // System prompt for AI decision making
    const systemPrompt = `You are an intelligent assistant that helps users with their website marketplace platform. 
Your capabilities include:
1. Creating support tickets for user issues
2. Recommending templates and content based on user needs
3. Answering questions about features and pricing
4. Analyzing user requests and providing helpful responses

When responding, use structured JSON format for actions:
- For creating tickets: { "action": "create_ticket", "title": "...", "description": "...", "priority": "high|medium|low", "category": "..." }
- For recommendations: { "action": "recommend_content", "recommendations": [...], "reasoning": "..." }
- For general help: { "action": "assist", "response": "..." }

Always be helpful, professional, and concise. Include context from the user's history when relevant.`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${message}\n\nContext: ${JSON.stringify(context || {})}` }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiDecision = aiData.choices?.[0]?.message?.content || '';

    // Parse AI decision
    let parsedDecision;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiDecision.match(/\{[\s\S]*\}/);
      parsedDecision = jsonMatch ? JSON.parse(jsonMatch[0]) : { action: 'assist', response: aiDecision };
    } catch {
      parsedDecision = { action: 'assist', response: aiDecision };
    }

    // Log audit entry
    const auditLogEntry = {
      user_id: user.id,
      action_type: action || 'read_data',
      input_data: { message, context },
      ai_decision: parsedDecision,
      status: 'pending',
      execution_time_ms: Date.now() - startTime,
    };

    const { data: auditLog, error: auditError } = await supabaseClient
      .from('ai_audit_logs')
      .insert(auditLogEntry)
      .select()
      .single();

    if (auditError) {
      console.error('Audit log error:', auditError);
    }

    // Execute action based on AI decision
    let executionResult = null;
    let executionError = null;

    try {
      if (parsedDecision.action === 'create_ticket') {
        const { data: ticket, error: ticketError } = await supabaseClient
          .from('support_tickets')
          .insert({
            user_id: user.id,
            title: parsedDecision.title,
            description: parsedDecision.description,
            priority: parsedDecision.priority || 'medium',
            category: parsedDecision.category,
            ai_generated: true,
          })
          .select()
          .single();

        if (ticketError) throw ticketError;
        executionResult = { ticket };
      }
      
      // Update audit log with success
      if (auditLog) {
        await supabaseClient
          .from('ai_audit_logs')
          .update({
            status: 'completed',
            output_data: executionResult,
            completed_at: new Date().toISOString(),
          })
          .eq('id', auditLog.id);
      }
    } catch (error) {
      executionError = error.message;
      
      // Update audit log with failure
      if (auditLog) {
        await supabaseClient
          .from('ai_audit_logs')
          .update({
            status: 'failed',
            error_message: executionError,
            completed_at: new Date().toISOString(),
          })
          .eq('id', auditLog.id);
      }
    }

    return new Response(
      JSON.stringify({
        decision: parsedDecision,
        result: executionResult,
        error: executionError,
        auditLogId: auditLog?.id,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});