import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import {
  ACTIVITY_TYPES_TABLE,
  CONTACT_TABLE,
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

type Client = SupabaseClient<Database>;

// export async function getContacts(client: Client, organization_id: string) {
//   const data = await client
//     .from(ORGANIZATIONS_TABLE)
//     .select(`id`)
//     .eq(`uuid`, organization_id)
//     .single();

//   const org_id=data.data?.id;

//   return client
//     .from(CONTACT_TABLE)
//     .select(
//       ` id,
//       first_name,
//       organizationId: organization_id,
//       last_name,
//       email,
//       phone,
//       designation,
//       linkedin_profile`,
//     )
//     .eq('organization_id', org_id);
// }

export function getActivitiesType(client: Client) {
  return client.from(ACTIVITY_TYPES_TABLE).select(
    `*`,
  );
}
