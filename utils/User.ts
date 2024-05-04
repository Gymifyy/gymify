import { Tables } from "@/types/database.types";
import { supabase } from "./supabase";
import { PostgrestError, User as SupabaseUser, AuthError, Session as SupabaseSession } from "@supabase/supabase-js";

type GetUserWithUsernameType = {
  error: PostgrestError | null,
  user: Tables<"users"> | null,
}
type LoginWithEmailReturnType = {
  error: AuthError | null,
  user: SupabaseUser | null,
  session: SupabaseSession | null,
};

/**
 * User Class to handle Supabase User.
* */
export class User {
  readonly supabase = supabase;
  readonly query = this.supabase.from("users");

  async getUserWithUsername(username: string = ""): Promise<GetUserWithUsernameType> {
    if (username.trim() === "" || !username) {
      return { error: { code: "400", hint: "username", details: "Please provide a valid username like `alvi_d`, `shunger` ..etc", message: "Please provide a valid username. " }, user: null }
    }
    const { data, error, count, status, statusText } = await this.query.select("*").eq("username", username);
    console.log({ data, error, count, status, statusText });
    return { error: error, user: null }
  }

  async getUserWithEmail(email: string = ""): Promise<GetUserWithUsernameType> {
    if (email.trim() === "" || !email) {
      return {
        error: {
          code: "400",
          hint: "username",
          details: "Please provide a valid username like `alvi_d`, `shunger` ..etc",
          message: "Please provide a valid username. "
        },
        user: null
      }
    }
    const { data, error, count, status, statusText } = await this.query.select("*").eq("email", email);
    console.log({ data, error, count, status, statusText });
    return { error: error, user: null }
  }
  async signOut() {
    return await supabase.auth.signOut();
  }

  async insert(data: Tables<"users">): Promise<{ error: PostgrestError | null }> {
    // check if username and email is used before
    const { data: users, error } = await this.query.select("*").or(`email.eq.${data.email},username.eq.${data.username}`);
    console.log({ users, error });
    if (error) {
      return { error }
    }
    else if (users.length === 0) {
      const { id, createdAt, ...other } = data;
      // user does not exist
      const { error } = await this.query.insert(other);
      if (error) return { error }
      // user inserted successfully
      return { error: null }
    }
    return { error: { message: "This email is already registered. ", hint: "email-used", details: "Change your email or contact support team to delete your old account.", code: "402" } }
  }

  async signUpWithEmail(email: string, password: string, otherData: Tables<"users">): Promise<LoginWithEmailReturnType> {
    const { email: _email, ...other } = otherData;
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: otherData.username,
          ...other
        }
      },
    });
    return { error, user: user, session: session }
  }

  async loginWithEmail(email: string, password: string): Promise<LoginWithEmailReturnType> {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { error, user: data.user, session: data.session }
  }
}
