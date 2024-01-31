import React, { use } from 'react';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import {
  getActivities,
  getActivitiesType,
  getActivity,
} from '~/lib/activity/queries';
import AppHeader from '../../components/AppHeader';
import { PageBody } from '~/core/ui/Page';
import ActivityItemContainer from '../components/ActivityItemContainer';
import { getContacts } from '~/lib/contact/queries';
interface Context {
  params: {
    activitityId: number;
    organization: string;
  };
}
const UpdateActivity = ({ params }: Context) => {
  const { activitityId, organization } = params;
  const { activitity, activitiesType, contacts } = use(
    loadData(activitityId, organization),
  
  );
  return (
    <div>
      <AppHeader
        title={`Edit Activity of ${activitity.contactDetails?.first_name} ${activitity.contactDetails?.last_name}`}
      ></AppHeader>
      <PageBody>
        <ActivityItemContainer
          activitity={activitity}
          activitiesType={activitiesType}
          contacts={contacts}
        />
      </PageBody>
    </div>
  );
};
export async function loadData(activitityId: number, organizationUid: string) {
  const client = getSupabaseServerClient();

  const { data: activitity, error } = await getActivity(client, activitityId);
  const { data: activitiesType } = await getActivitiesType(client);
  const { data: contacts } = await getContacts(client, organizationUid);

  if (error) {
    console.error(error);

    return {
      activitity: [],
    };
  }

  return {
    activitity,
    activitiesType,
    contacts,
  };
}

export default UpdateActivity;
