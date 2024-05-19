import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Tables } from "@/types/database.types";

type AchievementsName = "Consistent Challenger" | "Weight Loss Champion" | "Responsible";

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

  async checkEarned(userId: string, achievementName: string) {
    if (userId.trim() === "") return { error: null, data: null }
    if (achievementName.trim() === "") return { error: null, data: null }
    const { data, error } = await this.achievementsQuery.select("id").eq("name", achievementName).limit(1).single();
    if (error || !data) return { error, data: null }
    const { data: achievements, error: achievementsError } = await this.usersAchievements.select("*").or(`userId.eq.${userId},and(achievementId.eq.${data.id})`);
    if (achievementsError || !achievements) return { error: achievementsError, data: null }
    return { data: achievements, error: achievementsError };
  }

  async earn(userId: string, achievementName: AchievementsName) {
    if (userId.trim() === "") return { error: null, data: null, earned: false }
    if (achievementName.trim() === "") return { error: null, data: null, earned: false }
    const { data, error } = await this.achievementsQuery.select("id").eq("name", achievementName).limit(1).single();
    if (error || !data) return { error, data: null, earned: false }
    const { error: achievementsError } = await this.usersAchievements.insert({ userId, achievementId: data.id });
    if (achievementsError) return { error: achievementsError, data: null, earned: false }
    return { data: null, error: null, earned: true };
  }

  async getAllUserAchievements(userId: string): Promise<{ error: PostgrestError | null, data: Tables<"achievements">[] | null }> {
    if (userId.trim() === "") return { error: null, data: null }
    const { data, error } = await this.usersAchievements.select("*").eq("userId", userId);
    if (error || !data) return { error, data: null }
    const achievementsIds: string[] = data.map((achievement) => achievement.achievementId)
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


