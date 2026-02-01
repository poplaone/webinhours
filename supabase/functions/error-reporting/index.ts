import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ErrorReport {
  type: 'js_error' | 'resource_error' | 'unhandled_rejection' | 'chunk_load_error';
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json() as ErrorReport;

    // Validate required fields
    if (!body.type || !body.message || !body.url) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type, message, url' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize and validate inputs
    const sanitizedReport: ErrorReport = {
      type: ['js_error', 'resource_error', 'unhandled_rejection', 'chunk_load_error'].includes(body.type) 
        ? body.type 
        : 'js_error',
      message: String(body.message).slice(0, 2000), // Limit message length
      stack: body.stack ? String(body.stack).slice(0, 5000) : undefined,
      url: String(body.url).slice(0, 500),
      userAgent: String(body.userAgent || 'unknown').slice(0, 500),
      timestamp: body.timestamp || new Date().toISOString(),
      metadata: body.metadata ? JSON.parse(JSON.stringify(body.metadata)) : undefined,
    };

    // Log the error for monitoring (these appear in edge function logs)
    console.error(`[ERROR_REPORT] ${sanitizedReport.type}:`, {
      message: sanitizedReport.message,
      url: sanitizedReport.url,
      userAgent: sanitizedReport.userAgent,
      timestamp: sanitizedReport.timestamp,
      stack: sanitizedReport.stack?.split('\n').slice(0, 5).join('\n'), // First 5 stack lines
      metadata: sanitizedReport.metadata,
    });

    // Detect critical errors (chunk load failures, MIME type issues)
    const isCritical = 
      sanitizedReport.type === 'chunk_load_error' ||
      sanitizedReport.message.includes('MIME type') ||
      sanitizedReport.message.includes('forwardRef') ||
      sanitizedReport.message.includes('Failed to load module script');

    if (isCritical) {
      console.error(`[CRITICAL_ERROR] Production white screen risk detected:`, {
        type: sanitizedReport.type,
        message: sanitizedReport.message,
        url: sanitizedReport.url,
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Error reported successfully',
        critical: isCritical,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('[ERROR_REPORTING_FAILED]', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
