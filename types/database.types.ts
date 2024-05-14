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
      achievements: {
        Row: {
          createdAt: string
          description: string
          id: string
          image: string | null
          name: string
          usersEarned: number | null
        }
        Insert: {
          createdAt?: string
          description?: string
          id?: string
          image?: string | null
          name?: string
          usersEarned?: number | null
        }
        Update: {
          createdAt?: string
          description?: string
          id?: string
          image?: string | null
          name?: string
          usersEarned?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          coachId: string | null
          createdAt: string
          gymId: string | null
          hours: string
          id: string
          membersCount: number
        }
        Insert: {
          coachId?: string | null
          createdAt?: string
          gymId?: string | null
          hours?: string
          id?: string
          membersCount?: number
        }
        Update: {
          coachId?: string | null
          createdAt?: string
          gymId?: string | null
          hours?: string
          id?: string
          membersCount?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_coachId_fkey"
            columns: ["coachId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_plans: {
        Row: {
          createdAt: string
          description: string
          gymId: string
          id: string
          name: string
          price: number
          timesPerWeek: number | null
          type: Database["public"]["Enums"]["Subscriptions"]
        }
        Insert: {
          createdAt?: string
          description: string
          gymId: string
          id?: string
          name?: string
          price: number
          timesPerWeek?: number | null
          type: Database["public"]["Enums"]["Subscriptions"]
        }
        Update: {
          createdAt?: string
          description?: string
          gymId?: string
          id?: string
          name?: string
          price?: number
          timesPerWeek?: number | null
          type?: Database["public"]["Enums"]["Subscriptions"]
        }
        Relationships: [
          {
            foreignKeyName: "gym_plans_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_roles: {
        Row: {
          createdAt: string
          gymId: string
          id: string
          role: Database["public"]["Enums"]["Role"]
          userId: string
        }
        Insert: {
          createdAt?: string
          gymId: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          userId: string
        }
        Update: {
          createdAt?: string
          gymId?: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      gyms: {
        Row: {
          add_images: string[]
          administrator: string | null
          coaches: string[]
          contactEmail: string
          contactPhone: string
          courses: string[]
          coursesCount: number
          createdAt: string
          description: string
          id: string
          location: string
          logo: string
          manager: string | null
          members: string[]
          membersCount: number
          name: string
        }
        Insert: {
          add_images?: string[]
          administrator?: string | null
          coaches?: string[]
          contactEmail?: string
          contactPhone?: string
          courses?: string[]
          coursesCount?: number
          createdAt?: string
          description?: string
          id?: string
          location?: string
          logo?: string
          manager?: string | null
          members?: string[]
          membersCount?: number
          name?: string
        }
        Update: {
          add_images?: string[]
          administrator?: string | null
          coaches?: string[]
          contactEmail?: string
          contactPhone?: string
          courses?: string[]
          coursesCount?: number
          createdAt?: string
          description?: string
          id?: string
          location?: string
          logo?: string
          manager?: string | null
          members?: string[]
          membersCount?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "gyms_administrator_fkey"
            columns: ["administrator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gyms_manager_fkey"
            columns: ["manager"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          add_info: Json[] | null
          cancelled: boolean | null
          createdAt: string
          gymId: string | null
          id: string
          type: Database["public"]["Enums"]["Membership"] | null
          userId: string | null
        }
        Insert: {
          add_info?: Json[] | null
          cancelled?: boolean | null
          createdAt?: string
          gymId?: string | null
          id?: string
          type?: Database["public"]["Enums"]["Membership"] | null
          userId?: string | null
        }
        Update: {
          add_info?: Json[] | null
          cancelled?: boolean | null
          createdAt?: string
          gymId?: string | null
          id?: string
          type?: Database["public"]["Enums"]["Membership"] | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles_applications: {
        Row: {
          accepted: boolean
          createdAt: string
          gymId: string
          id: string
          role: Database["public"]["Enums"]["Role"]
          userId: string
        }
        Insert: {
          accepted?: boolean
          createdAt?: string
          gymId: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          userId: string
        }
        Update: {
          accepted?: boolean
          createdAt?: string
          gymId?: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_applications_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roles_applications_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          bmi: number | null
          completed_setup: boolean | null
          createdAt: string
          email: string
          enrolledCoursesCount: number | null
          enrolledGymsCount: number | null
          firstName: string | null
          gender: Database["public"]["Enums"]["Gender"] | null
          height: number | null
          id: string
          isSuperAdmin: boolean | null
          lastName: string | null
          phoneNumber: string | null
          profileImage: string | null
          username: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          bmi?: number | null
          completed_setup?: boolean | null
          createdAt?: string
          email?: string
          enrolledCoursesCount?: number | null
          enrolledGymsCount?: number | null
          firstName?: string | null
          gender?: Database["public"]["Enums"]["Gender"] | null
          height?: number | null
          id?: string
          isSuperAdmin?: boolean | null
          lastName?: string | null
          phoneNumber?: string | null
          profileImage?: string | null
          username?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          bmi?: number | null
          completed_setup?: boolean | null
          createdAt?: string
          email?: string
          enrolledCoursesCount?: number | null
          enrolledGymsCount?: number | null
          firstName?: string | null
          gender?: Database["public"]["Enums"]["Gender"] | null
          height?: number | null
          id?: string
          isSuperAdmin?: boolean | null
          lastName?: string | null
          phoneNumber?: string | null
          profileImage?: string | null
          username?: string
          weight?: number | null
        }
        Relationships: []
      }
      users_achievements: {
        Row: {
          achievementId: string | null
          createdAt: string
          id: string
          userId: string | null
        }
        Insert: {
          achievementId?: string | null
          createdAt?: string
          id?: string
          userId?: string | null
        }
        Update: {
          achievementId?: string | null
          createdAt?: string
          id?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_achievements_achievementId_fkey"
            columns: ["achievementId"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_achievements_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users_courses: {
        Row: {
          courseId: string | null
          createdAt: string
          gymId: string | null
          id: string
          userId: string | null
        }
        Insert: {
          courseId?: string | null
          createdAt?: string
          gymId?: string | null
          id?: string
          userId?: string | null
        }
        Update: {
          courseId?: string | null
          createdAt?: string
          gymId?: string | null
          id?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_courses_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_courses_gymId_fkey"
            columns: ["gymId"]
            isOneToOne: false
            referencedRelation: "gyms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_courses_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      json_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
      jsonb_matches_schema: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: boolean
      }
      jsonschema_is_valid: {
        Args: {
          schema: Json
        }
        Returns: boolean
      }
      jsonschema_validation_errors: {
        Args: {
          schema: Json
          instance: Json
        }
        Returns: string[]
      }
    }
    Enums: {
      Gender: "MALE" | "FEMALE"
      Membership: "FREE" | "PAID" | "TRIAL"
      Role:
        | "MEMBER"
        | "COACH"
        | "ADMINISTRATOR"
        | "SUPER_ADMIN"
        | "FRONT_DESK"
        | "MANAGER"
      Subscriptions: "MONTHLY" | "YEARLY" | "TRIAL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
