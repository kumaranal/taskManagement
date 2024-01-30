import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { ACTIVITY_TABLE } from '~/lib/db-tables';
import { Activity } from './types/type';

type Client = SupabaseClient<Database>;

export function createActivities(client: Client, activities: Omit<Activity, 'id'>) {
  return client.from(ACTIVITY_TABLE).insert({
    activity_type_id: Number(activities.activities),
          contact_id:Number(activities.selectedContact),
          due_date: activities.dueDate,
          notes: activities.notes,
          organization_id:activities.organizationId,
          status:activities.status,
          subject:activities.subject
  });
}
