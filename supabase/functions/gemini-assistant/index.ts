import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DAILY_LIMIT = 10;

// Safe user-facing error messages
const getSafeErrorMessage = (status: number): string => {
  const errorMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please sign in.',
    403: 'Access denied.',
    404: 'Resource not found.',
    429: 'AI service rate limit exceeded. Please try again later.',
    402: 'AI service credits exhausted. Please contact support.',
    500: 'AI service temporarily unavailable. Please try again later.',
    502: 'AI service temporarily unavailable. Please try again later.',
    503: 'AI service temporarily unavailable. Please try again later.',
  };
  return errorMessages[status] || errorMessages[500];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('[SERVER] LOVABLE_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'AI service configuration error. Please contact support.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
      console.error('[SERVER] Rate limit check error:', rateLimitError);
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable. Please try again.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!canProceed) {
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

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate message length
    if (message.length > 2000) {
      return new Response(JSON.stringify({ error: 'Message is too long. Please keep it under 2000 characters.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract keywords from user message for smart filtering
    const extractKeywords = (text: string): string[] => {
      const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'and', 'but', 'if', 'or', 'because', 'until', 'while', 'about', 'against', 'i', 'me', 'my', 'myself', 'we', 'our', 'you', 'your', 'he', 'him', 'she', 'her', 'it', 'its', 'they', 'them', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'show', 'find', 'get', 'want', 'looking', 'need', 'help', 'please', 'thanks', 'thank', 'website', 'websites', 'template', 'templates', 'site', 'sites']);
      
      const words = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));
      
      return [...new Set(words)];
    };

    // Synonym expansion for common terms
    const synonymMap: Record<string, string[]> = {
      'ecommerce': ['ecommerce', 'e-commerce', 'shop', 'store', 'shopping', 'cart', 'retail', 'online store'],
      'restaurant': ['restaurant', 'food', 'cafe', 'dining', 'menu', 'eat', 'foodie', 'kitchen', 'bistro'],
      'portfolio': ['portfolio', 'showcase', 'work', 'creative', 'gallery', 'projects'],
      'business': ['business', 'company', 'corporate', 'agency', 'enterprise', 'firm'],
      'blog': ['blog', 'article', 'news', 'content', 'magazine', 'journal'],
      'landing': ['landing', 'launch', 'product', 'saas', 'startup', 'app'],
      'travel': ['travel', 'tourism', 'tour', 'vacation', 'hotel', 'booking', 'trip'],
      'health': ['health', 'medical', 'clinic', 'hospital', 'doctor', 'wellness', 'fitness'],
      'education': ['education', 'school', 'learning', 'course', 'training', 'academy'],
      'real estate': ['real estate', 'property', 'realty', 'housing', 'apartment', 'home'],
    };

    const expandKeywords = (keywords: string[]): string[] => {
      const expanded = new Set<string>(keywords);
      keywords.forEach(keyword => {
        Object.entries(synonymMap).forEach(([key, synonyms]) => {
          if (synonyms.some(s => keyword.includes(s) || s.includes(keyword))) {
            synonyms.forEach(s => expanded.add(s));
          }
        });
      });
      return Array.from(expanded);
    };

    const userKeywords = expandKeywords(extractKeywords(message));
    console.log('[SERVER] Extracted keywords:', userKeywords);

    // Fetch ALL websites first (exclude user_id for privacy)
    const { data: allWebsites, error: websitesError } = await supabase
      .from('websites')
      .select('id, title, description, category, tags, price, preview_url, features')
      .in('status', ['approved', 'featured']);

    if (websitesError) {
      console.error('[SERVER] Error fetching websites:', websitesError);
    }

    // Score and filter websites by relevance
    const scoreWebsite = (website: any): number => {
      let score = 0;
      const title = (website.title || '').toLowerCase();
      const description = (website.description || '').toLowerCase();
      const category = (website.category || '').toLowerCase();
      const tags = (website.tags || []).map((t: string) => t.toLowerCase()).join(' ');
      
      userKeywords.forEach(keyword => {
        if (title.includes(keyword)) score += 10;
        if (category.includes(keyword)) score += 8;
        if (tags.includes(keyword)) score += 6;
        if (description.includes(keyword)) score += 3;
      });
      
      return score;
    };

    // Sort by relevance and take top results
    const scoredWebsites = (allWebsites || [])
      .map(w => ({ ...w, score: scoreWebsite(w) }))
      .sort((a, b) => b.score - a.score);
    
    // Take top 30 relevant + some random for variety if keywords match
    const relevantWebsites = userKeywords.length > 0 
      ? scoredWebsites.filter(w => w.score > 0).slice(0, 30)
      : scoredWebsites.slice(0, 30);
    
    // If no matches found, show general selection
    const websites = relevantWebsites.length > 0 ? relevantWebsites : scoredWebsites.slice(0, 20);
    
    console.log(`[SERVER] Found ${allWebsites?.length || 0} total websites, returning ${websites.length} relevant ones`);

    // Fetch AI agents (similar approach - exclude user_id for privacy)
    const { data: allAgents, error: agentsError } = await supabase
      .from('ai_agents')
      .select('id, title, description, category, tags, price, preview_url, features, agent_type')
      .in('status', ['approved', 'featured']);

    if (agentsError) {
      console.error('[SERVER] Error fetching AI agents:', agentsError);
    }

    const scoreAgent = (agent: any): number => {
      let score = 0;
      const title = (agent.title || '').toLowerCase();
      const description = (agent.description || '').toLowerCase();
      const category = (agent.category || '').toLowerCase();
      const tags = (agent.tags || []).map((t: string) => t.toLowerCase()).join(' ');
      
      userKeywords.forEach(keyword => {
        if (title.includes(keyword)) score += 10;
        if (category.includes(keyword)) score += 8;
        if (tags.includes(keyword)) score += 6;
        if (description.includes(keyword)) score += 3;
      });
      
      return score;
    };

    const scoredAgents = (allAgents || [])
      .map(a => ({ ...a, score: scoreAgent(a) }))
      .sort((a, b) => b.score - a.score);
    
    const agents = userKeywords.length > 0
      ? scoredAgents.filter(a => a.score > 0).slice(0, 20)
      : scoredAgents.slice(0, 20);

    // Build context with compressed descriptions
    const websiteContext = websites.map(w => 
      `- ${w.title} (${w.category}): ${w.description?.slice(0, 80) || 'No description'}. Tags: ${w.tags?.slice(0, 5).join(', ') || 'none'}. $${w.price}. ID: ${w.id}`
    ).join('\n');

    const agentContext = agents.map(a => 
      `- ${a.title} (${a.category}): ${a.description?.slice(0, 80) || 'No description'}. $${a.price}. ID: ${a.id}`
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

    // Build messages for Lovable AI Gateway (OpenAI-compatible format)
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content.slice(0, 1000) // Limit history message length
      })),
      { role: 'user', content: message }
    ];

    console.log('[SERVER] Calling Lovable AI Gateway...');
    
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('[SERVER] Lovable AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'AI service rate limit exceeded. Please try again later.',
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'AI service credits exhausted. Please contact support.',
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      return new Response(JSON.stringify({ 
        error: getSafeErrorMessage(aiResponse.status),
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiData = await aiResponse.json();
    console.log('[SERVER] AI response received');

    const responseText = aiData.choices?.[0]?.message?.content || 
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
    console.error('[SERVER] Error in gemini-assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'An error occurred processing your request. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
