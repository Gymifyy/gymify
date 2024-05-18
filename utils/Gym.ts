import { Tables } from "@/types/database.types";
import { supabase } from "./supabase";
import { PostgrestError } from "@supabase/supabase-js";

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
  async updateAfterJoinGym(gymId: string, userId: string) {
    // get gym to join.
    const { data, error } = await this.getWithId(gymId);
    if (error) return { data, error }
    if (data) {
      if (data.members.includes(userId)) {
        // user is already part of gym
        return { error: { code: "404", hint: "user-gym-already", details: "This user is already part of this gym. Please try again later. ", message: "This user is already part of this gym" } as PostgrestError, data: null };
      }
      const updatedMembers = [...data.members, userId]
      const { data: gyms, error } = await this.query.update({ members: updatedMembers, membersCount: updatedMembers.length, }).eq("id", gymId).order("name").select().limit(1).single();
      return { data: gyms, error };
    }
    else return { data: undefined, error: undefined };
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

