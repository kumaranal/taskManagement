
import React from 'react'
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client'
import { fetchSchool } from '~/lib/school/schoolDetails/database/queries'
import SchoolListing from './components/SchoolListing'

const ViewPage =async ({
  params,
}:any) => {
  const organizationId=params.organization
  const data = await loadPost()
  return <SchoolListing data={data} organizationId={organizationId}/>
}

export default ViewPage




async function loadPost() {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await fetchSchool(client);
  if (error) {
    throw error;
  }
  return data;
}

