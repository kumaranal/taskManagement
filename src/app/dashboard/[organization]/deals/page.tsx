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
import ActivityForm from './components/DealForm';
import { getActivitiesType } from '~/lib/activity/queries';
import DealForm from './components/DealForm';
import { getDealsData, getDealsTypeData } from '~/lib/deals/queries';

interface DealPageParams {
  params: {
    organization: string;
  };
}

const DealPage = ({ params }: DealPageParams) => {
  const { contacts, DealStageType } = use(
    loadData({
      organizationUid: params.organization,
    }),
  );
  const deals: string | any[] = [];

  return (
    <div>
      <AppHeader
        description={'Manage your deals here.'}
        title={<Trans i18nKey={'common:DealsTabLabel'} />}
      />
      <PageBody>
        <If condition={!deals.length}>
          <DealsEmptyState />
        </If>

        <DealsTableContainer deals={deals} contacts={contacts} dealStageType={DealStageType} />
      </PageBody>
    </div>
  );
};

export async function loadData(params: { organizationUid: string }) {
  const client = getSupabaseServerClient();
  const { organizationUid } = params;
  const { data: DealStageType } = await getDealsTypeData(client);
  const { data: contacts, error } = await getContacts(client, organizationUid);

  if (error) {
    console.error(error);

    return {
      contacts: [],
    };
  }

  return {
    contacts,
    DealStageType
  };
}

function DealsTableContainer({
  deals,
  dealStageType,
  contacts,
}: React.PropsWithChildren<{
  activities: Contact[];
  contacts: Contact[];
  dealStageType: any
}>) {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex space-x-4 justify-between items-center'}>
        <div className={'flex'}>
          <CreateDealsModal contacts={contacts} dealStageType={dealStageType}>
            <Button variant={'ghost'}>
              <span className={'flex space-x-2 items-center'}>
                <PlusCircleIcon className={'w-4'} />

                <span>New Deals</span>
              </span>
            </Button>
          </CreateDealsModal>
        </div>
      </div>
      {/* <If condition={activities.length}>
        <ContactTable activities={activities} />
      </If> */}
    </div>
  );
}
function CreateDealsModal({
  children,
  contacts,
  dealStageType
}: {
  children: any;
  contacts: Contact[];
  dealStageType: any
}) {
  return (
    <Modal heading={`Create Activity`} Trigger={children}>
      <DealForm contacts={contacts} dealStageType={dealStageType} />
    </Modal>
  );
}
function DealsEmptyState() {
  return (
    <div className={'flex flex-col space-y-8 p-4'}>
      <div className={'flex flex-col'}>
        <Heading type={2}>
          <span className={'font-semibold'}>
            Hey, it looks like you don&apos;t have any deals yet
          </span>
        </Heading>

        <Heading type={4}>
          Add your first deal clicking on the button below
        </Heading>
      </div>
    </div>
  );
}
export default withI18n(DealPage);
