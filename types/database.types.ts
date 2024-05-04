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
      gyms: {
        Row: {
          administrator: string | null
          coaches: string[]
          createdAt: string
          id: string
          location: string
          logo: string
          manager: string | null
          members: string[]
          membersCount: number
          name: string
        }
        Insert: {
          administrator?: string | null
          coaches?: string[]
          createdAt?: string
          id?: string
          location?: string
          logo?: string
          manager?: string | null
          members?: string[]
          membersCount?: number
          name?: string
        }
        Update: {
          administrator?: string | null
          coaches?: string[]
          createdAt?: string
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
      roles: {
        Row: {
          createdAt: string
          gymId: string | null
          id: string
          role: Database["public"]["Enums"]["Role"][] | null
          userId: string | null
        }
        Insert: {
          createdAt?: string
          gymId?: string | null
          id?: string
          role?: Database["public"]["Enums"]["Role"][] | null
          userId?: string | null
        }
        Update: {
          createdAt?: string
          gymId?: string | null
          id?: string
          role?: Database["public"]["Enums"]["Role"][] | null
          userId?: string | null
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
      users: {
        Row: {
          bmi: number | null
          createdAt: string
          email: string
          enrolledCourses: Json[] | null
          enrolledCoursesCount: number | null
          enrolledGyms: Json[] | null
          enrolledGymsCount: number | null
          firstName: string | null
          height: number | null
          id: string
          lastName: string | null
          phoneNumber: string | null
          profileImage: string | null
          username: string
          weight: number | null
        }
        Insert: {
          bmi?: number | null
          createdAt?: string
          email?: string
          enrolledCourses?: Json[] | null
          enrolledCoursesCount?: number | null
          enrolledGyms?: Json[] | null
          enrolledGymsCount?: number | null
          firstName?: string | null
          height?: number | null
          id?: string
          lastName?: string | null
          phoneNumber?: string | null
          profileImage?: string | null
          username?: string
          weight?: number | null
        }
        Update: {
          bmi?: number | null
          createdAt?: string
          email?: string
          enrolledCourses?: Json[] | null
          enrolledCoursesCount?: number | null
          enrolledGyms?: Json[] | null
          enrolledGymsCount?: number | null
          firstName?: string | null
          height?: number | null
          id?: string
          lastName?: string | null
          phoneNumber?: string | null
          profileImage?: string | null
          username?: string
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Membership: "FREE" | "PAID" | "TRIAL"
      Role: "MEMBER" | "COACH" | "FRONT_DESK" | "ADMINISTRATOR" | "MANAGER"
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
