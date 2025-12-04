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
      ai_usage_limits: {
        Row: {
          created_at: string
          daily_count: number
          id: string
          last_reset_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_count?: number
          id?: string
          last_reset_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_count?: number
          id?: string
          last_reset_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_live_support: boolean
          is_read: boolean
          role: string
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_live_support?: boolean
          is_read?: boolean
          role: string
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_live_support?: boolean
          is_read?: boolean
          role?: string
          session_id?: string
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
      check_and_increment_ai_usage: {
        Args: { p_daily_limit?: number; p_user_id: string }
        Returns: boolean
      }
      generate_slug: { Args: { title: string }; Returns: string }
      get_remaining_ai_credits: {
        Args: { p_daily_limit?: number; p_user_id: string }
        Returns: number
      }
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
