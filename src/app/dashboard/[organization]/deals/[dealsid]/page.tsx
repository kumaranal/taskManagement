import React from 'react';
import AppHeader from '../../components/AppHeader';
import { PageBody } from '~/core/ui/Page';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import { getContact, getContacts } from '~/lib/contact/queries';
import { use } from 'react';
import { getDealsByID, getDealsData, getDealsStageType } from '~/lib/deals/queries';
import DealsItemContainer from '../components/DealsItemContainer';
interface Context {
  params: {
    dealsid: bigint;
    organization:string;
  };
}

const ContactPage = ({ params }: Context) => {
  const { dealsid,organization } = params;

  const { deals,dealStageType,contacts } = use(
    loadDealsData(dealsid,organization),
  );
  return (
    <>
      <AppHeader title={`Deals`}></AppHeader>

      <PageBody>
        <DealsItemContainer deals={deals} dealStageType={dealStageType} contacts={contacts}  organization={organization}/>
      </PageBody>
    </>
  );
};


export async function loadDealsData(dealsId:bigint,organization:string) {
  const client = getSupabaseServerClient();
  const { data: dealStageType } = await getDealsStageType(client);
  const { data: contacts, } = await getContacts(client, organization);
  const { data: deals, error } = await getDealsByID(client, dealsId);

  if (error) {
    console.error(error);

    return {
      deals: [],
    };
  }
  return {
    dealStageType,
    deals,
    contacts
  };
}

export default ContactPage;
