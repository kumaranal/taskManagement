'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import DataTable from '~/core/ui/DataTable';
import IconButton from '~/core/ui/IconButton';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import { Activity } from '~/lib/activity/types/type';
import { deleteActivity } from '~/lib/activity/mutation';
import { deleteActivityAction } from '~/lib/activity/action';

const TABLE_COLUMNS: ColumnDef<Activity>[] = [
  {
    header: 'Name',
    cell: ({ row }) => {
      const activity = row.original;

      return (
        <Link className={'hover:underline'} href={'activities/' + activity.id}>
          {activity.contactDetails?.first_name}{' '}
          {activity.contactDetails?.last_name}
        </Link>
      );
    },
  },
  {
    header: 'Task Type',
    cell: ({ row }) => {
      const activity = row.original;

      return <span>{activity.activityType?.type_name}</span>;
    },
  },
  {
    header: 'Subject',
    cell: ({ row }) => {
      const activity = row.original;

      return <span>{activity.subject}</span>;
    },
  },
  {
    header: 'Status',
    id: 'status',
    cell: ({ row }) => {
      const activity = row.original;

      return (
        <span className={'truncate max-w-[50px]'}>
          {activity.status || '-'}
        </span>
      );
    },
  },
  {
    header: 'Due Date',
    id: 'dueDate',
    cell: ({ row }) => {
      const activity = row.original;

      return (
        <span className={'truncate max-w-[50px]'}>
          {activity.due_date || '-'}
        </span>
      );
    },
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const activity = row.original;
      return (
        <div className={'flex'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <EllipsisVerticalIcon className="w-10" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              collisionPadding={{
                right: 20,
              }}
            >
              <DropdownMenuItem>
                <Link href={'activities/' + row.original.id}>Edit Activity</Link>
              </DropdownMenuItem>
              <DeleteTaskMenuItem activity={activity} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function ActivityTable(
  props: React.PropsWithChildren<{
    activities: Activity[];
  }>,
) {
  const router = useRouter();
  const pathname = usePathname();

  return <DataTable data={props.activities} columns={TABLE_COLUMNS} />;
}

function DeleteTaskMenuItem({ activity }: { activity: Activity }) {
  const [, startTransition] = useTransition();

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <ConfirmDeleteTaskModal
        activity={activity}
        onConfirm={() => {
          startTransition(async () => {
            await deleteActivityAction({ activityId: activity.id });
          });
        }}
      >
        <span className={'text-red-500'}>Delete Activity</span>
      </ConfirmDeleteTaskModal>
    </DropdownMenuItem>
  );
}

function ConfirmDeleteTaskModal({
  children,
  onConfirm,
  activity,
}: React.PropsWithChildren<{
  activity: Activity;
  onConfirm: () => void;
}>) {
  return (
    <Modal heading={`Deleting Activity`} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm flex flex-col space-y-2'}>
          <p>You are about to delete this activity.</p>

          <p>Do you want to continue?</p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Button variant={'destructive'} onClick={onConfirm}>
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ActivityTable;
