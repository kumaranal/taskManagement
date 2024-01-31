'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import {  createDeals, deleteDeals, updateDeals } from './mutation';
import {  Deals } from './types/type';

type CreateDealsParams = {
  deals: Omit<Deals, 'id'>;
};

type UpdateDealsParams = {
  deals: Partial<Deals> & Pick<Deals, 'id'>;
};

type DeleteDealsParams = {
  dealsdataId: number;
};

export const createDealsAction = withSession(
  async (params: CreateDealsParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/deals`;
    await createDeals(client, params.deals);

    // revalidate the tasks page
    revalidatePath(path, 'page');

    // redirect to the tasks page
    redirect(path);
  },
);

export const updateDealAction = withSession(
  async (params: UpdateDealsParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/deals`;
    await updateDeals(client, params.deals);

    // revalidate the tasks page and the task page
    revalidatePath(path, 'page');
    redirect(path);
  },
);

export const deleteDealAction = withSession(
  async (params: DeleteDealsParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/deals`;
    await deleteDeals(client, params.dealsdataId);
    revalidatePath(path, 'page');
  },
);
