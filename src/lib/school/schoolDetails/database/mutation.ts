
import type { Database } from '~/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SCHOOL } from '~/lib/db-tables';

type Client = SupabaseClient<Database>;
interface InsertPostParams {
  title: string;
  content: string;
}
export async function insertSchool(
  client: Client,
  params: InsertPostParams
) {
  const { data, error } = await client
    .from(SCHOOL)
    .insert(params)
    .single();
  if (error) {
    throw error;
  }
  return data;
}