import React, { use } from 'react';
import AppHeader from '../components/AppHeader';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';
import { PageBody } from '~/core/ui/Page';
import Heading from '~/core/ui/Heading';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Modal from '~/core/ui/Modal';
import { Contact } from '~/lib/contact/types/type';
import { getContacts } from '~/lib/contact/queries';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import ActivityForm from './components/ActivityForm';
import { getActivities, getActivitiesType } from '~/lib/activity/queries';
import { Activity } from '~/lib/activity/types/type';
import ActivityTable from './components/ActivityTable';

interface ActivityPageParams {
  params: {
    organization: string;
  };
}

const ContactPage = ({ params }: ActivityPageParams) => {
  const { contacts,activitiesType ,activities} = use(
    loadData({
      organizationUid: params.organization,
    }),
  );
  
  return (
    <div>
      <AppHeader
        description={'Manage your activities here.'}
        title={<Trans i18nKey={'common:activitiesTabLabel'} />}
      />
      <PageBody>
        <If condition={!activities.length}>
          <ActivityEmptyState />
        </If>

        <ActivityTableContainer activities={activities} contacts={contacts} activitiesType={activitiesType} />
      </PageBody>
    </div>
  );
};

export async function loadData(params: { organizationUid: string }) {
  const client = getSupabaseServerClient();
  const { organizationUid } = params;
  const { data: activitiesType, } = await getActivitiesType(client);
  const { data: contacts,  } = await getContacts(client, organizationUid);
  const { data: activities ,error} = await getActivities(client, organizationUid);


  if (error) {
    console.error(error);

    return {
      activities: [],
    };
  }

  return {
    contacts,
    activitiesType,
    activities
  };
}

function ActivityTableContainer({
  activities,
  activitiesType,
  contacts,
}: React.PropsWithChildren<{
  activities: Activity[];
  contacts: Contact[];
  activitiesType:any
}>) {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex space-x-4 justify-between items-center'}>
        <div className={'flex'}>
          <CreateActivityModal contacts={contacts} activitiesType={activitiesType}>
            <Button >
              <span className={'flex space-x-2 items-center'}>
                <PlusCircleIcon className={'w-4'} />

                <span>New Activity</span>
              </span>
            </Button>
          </CreateActivityModal>
        </div>
      </div>
      <If condition={activities.length}>
        <ActivityTable activities={activities} />
      </If>
    </div>
  );
}
function CreateActivityModal({
  children,
  contacts,
  activitiesType
}: {
  children: any;
  contacts: Contact[];
  activitiesType:any
}) {
  return (
    <Modal heading={`Create Activity`} Trigger={children}>
      <ActivityForm contacts={contacts} activitiesType={activitiesType} />
    </Modal>
  );
}
function ActivityEmptyState() {
  return (
    <div className={'flex flex-col space-y-8 p-4'}>
      <div className={'flex flex-col'}>
        <Heading type={2}>
          <span className={'font-semibold'}>
            Hey, it looks like you don&apos;t have any activities yet
          </span>
        </Heading>

        <Heading type={4}>
          Add your first activity clicking on the button below
        </Heading>
      </div>
    </div>
  );
}
export default withI18n(ContactPage);
