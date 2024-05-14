import { Tables } from "@/types/database.types";
import { supabase } from "./supabase";

/**
 * Plans Class to handle Supabase Plans table actions.
* */
export class GymPlansController {
  readonly supabase = supabase;
  readonly query = this.supabase.from("gym_plans");
  plans: Tables<"gym_plans">[] = []

  async getAll() {
    const { data, error } = await this.query.select("*");
    if (data) {
      this.plans = data;
    }
    return { data, error };
  }

  async getAllPaginated(from: number, to: number, gymID: string | undefined) {
    if (!gymID) return { data: null, error: null };
    const { data, error } = await this.query.select("*").eq("gymId", gymID).order("price", { ascending: true }).range(from, to);
    if (data) {
      this.plans = data;
    }
    return { data, error };
  }

  async getAllWithGym(gymID: string | undefined) {
    if (!gymID || gymID.trim() === "") return { data: null, error: null };
    const { data, error } = await this.query.select("*").eq("gymId", gymID)
    if (data) {
      this.plans = data;
    }
    return { error, data }
  }
}

