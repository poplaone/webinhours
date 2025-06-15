export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
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
          ip_address: unknown | null
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
          ip_address?: unknown | null
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
          ip_address?: unknown | null
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
      increment_website_views: {
        Args: { website_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      concept_status: "draft" | "testing" | "completed" | "archived"
      idea_status: "draft" | "in_review" | "approved" | "rejected"
      test_status: "pending" | "running" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      concept_status: ["draft", "testing", "completed", "archived"],
      idea_status: ["draft", "in_review", "approved", "rejected"],
      test_status: ["pending", "running", "completed", "failed"],
    },
  },
} as const
