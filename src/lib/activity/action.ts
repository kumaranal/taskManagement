'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import { createActivities, deleteActivity, updateActivity } from './mutation';
import { Activity } from './types/type';

type CreateContactParams = {
  activity: Omit<Activity, 'id'>;
};

type updateActivityParams = {
  activity: Partial<Activity> & Pick<Activity, 'id'>;
};

type DeleteActivityParams = {
  activityId: number
};

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

export const updateActivityAction = withSession(
  async (params: updateActivityParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/activities`;
    await updateActivity(client, params.activity);
    // revalidate the tasks page and the task page
    revalidatePath(path, 'page');
    redirect(path);
  },
);

export const deleteActivityAction = withSession(
  async (params: DeleteActivityParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/activities`;
    await deleteActivity(client, params.activityId);
    revalidatePath(path, 'page');
  },
);
