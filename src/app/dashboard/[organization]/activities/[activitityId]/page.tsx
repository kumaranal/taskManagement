import React, { use } from 'react';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import { getActivity } from '~/lib/activity/queries';
import AppHeader from '../../components/AppHeader';
import { PageBody } from '~/core/ui/Page';
import ActivityItemContainer from '../components/ActivityItemContainer';
interface Context {
  params: {
    activitityId: number;
  };
}
const UpdateActivity = ({ params }: Context) => {
  const { activitityId } = params;
  const { activitity } = use(loadData(activitityId));
  return (
    <div>
      <AppHeader title={`Edit Activity of ${activitity.contactDetails?.first_name} ${activitity.contactDetails?.last_name}`}></AppHeader>
      <PageBody>
        <ActivityItemContainer activitity={activitity} />
      </PageBody>
    </div>
  );
};
export async function loadData(activitityId: number) {
  const client = getSupabaseServerClient();

  const { data: activitity, error } = await getActivity(client, activitityId);

  if (error) {
    console.error(error);

    return {
      activitity: [],
    };
  }

  return {
    activitity,
  };
}

export default UpdateActivity;
