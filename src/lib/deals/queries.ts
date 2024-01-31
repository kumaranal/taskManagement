import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import {
  ACTIVITY_TABLE,
  ACTIVITY_TYPES_TABLE,
  CONTACT_TABLE,
  DEALS_STAGE_TABLE,
  DEALS_TABLE,
  ORGANIZATIONS_TABLE,
} from '~/lib/db-tables';

type Client = SupabaseClient<Database>;

export async function getDealsData(client: Client, organization_id: string) {
  const data = await client
    .from(ORGANIZATIONS_TABLE)
    .select(`id`)
    .eq(`uuid`, organization_id)
    .single();

    const org_id = data.data?.id;

    const dealsData = await client
      .from(DEALS_TABLE)
      .select(
        `id,
        organization_id,
        deal_value,
        expected_close_date,
        contact_id:contact_id ( first_name,last_name),
        deal_stage_id:deal_stage_id(stage_name)
   `
      )
      .eq('organization_id', org_id)
      // console.log("dealsData",dealsData.data)
    return dealsData;
}

export function getDealsStageType(client: Client) {
  return client.from(DEALS_STAGE_TABLE).select(
    `*`,
  );
}

export async function getDealsByID(client: Client, id: number) {
  const dealsData= client
    .from(DEALS_TABLE)
    .select(
      
      `id,
      organization_id,
      deal_value,
      expected_close_date,
      contact_id:contact_id ( id,first_name,last_name),
      deal_stage_id:deal_stage_id(deal_stage_id,stage_name)
    `,
    )
    .eq('id', id)
    .single();
      console.log("dealsdat api",dealsData)
    return dealsData;
}

