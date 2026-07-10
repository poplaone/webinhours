DROP TABLE IF EXISTS public.ai_agents CASCADE;
DROP TABLE IF EXISTS public.ai_usage_limits CASCADE;

DROP FUNCTION IF EXISTS public.check_ai_rate_limit CASCADE;
DROP FUNCTION IF EXISTS public.check_and_increment_ai_usage CASCADE;
DROP FUNCTION IF EXISTS public.get_remaining_ai_credits CASCADE;
DROP FUNCTION IF EXISTS public.update_ai_agents_updated_at CASCADE;
