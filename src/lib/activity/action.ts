'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import { createActivities } from './mutation';
import { Activity } from './types/type';

type CreateContactParams = {
  activity: Omit<Activity, 'id'>;
};

// type UpdateContactParams = {
//   contact: Partial<Contact> & Pick<Contact, 'id'>;
// };

// type DeleteContactParams = {
//   contactId: number;
// };

export const createActivityAction = withSession(
  async (params: CreateContactParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/activities`;
    await createActivities(client, params.activity);

    // revalidate the tasks page
    revalidatePath(path, 'page');

    // redirect to the tasks page
    redirect(path);
  },
);

// export const updateContactAction = withSession(
//   async (params: UpdateContactParams) => {
//     const client = getSupabaseServerActionClient();
//     const session = await requireSession(client);
//     const uid = await parseOrganizationIdCookie(session.user.id);
//     const path = `/dashboard/${uid}/contact`;
//     await updateContact(client, params.contact);

//     // revalidate the tasks page and the task page
//     revalidatePath(path, 'page');
//     redirect(path);
//   },
// );

// export const deleteTaskAction = withSession(
//   async (params: DeleteContactParams) => {
//     const client = getSupabaseServerActionClient();
//     const session = await requireSession(client);
//     const uid = await parseOrganizationIdCookie(session.user.id);
//     const path = `/dashboard/${uid}/contact`;
//     await deleteContact(client, params.contactId);
//     revalidatePath(path, 'page');
//   },
// );
