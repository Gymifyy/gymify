import { Enums, Tables, } from "@/types/database.types";
import { supabase } from "./supabase";

/**
 * User Class to handle Supabase User.
* */
export class RoleController {
  readonly supabase = supabase;
  readonly query = this.supabase.from("gym_roles");
  readonly roleApplicationsQuery = this.supabase.from("roles_applications");

  async acceptRoleApplication(userId: string, gymId: string) {
    if (!userId) return { data: null, error: null }
    if (!gymId) return { data: null, error: null }
    const { error } = await this.roleApplicationsQuery.update({ accepted: true, declined: false }).or(`userId.eq.${userId},and(gymId.eq.${gymId})`)
    console.log({ error, component: "AcceptRoleApplication" });
    return { data: "Accepted role successfully.", error };
  }

  async deleteRoleApplication(userId: string, gymId: string, role: Tables<"gym_roles">["role"]) {
    if (!userId) return { data: null, error: null }
    if (!gymId) return { data: null, error: null }
    const { error } = await this.roleApplicationsQuery.delete().or(`userId.eq.${userId},and(gymId.eq.${gymId},role.eq.${role})`)
    console.log({ error, component: "DeleteRoleApplication" });
    return { data: "Deleted role successfully.", error };

  }

  async declineRoleApplication(userId: string, gymId: string) {
    if (!userId) return { data: null, error: null }
    if (!gymId) return { data: null, error: null }
    const { error } = await this.roleApplicationsQuery.update({ accepted: false, declined: true }).or(`userId.eq.${userId},and(gymId.eq.${gymId})`)
    console.log({ error, component: "AcceptRoleApplication" });
    return { data: "Declined role successfully.", error };
  }


  async getApplicationsInGym(userId: string, gymId: string) {
    if (!userId) return { data: null, error: null }
    const { data, error } = await this.roleApplicationsQuery.select("*").or(`userId.eq.${userId},and(gymId.eq.${gymId})`);
    if (error) {
      console.log({ error, component: "GetApplicationsInGym" });
    }
    return { data, error };
  }

  async getUserRoles(userId: string) {
    if (!userId) return { data: null, error: null }
    const { data, error } = await this.roleApplicationsQuery.select("*").eq("userId", userId);
    console.log({ error, component: "GetUserRoles" });
    return { data, error };

  }

  async insertMemberRole(userId: string, gymId: string) {
    let availableRoles: Tables<"gym_roles">["role"] = "MEMBER"
    const { error } = await this.query.insert({
      gymId,
      userId,
      accepted: false,
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
      accepted: false,
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
      accepted: false,
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
      accepted: false,
      role: availableRoles
    });
    if (error) return { error }
    else return { error: null }
  }
  async getAllPaginated(from: number, to: number) {
    const { data, error } = await this.roleApplicationsQuery.select("*").range(from, to);
    return { data, error };
  }

  async getPending() {
    const { data, error } = await this.roleApplicationsQuery.select("*").or("accepted.eq.false,and(declined.eq.false)");
    return { data, error };
  }

  async applyForAdditionalRole(role: Tables<"roles_applications">["role"], gymId: string, userId: string) {
    const { error } = await this.roleApplicationsQuery.insert({
      role: role,
      gymId: gymId,
      userId: userId,
      accepted: false,
    });
    if (error) return { error };
    else return { error: null };
  }

}

