import { Enums, } from "@/types/database.types";
import { supabase } from "./supabase";

/**
 * User Class to handle Supabase User.
* */
export class Role {
  readonly supabase = supabase;
  readonly query = this.supabase.from("roles");

  async appendRole(role: Enums<"Role">[], gymId: string, userId: string) {
    const { error } = await this.query.update({
      role
    }).or(`userId.eq.${userId},and(gymId.eq.${gymId})`);
    if (error) return { error }
    else return { error: null }

  }

  async insertMemberRole(userId: string, gymId: string) {
    let availableRoles: Enums<"Role">[] | undefined | null = ["MEMBER"]
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertCoachRole(userId: string, gymId: string) {
    let availableRoles: Enums<"Role">[] | undefined | null = ["COACH"]
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertFrontDeskRole(userId: string, gymId: string) {
    let availableRoles: Enums<"Role">[] | undefined | null = ["FRONT_DESK"]
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertAdministratorRole(userId: string, gymId: string) {
    let availableRoles: Enums<"Role">[] | undefined | null = ["ADMINISTRATOR"]
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
}

