import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { ACTIVITY_TABLE } from '~/lib/db-tables';
import { Activity } from './types/type';

type Client = SupabaseClient<Database>;

export function createActivities(client: Client, activities: Omit<Activity, 'id'>) {
  return client.from(ACTIVITY_TABLE).insert({
    activity_type_id: Number(activities.activities) || 0,
    contact_id: Number(activities.selectedContact) || 0,
    due_date: activities.due_date || '',
    notes: activities.notes || '',
    organization_id: activities.organizationId || 0,
    status: activities.status || '',
    subject: activities.subject || ''
  });
}

export function updateActivity(
  client: Client,
  activity: Partial<Activity> & { id: number },
) {
  return client
    .from(ACTIVITY_TABLE)
    .update({
      status:activity.status,
      subject:activity.subject,
      notes:activity.notes,
      due_date:activity.due_date,
      contact_id:Number(activity.selectedContact),
      activity_type_id: Number(activity.activities)   
    })
    .match({
      id: activity.id,
    })
    .throwOnError();
}



export function deleteActivity(client: Client, activityId: number) {
  return client
    .from(ACTIVITY_TABLE)
    .delete()
    .match({
      id: activityId,
    })
    .throwOnError();
}
