import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { CONTACT_TABLE, DEALS_TABLE } from '~/lib/db-tables';
import {  Deals } from './types/type';
import DealStageTypeSelect from '~/app/dashboard/[organization]/deals/components/DealStageTypeSelect';

type Client = SupabaseClient<Database>;

export function createDeals(client: Client, deals: Omit<Deals, 'id'>) {
  return client.from(DEALS_TABLE).insert({
    organization_id: deals.organization_id,
    contact_id: deals.contact_id,
    deal_stage_id: deals.deal_stage_id,
    deal_value: deals.deal_value,
    deal_owner: deals.deal_owner,
    expected_close_date:deals.expected_close_date
  });
}

export function updateDeals(
  client: Client,
  deals: Partial<Deals> & { id: number },
) {
  return client
    .from(DEALS_TABLE)
    .update({
        organization_id: deals.organization_id,
        contact_id: deals.contact_id,
        deal_stage_id: deals.deal_stage_id,
        deal_value: deals.deal_value,
        deal_owner: deals.deal_owner,
        expected_close_date:deals.expected_close_date
    })
    .match({
      id: deals.id,
    })
    .throwOnError();
}

export function deleteDeals(client: Client, dealsId: number) {
  return client
    .from(DEALS_TABLE)
    .delete()
    .match({
      id: dealsId,
    })
    .throwOnError();
}
