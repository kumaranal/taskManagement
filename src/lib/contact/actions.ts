'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import { Contact } from './types/type';
import { createContact, deleteContact, updateContact } from './mutations';

type CreateContactParams = {
  contact: Omit<Contact, 'id'>;
};

type UpdateContactParams = {
  contact: Partial<Contact> & Pick<Contact, 'id'>;
};

type DeleteContactParams = {
  contactId: number;
};

export const createContactAction = withSession(
  async (params: CreateContactParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/contact`;

    await createContact(client, params.contact);

    // revalidate the tasks page
    revalidatePath(path, 'page');

    // redirect to the tasks page
    redirect(path);
  },
);

export const updateContactAction = withSession(
  async (params: UpdateContactParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/contact`;
    await updateContact(client, params.contact);

    // revalidate the tasks page and the task page
    revalidatePath(path, 'page');
    redirect(path);
  },
);

export const deleteTaskAction = withSession(
  async (params: DeleteContactParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/contact`;
    await deleteContact(client, params.contactId);
    revalidatePath(path, 'page');
  },
);
