import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/database.types";
import { SCHOOL } from "~/lib/db-tables";

type Client = SupabaseClient<Database>;
export async function fetchPosts(
  client: Client,
) {

  return client
    .from(SCHOOL)
    .select(`*`)
}