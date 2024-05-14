import { Tables } from "@/types/database.types";
import { supabase } from "./supabase";

/**
 * Gyms Class to handle Supabase Gyms table actions.
* */
export class GymController {
  readonly supabase = supabase;
  readonly query = this.supabase.from("gyms");
  gyms: Tables<"gyms">[] = []

  async getAll() {
    const { data, error } = await this.query.select("*");
    if (data) {
      this.gyms = data;
    }
    return { data, error };
  }

  async getWithId(gymID: string) {
    const { data, error } = await this.query.select("*").eq("id", gymID).limit(1).single();
    return { data, error };
  }

  /**
   * Perform the neccessary updates after joining a gym
  * */
  async updateAferJoinGym(gymId: string, userId: string) {
    const { data, error } = await this.getWithId(gymId);
    if (error) return { data, error }
    else if (data) {
      if (data.members.includes(userId)) {
        return { error: null, data: null };
      }
      console.log({ data });
      const updatedMembers = [...data.members, userId]
      console.log({ updatedMembers });
      const { error } = await this.query.update({ members: updatedMembers, membersCount: updatedMembers.length, }).eq("id", userId).limit(1).order("name");
      console.log({ ERROR: error });
      return { error };
    }
    else return { error: null, data: null }
  }


  async getAllPaginated(from: number, to: number) {
    const { data, error } = await this.query.select("*").range(from, to);
    if (data) {
      this.gyms = data;
    }
    return { data, error };
  }

  async getAllWithUser(userId: string) {
    if (!userId || userId.trim() === "") return { data: null, error: null };
    const { data, error } = await this.query.select("*").contains("members", [userId])
    if (data) {
      this.gyms = data;
    }
    return { error, data }
  }
}

