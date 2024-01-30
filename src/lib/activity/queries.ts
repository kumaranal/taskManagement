import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import {
  ACTIVITY_TABLE,
  ACTIVITY_TYPES_TABLE,
  CONTACT_TABLE,
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

type Client = SupabaseClient<Database>;

export async function getActivities(client: Client, organization_id: string) {
  const data = await client
    .from(ORGANIZATIONS_TABLE)
    .select(`id`)
    .eq(`uuid`, organization_id)
    .single();

  const org_id = data.data?.id;

  // Fetch activities with contact information
  const activitiesData = await client
    .from(ACTIVITY_TABLE)
    .select(
      `id,
        organization_id,
        subject,
        due_date,
        status,
        notes,
        contactDetails:contact_id ( first_name,last_name),
        activityType:activity_type_id(type_name)
   `,
    )
    .eq('organization_id', org_id);
  return activitiesData;
}

export function getActivitiesType(client: Client) {
  return client.from(ACTIVITY_TYPES_TABLE).select(`*`);
}

export function getActivity(client: Client, id: number) {
  return client
    .from(ACTIVITY_TABLE)
    .select(
      `id,
  organization_id,
  subject,
  due_date,
  status,
  notes,
  contactDetails:contact_id ( first_name,last_name),
  activityType:activity_type_id(type_name)
`,
    )
    .eq('id', id)
    .single();
}
