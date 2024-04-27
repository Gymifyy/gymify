import { supabase } from "./supabase";

export async function getTodos() {
  let { data: todos, error } = await supabase
    .from('todos')
    .select('*')
  console.log({ todos, error });
}
