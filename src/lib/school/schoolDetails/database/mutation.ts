
import type { Database } from '~/database.types';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SCHOOL } from '~/lib/db-tables';

type Client = SupabaseClient<Database>;
interface InsertPostParams {
  name: string;
  address: string;
  contact_no: number;
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

interface UpdatePostParams {
  name: string;
  address: string;
  contact_no: number;
  id: number;
}
export async function updateSchoolDetails(
  client: Client,
  { id, ...params }: UpdatePostParams
) {
  const { data, error } = await client
    .from(SCHOOL)
    .update(params)
    .match({ id: id });
  if (error) {
    throw error;
  }
  return data;
}


export async function deleteSchool(
  client: Client,
  id: number
) {
  const { data, error } = await client
    .from(SCHOOL)
    .delete()
    .match({ id });
  if (error) {
    throw error;
  }
  return data;
}