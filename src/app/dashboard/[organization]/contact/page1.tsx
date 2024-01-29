import { use } from 'react';

import { PlusCircleIcon } from '@heroicons/react/24/outline';

import getSupabaseServerClient from '~/core/supabase/server-component-client';
import { getTasks } from '~/lib/tasks/queries';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';

import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Modal from '~/core/ui/Modal';
import { PageBody } from '~/core/ui/Page';

import type Task from '~/lib/tasks/types/task';
import TasksTable from '~/app/dashboard/[organization]/tasks/components/TasksTable';
import SearchTaskInput from '~/app/dashboard/[organization]/tasks/components/SearchTaskInput';
import TaskForm from '~/app/dashboard/[organization]/tasks/components/TaskForm';

export const metadata = {
  title: 'Tasks',
};

interface TasksPageParams {
  params: {
    organization: string;
  };

  searchParams: {
    page?: string;
    query?: string;
  };
}

function TasksPage({ params, searchParams }: TasksPageParams) {
  const pageIndex = Number(searchParams.page ?? '1') - 1;
  const perPage = 8;

  const { tasks, count } = use(
    loadTasksData({
      organizationUid: params.organization,
      pageIndex,
      perPage,
      query: searchParams.query || '',
    }),
  );

  const pageCount = Math.ceil(count / perPage);

  return (
    <>
      <AppHeader
        description={'Manage your Tasks and never lose track of your work.'}
        title={<Trans i18nKey={'common:tasksTabLabel'} />}
      />

      <PageBody>
        <If condition={!count}>
          <TasksEmptyState />
        </If>

        <TasksTableContainer
          pageIndex={pageIndex}
          pageCount={pageCount}
          tasks={tasks}
          query={searchParams.query}
        />
      </PageBody>
    </>
  );
}

export async function loadTasksData(params: {
  organizationUid: string;
  pageIndex: number;
  perPage: number;
  query?: string;
}) {
  const client = getSupabaseServerClient();
  const { organizationUid, perPage, pageIndex, query } = params;

  const {
    data: tasks,
    error,
    count,
  } = await getTasks(client, {
    organizationUid,
    pageIndex,
    perPage,
    query,
  });

  if (error) {
    console.error(error);

    return {
      tasks: [],
      count: 0,
    };
  }

  return {
    tasks,
    count: count ?? 0,
  };
}

export default withI18n(TasksPage);

function TasksTableContainer({
  tasks,
  pageCount,
  pageIndex,
  query,
}: React.PropsWithChildren<{
  tasks: Task[];
  pageCount: number;
  pageIndex: number;
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

                <span>New Task</span>
              </span>
            </Button>
          </CreateTaskModal>
        </div>

        <SearchTaskInput query={query} />
      </div>

      <TasksTable pageIndex={pageIndex} pageCount={pageCount} tasks={tasks} />
    </div>
  );
}

function TasksEmptyState() {
  return (
    <div className={'flex flex-col space-y-8 p-4'}>
      <div className={'flex flex-col'}>
        <Heading type={2}>
          <span className={'font-semibold'}>
            Hey, it looks like you don&apos;t have any tasks yet... 🤔
          </span>
        </Heading>

        <Heading type={4}>
          Create your first task by clicking on the button below
        </Heading>
      </div>
    </div>
  );
}

function CreateTaskModal(props: React.PropsWithChildren) {
  return (
    <Modal heading={`Create Task`} Trigger={props.children}>
      <TaskForm />
    </Modal>
  );
}
