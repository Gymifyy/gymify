import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Tables } from "@/types/database.types";

/**
 * User Class to handle Supabase User.
* */
export class AchievementController {
  readonly supabase = supabase;
  readonly achievementsQuery = this.supabase.from("achievements");
  readonly usersAchievements = this.supabase.from("users_achievements");
  achievements: Tables<"achievements">[] = [];

  async getAllAchievements() {
    const { data, error } = await this.achievementsQuery.select("*");
    if (data) {
      this.achievements = data;
    }
    return { data, error };
  };

  async getAllUserAchievements(userId: string): Promise<{ error: PostgrestError | null, data: Tables<"achievements">[] | null }> {
    if (userId.trim() === "") return { error: null, data: null }
    const { data, error } = await this.usersAchievements.select("*").eq("userId", userId);
    if (error) return { error, data: null }
    const achievementsIds: (string | null)[] = data.map((achievement) => achievement.achievementId)
    if (achievementsIds && achievementsIds.length >= 1) {
      const { data, error } = await this.achievementsQuery.select("*").in("id", achievementsIds)
      if (data) {
        this.achievements = data;
      }
      return { error, data }
    }
    else return { error: { code: "400", message: "No achievements earned yet.", hint: "achievements-0", details: "" }, data: null }
  }

}


