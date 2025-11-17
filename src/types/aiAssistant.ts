export interface AIAuditLog {
  id: string;
  user_id: string | null;
  action_type: 'create_ticket' | 'update_ticket' | 'recommend_content' | 'moderate_content' | 'send_notification' | 'read_data' | 'analyze_user';
  input_data: any;
  ai_decision: any;
  output_data?: any;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'cancelled';
  error_message?: string;
  execution_time_ms?: number;
  created_at: string;
  completed_at?: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category?: string;
  ai_generated: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface AIRateLimit {
  id: string;
  user_id: string;
  action_type: string;
  request_count: number;
  window_start: string;
  last_request_at: string;
}