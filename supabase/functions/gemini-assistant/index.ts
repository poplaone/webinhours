import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DAILY_LIMIT = 10;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_GEMINI_API_KEY = Deno.env.get('GOOGLE_GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GOOGLE_GEMINI_API_KEY) {
      throw new Error('GOOGLE_GEMINI_API_KEY is not configured');
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authentication' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check rate limit
    const { data: canProceed, error: rateLimitError } = await supabase.rpc(
      'check_and_increment_ai_usage',
      { p_user_id: user.id, p_daily_limit: DAILY_LIMIT }
    );

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      throw new Error('Failed to check rate limit');
    }

    if (!canProceed) {
      // Get remaining credits for message
      const { data: remaining } = await supabase.rpc(
        'get_remaining_ai_credits',
        { p_user_id: user.id, p_daily_limit: DAILY_LIMIT }
      );
      
      return new Response(JSON.stringify({ 
        error: 'Daily AI limit reached',
        remainingCredits: remaining || 0,
        dailyLimit: DAILY_LIMIT
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch websites from database for context
    const { data: websites, error: websitesError } = await supabase
      .from('websites')
      .select('id, title, description, category, tags, price, preview_url, features')
      .in('status', ['approved', 'featured'])
      .limit(50);

    if (websitesError) {
      console.error('Error fetching websites:', websitesError);
    }

    // Fetch AI agents for context
    const { data: agents, error: agentsError } = await supabase
      .from('ai_agents')
      .select('id, title, description, category, tags, price, preview_url, features, agent_type')
      .in('status', ['approved', 'featured'])
      .limit(50);

    if (agentsError) {
      console.error('Error fetching AI agents:', agentsError);
    }

    const websiteContext = (websites || []).map(w => 
      `- ${w.title} (${w.category}): ${w.description?.slice(0, 100) || 'No description'}... Tags: ${w.tags?.join(', ') || 'none'}. Price: $${w.price}. ID: ${w.id}`
    ).join('\n');

    const agentContext = (agents || []).map(a => 
      `- ${a.title} (${a.category}, ${a.agent_type}): ${a.description?.slice(0, 100) || 'No description'}... Tags: ${a.tags?.join(', ') || 'none'}. Price: $${a.price}. ID: ${a.id}`
    ).join('\n');

    const systemPrompt = `You are WebInHours AI Assistant, a specialized assistant ONLY for WebInHours marketplace services.

## CRITICAL RULE - STAY ON TOPIC:
You MUST ONLY answer questions about:
- WebInHours website templates and AI agents
- Pricing, features, and comparisons of our products
- How to purchase, download, or use our products
- Technical support for WebInHours products
- Customization options for our templates
- Our marketplace categories and navigation

If a user asks about ANYTHING else (general knowledge, other websites, coding help unrelated to our products, news, weather, personal advice, etc.), politely decline and redirect:
"I'm specifically designed to help with WebInHours marketplace services. I can help you find website templates, AI agents, or answer questions about our products. What would you like to explore?"

## Your Capabilities:
1. **Website Discovery**: Help users find website templates based on their industry, style preferences, and requirements
2. **AI Agent Recommendations**: Suggest AI agents/chatbots that match user needs
3. **Comparison**: Compare different WebInHours options and explain their strengths
4. **Navigation**: Guide users to specific marketplace sections or categories
5. **Product Support**: Answer questions about purchasing, downloading, and using our products

## Available Website Templates:
${websiteContext || 'No websites currently available.'}

## Available AI Agents:
${agentContext || 'No AI agents currently available.'}

## Response Guidelines:
- Be concise and helpful (2-3 sentences max unless comparing options)
- When recommending items, include the ID in format: [VIEW:type:id] e.g., [VIEW:website:abc123] or [VIEW:agent:xyz789]
- For navigation requests, use format: [NAVIGATE:path] e.g., [NAVIGATE:/marketplace?category=ecommerce]
- NEVER answer off-topic questions - always redirect to WebInHours services

## Important:
- Only recommend items that exist in the provided lists
- If you can't find a match, say so and suggest alternatives from our marketplace
- Never make up items that don't exist
- REFUSE to discuss topics unrelated to WebInHours services`;

    // Build conversation for Gemini
    const geminiContents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: 'I understand. I am WebInHours AI Assistant ready to help users navigate the marketplace and find the perfect website templates and AI agents for their needs.' }] },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    console.log('Calling Gemini API...');
    
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ]
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received');

    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I could not generate a response. Please try again.';

    // Get remaining credits after this request
    const { data: remainingCredits } = await supabase.rpc(
      'get_remaining_ai_credits',
      { p_user_id: user.id, p_daily_limit: DAILY_LIMIT }
    );

    return new Response(JSON.stringify({ 
      response: responseText,
      remainingCredits: remainingCredits || 0,
      dailyLimit: DAILY_LIMIT
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-assistant:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
