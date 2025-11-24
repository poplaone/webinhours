export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_agents: {
        Row: {
          agent_type: string
          approved_at: string | null
          category: string
          created_at: string
          demo_url: string | null
          description: string | null
          featured_at: string | null
          features: string[] | null
          id: string
          images: string[] | null
          inclusions: string[] | null
          is_featured: boolean
          model_info: Json | null
          preview_url: string
          price: number
          rating_average: number | null
          rating_count: number
          status: string
          tags: string[] | null
          technologies: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          usage_count: number
          use_cases: string[] | null
          user_id: string
          views_count: number
        }
        Insert: {
          agent_type?: string
          approved_at?: string | null
          category: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          featured_at?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_featured?: boolean
          model_info?: Json | null
          preview_url: string
          price?: number
          rating_average?: number | null
          rating_count?: number
          status?: string
          tags?: string[] | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          usage_count?: number
          use_cases?: string[] | null
          user_id: string
          views_count?: number
        }
        Update: {
          agent_type?: string
          approved_at?: string | null
          category?: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          featured_at?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_featured?: boolean
          model_info?: Json | null
          preview_url?: string
          price?: number
          rating_average?: number | null
          rating_count?: number
          status?: string
          tags?: string[] | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          usage_count?: number
          use_cases?: string[] | null
          user_id?: string
          views_count?: number
        }
        Relationships: []
      }
      ai_audit_logs: {
        Row: {
          action_type: Database["public"]["Enums"]["ai_action_type"]
          ai_decision: Json
          completed_at: string | null
          created_at: string
          error_message: string | null
          execution_time_ms: number | null
          id: string
          input_data: Json
          output_data: Json | null
          status: Database["public"]["Enums"]["ai_action_status"]
          user_id: string | null
        }
        Insert: {
          action_type: Database["public"]["Enums"]["ai_action_type"]
          ai_decision: Json
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data: Json
          output_data?: Json | null
          status?: Database["public"]["Enums"]["ai_action_status"]
          user_id?: string | null
        }
        Update: {
          action_type?: Database["public"]["Enums"]["ai_action_type"]
          ai_decision?: Json
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data?: Json
          output_data?: Json | null
          status?: Database["public"]["Enums"]["ai_action_status"]
          user_id?: string | null
        }
        Relationships: []
      }
      ai_rate_limits: {
        Row: {
          action_type: Database["public"]["Enums"]["ai_action_type"]
          id: string
          last_request_at: string
          request_count: number
          user_id: string
          window_start: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["ai_action_type"]
          id?: string
          last_request_at?: string
          request_count?: number
          user_id: string
          window_start?: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["ai_action_type"]
          id?: string
          last_request_at?: string
          request_count?: number
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      concept_tests: {
        Row: {
          completed_at: string | null
          concept_id: string
          created_at: string | null
          id: string
          insights: string | null
          recommendations: string | null
          results: Json | null
          sample_size: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["test_status"] | null
          target_audience: string | null
          test_name: string
          test_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          concept_id: string
          created_at?: string | null
          id?: string
          insights?: string | null
          recommendations?: string | null
          results?: Json | null
          sample_size?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["test_status"] | null
          target_audience?: string | null
          test_name: string
          test_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          concept_id?: string
          created_at?: string | null
          id?: string
          insights?: string | null
          recommendations?: string | null
          results?: Json | null
          sample_size?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["test_status"] | null
          target_audience?: string | null
          test_name?: string
          test_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "concept_tests_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
        ]
      }
      concepts: {
        Row: {
          ai_generated: boolean | null
          ai_prompt: string | null
          created_at: string | null
          description: string | null
          id: string
          idea_id: string
          key_features: string[] | null
          name: string
          status: Database["public"]["Enums"]["concept_status"] | null
          target_market: string | null
          updated_at: string | null
          user_id: string
          value_proposition: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          ai_prompt?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          idea_id: string
          key_features?: string[] | null
          name: string
          status?: Database["public"]["Enums"]["concept_status"] | null
          target_market?: string | null
          updated_at?: string | null
          user_id: string
          value_proposition?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          ai_prompt?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          idea_id?: string
          key_features?: string[] | null
          name?: string
          status?: Database["public"]["Enums"]["concept_status"] | null
          target_market?: string | null
          updated_at?: string | null
          user_id?: string
          value_proposition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "concepts_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          category: string | null
          competition_level: string | null
          created_at: string | null
          description: string | null
          feasibility_score: number | null
          id: string
          market_potential: number | null
          status: Database["public"]["Enums"]["idea_status"] | null
          tags: string[] | null
          target_audience: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          competition_level?: string | null
          created_at?: string | null
          description?: string | null
          feasibility_score?: number | null
          id?: string
          market_potential?: number | null
          status?: Database["public"]["Enums"]["idea_status"] | null
          tags?: string[] | null
          target_audience?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          competition_level?: string | null
          created_at?: string | null
          description?: string | null
          feasibility_score?: number | null
          id?: string
          market_potential?: number | null
          status?: Database["public"]["Enums"]["idea_status"] | null
          tags?: string[] | null
          target_audience?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      test_responses: {
        Row: {
          completion_time: number | null
          created_at: string | null
          demographic_data: Json | null
          id: string
          ip_address: unknown
          respondent_id: string | null
          responses: Json
          test_id: string
          user_agent: string | null
        }
        Insert: {
          completion_time?: number | null
          created_at?: string | null
          demographic_data?: Json | null
          id?: string
          ip_address?: unknown
          respondent_id?: string | null
          responses: Json
          test_id: string
          user_agent?: string | null
        }
        Update: {
          completion_time?: number | null
          created_at?: string | null
          demographic_data?: Json | null
          id?: string
          ip_address?: unknown
          respondent_id?: string | null
          responses?: Json
          test_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_responses_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "concept_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      websites: {
        Row: {
          approved_at: string | null
          category: string
          created_at: string
          demo_url: string | null
          description: string | null
          downloads_count: number
          featured_at: string | null
          features: string[] | null
          id: string
          images: string[] | null
          inclusions: string[] | null
          is_featured: boolean
          preview_url: string
          price: number
          rating_average: number | null
          rating_count: number
          slug: string | null
          status: string
          tags: string[] | null
          technologies: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          approved_at?: string | null
          category: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          downloads_count?: number
          featured_at?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_featured?: boolean
          preview_url: string
          price?: number
          rating_average?: number | null
          rating_count?: number
          slug?: string | null
          status?: string
          tags?: string[] | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          approved_at?: string | null
          category?: string
          created_at?: string
          demo_url?: string | null
          description?: string | null
          downloads_count?: number
          featured_at?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_featured?: boolean
          preview_url?: string
          price?: number
          rating_average?: number | null
          rating_count?: number
          slug?: string | null
          status?: string
          tags?: string[] | null
          technologies?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bootstrap_admin: { Args: { admin_email: string }; Returns: undefined }
      check_ai_rate_limit: {
        Args: {
          _action_type: Database["public"]["Enums"]["ai_action_type"]
          _max_requests?: number
          _user_id: string
          _window_minutes?: number
        }
        Returns: boolean
      }
      generate_slug: { Args: { title: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_agent_usage: {
        Args: { agent_uuid: string }
        Returns: undefined
      }
      increment_website_views: {
        Args: { website_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      ai_action_status:
        | "pending"
        | "executing"
        | "completed"
        | "failed"
        | "cancelled"
      ai_action_type:
        | "create_ticket"
        | "update_ticket"
        | "recommend_content"
        | "moderate_content"
        | "send_notification"
        | "read_data"
        | "analyze_user"
      app_role: "admin" | "moderator" | "user"
      concept_status: "draft" | "testing" | "completed" | "archived"
      idea_status: "draft" | "in_review" | "approved" | "rejected"
      test_status: "pending" | "running" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_action_status: [
        "pending",
        "executing",
        "completed",
        "failed",
        "cancelled",
      ],
      ai_action_type: [
        "create_ticket",
        "update_ticket",
        "recommend_content",
        "moderate_content",
        "send_notification",
        "read_data",
        "analyze_user",
      ],
      app_role: ["admin", "moderator", "user"],
      concept_status: ["draft", "testing", "completed", "archived"],
      idea_status: ["draft", "in_review", "approved", "rejected"],
      test_status: ["pending", "running", "completed", "failed"],
    },
  },
} as const
