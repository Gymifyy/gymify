import { Enums, Tables, } from "@/types/database.types";
import { supabase } from "./supabase";

/**
 * User Class to handle Supabase User.
* */
export class RoleController {
  readonly supabase = supabase;
  readonly query = this.supabase.from("gym_roles");
  readonly roleApplicationsQuery = this.supabase.from("roles_applications");

  async appendRole(role: Tables<"gym_roles">["role"], gymId: string, userId: string) {
    const { error } = await this.query.update({
      role
    }).or(`userId.eq.${userId},and(gymId.eq.${gymId})`);
    if (error) return { error }
    else return { error: null }

  }

  async insertMemberRole(userId: string, gymId: string) {
    let availableRoles: Tables<"gym_roles">["role"] = "MEMBER"
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertCoachRole(userId: string, gymId: string) {
    let availableRoles: Tables<"gym_roles">["role"] = "COACH"
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertFrontDeskRole(userId: string, gymId: string) {
    let availableRoles: Tables<"gym_roles">["role"] = "FRONT_DESK"
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async insertAdministratorRole(userId: string, gymId: string) {
    let availableRoles: Tables<"gym_roles">["role"] = "ADMINISTRATOR"
    const { error } = await this.query.insert({
      gymId,
      userId,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }

  async applyForAdditionalRole(role: Tables<"roles_applications">["role"], gymId: string, userId: string) {
    const { error } = await this.roleApplicationsQuery.insert({
      role,
      gymId,
      userId,
      accepted: false
    });
    if (error) return { error };
    else return { error: null };
  }

}

