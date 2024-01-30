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
import ContactForm from './components/ContactForm';
import { getContacts } from '~/lib/contact/queries';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import ContactTable from './components/ContactTable';

interface TasksPageParams {
  params: {
    organization: string;
  };
}

const ContactPage = ({ params }: TasksPageParams) => {
  const { contacts } = use(
    loadContactsData({
      organizationUid: params.organization,
    }),
  );
  return (
    <div>
      <AppHeader
        description={'Manage your contact here.'}
        title={<Trans i18nKey={'common:contactTabLabel'} />}
      />
      <PageBody>
        <If condition={!contacts.length}>
          <ContactEmptyState />
        </If>

        <ContactTableContainer contacts={contacts} />
      </PageBody>
    </div>
  );
};

export async function loadContactsData(params: { organizationUid: string }) {
  const client = getSupabaseServerClient();
  const { organizationUid } = params;

  const { data: contacts, error } = await getContacts(client, organizationUid);

  if (error) {
    console.error(error);

    return {
      contacts: [],
    };
  }

  return {
    contacts,
  };
}

function ContactTableContainer({
  contacts,
}: React.PropsWithChildren<{
  contacts: Contact[];
}>) {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex space-x-4 justify-between items-center'}>
        <div className={'flex'}>
          <CreateContactModal>
            <Button variant={'ghost'}>
              <span className={'flex space-x-2 items-center'}>
                <PlusCircleIcon className={'w-4'} />

                <span>New Contact</span>
              </span>
            </Button>
          </CreateContactModal>
        </div>
      </div>
      <If condition={contacts.length}>
        <ContactTable contacts={contacts} />
      </If>
    </div>
  );
}
function CreateContactModal(props: React.PropsWithChildren) {
  return (
    <Modal heading={`Create Contact`} Trigger={props.children}>
      <ContactForm />
    </Modal>
  );
}
function ContactEmptyState() {
  return (
    <div className={'flex flex-col space-y-8 p-4'}>
      <div className={'flex flex-col'}>
        <Heading type={2}>
          <span className={'font-semibold'}>
            Hey, it looks like you don&apos;t have any contact yet
          </span>
        </Heading>

        <Heading type={4}>
          Add your first contact clicking on the button below
        </Heading>
      </div>
    </div>
  );
}
export default withI18n(ContactPage);
