import React from 'react'
import AppHeader from '../../components/AppHeader';
import Button from '~/core/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PageBody } from '~/core/ui/Page';
import ContactItemContainer from '../components/ContactItemContainer';
interface Context {
    params: {
        contactId: string;
    };
  }

const ContactPage = ({params}:Context) => {
    const contact=[]
  return (
 
    <>
    <AppHeader title={`Contact`}>
    </AppHeader>

    <PageBody>
        <ContactItemContainer contact={contact}/>
      
    </PageBody>
  </>
  )
}

export default ContactPage