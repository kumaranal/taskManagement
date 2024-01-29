import React from 'react'
import AppHeader from '../components/AppHeader'
import Trans from '~/core/ui/Trans'
import { withI18n } from '~/i18n/with-i18n'
import { PageBody } from '~/core/ui/Page'
import Heading from '~/core/ui/Heading'
import If from '~/core/ui/If'
import Button from '~/core/ui/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Modal from '~/core/ui/Modal'
import { Contact } from '~/lib/contact/types/type'
import ContactForm from './components/ContactForm'



const ContactPage = () => {
  const count=false
  return (
    <div>
    <AppHeader
        description={'Manage your contact here.'}
        title={<Trans i18nKey={'common:contactTabLabel'} />}
      />
      <PageBody>
      <If condition={!count}>
          <TasksEmptyState />
        </If>
        <TasksTableContainer
          // pageIndex={pageIndex}
          // pageCount={pageCount}
          // contacts={contacts}
          // query={searchParams.query}
        />
      </PageBody>
    </div>
  )
}

function TasksTableContainer({
  contacts,
  pageCount,
  pageIndex,
  query,
}: React.PropsWithChildren<{
  contacts?: Contact[];
  pageCount?: number;
  pageIndex?: number;
  query?: string;
}>) {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex space-x-4 justify-between items-center'}>
        <div className={'flex'}>
          <CreateTaskModal>
            <Button variant={'ghost'}>
              <span className={'flex space-x-2 items-center'}>
                <PlusCircleIcon className={'w-4'} />

                <span>New Contact</span>
              </span>
            </Button>
          </CreateTaskModal>
        </div>

        {/* <SearchTaskInput query={query} /> */}
      </div>

      {/* <TasksTable pageIndex={pageIndex} pageCount={pageCount} tasks={tasks} /> */}
    </div>
  );
}
function CreateTaskModal(props: React.PropsWithChildren) {
  return (
    <Modal heading={`Create Contact`} Trigger={props.children}>
     <ContactForm/>
    </Modal>
  );
}
function TasksEmptyState() {
  return (
    <div className={'flex flex-col space-y-8 p-4'}>
      <div className={'flex flex-col'}>
        <Heading type={2}>
          <span className={'font-semibold'}>
            Hey, it looks like you don&apos;t have any contact yet... 🤔
          </span>
        </Heading>

        <Heading type={4}>
          Add your first contact clicking on the button below
        </Heading>
      </div>
    </div>
  );
}
export default withI18n(ContactPage)