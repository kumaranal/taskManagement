import React from 'react';
import AppHeader from '../../components/AppHeader';
import { PageBody } from '~/core/ui/Page';
import ContactItemContainer from '../components/ContactItemContainer';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import { getContact } from '~/lib/contact/queries';
import { use } from 'react';
interface Context {
  params: {
    contactId: number;
  };
}

const ContactPage = ({ params }: Context) => {
  const { contactId } = params;

  const { contact } = use(
    loadContactData(contactId),
  );
  return (
    <>
      <AppHeader title={`Contact`}></AppHeader>

      <PageBody>
        <ContactItemContainer contact={contact} />
      </PageBody>
    </>
  );
};
export async function loadContactData(contactId:number) {
  const client = getSupabaseServerClient();

  const { data: contact, error } = await getContact(client, contactId);

  if (error) {
    console.error(error);

    return {
      contact: [],
    };
  }

  return {
    contact,
  };
}

export default ContactPage;
