-- Fix: Allow admins to delete chat messages
CREATE POLICY "Admins can delete live support messages" 
ON public.chat_messages 
FOR DELETE 
USING ((is_live_support = true) AND has_role(auth.uid(), 'admin'::app_role));

-- Fix: Allow admins to delete support sessions
CREATE POLICY "Admins can delete support sessions" 
ON public.support_sessions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));