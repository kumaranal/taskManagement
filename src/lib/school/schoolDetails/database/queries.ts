import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/database.types";
import { SCHOOL } from "~/lib/db-tables";

type Client = SupabaseClient<Database>;
export async function fetchSchool(
  client: Client,
) {

  return client
    .from(SCHOOL)
    .select(`*`)
}

const ID='id'
export async function fetchSchoolUsingId(
  client: Client,
  id: number
) {
  return client
    .from(SCHOOL)
    .select(
      `*`
    )
    .eq(ID, id);
}