import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~/database.types';
import { CONTACT_TABLE } from '~/lib/db-tables';
import { Contact } from './types/type';

type Client = SupabaseClient<Database>;

export function createContact(client: Client, contact: Omit<Contact, 'id'>) {
  console.log("contact",contact)
  return client.from(CONTACT_TABLE).insert({
    first_name: contact.first_name,
    last_name: contact.last_name,
    organization_id: contact.organizationId,
    email:contact.email,
    phone:contact.phone,
    linkedin_profile:contact.linkedin_profile,
    designation: contact.designation,
   
  });
}

// export function updateTask(
//   client: Client,
//   task: Partial<Task> & { id: number },
// ) {
//   return client
//     .from(TASKS_TABLE)
//     .update({
//       name: task.name,
//       done: task.done,
//       description: task.description,
//     })
//     .match({
//       id: task.id,
//     })
//     .throwOnError();
// }

export function deleteContact(client: Client, contactId: number) {
  return client
    .from(CONTACT_TABLE)
    .delete()
    .match({
      id: contactId,
    })
    .throwOnError();
}
