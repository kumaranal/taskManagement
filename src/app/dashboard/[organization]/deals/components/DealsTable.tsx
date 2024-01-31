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
import { Deals } from '~/lib/deals/types/type';
import { deleteDeals } from '~/lib/deals/mutation';
import { deleteDealAction } from '~/lib/deals/action';

const TABLE_COLUMNS: ColumnDef<Deals>[] = [
  {
    header: 'Emp Contact',
    cell: ({ row }) => {
      const deals = row.original;
      return (
        <Link className={'hover:underline'} href={'deals/' + deals.id}>
          {deals.contact_id?.first_name}{' '}
          {deals.contact_id?.last_name}
        </Link>
      );
    },
  },
  {
    header: 'Owner Contact',
    cell: ({ row }) => {
      const deals = row.original;

      return (
        <span>
          {deals.deal_owner?.first_name}{' '}
          {deals.deal_owner?.last_name}
          </span>
      );
    },
  },
  {
    header: 'Deal Value',
    cell: ({ row }) => {
      const deals = row.original;

      return <span>{deals.deal_value}</span>;
    },
  },
  {
    header: 'Expected Close Date',
    cell: ({ row }) => {
      const deals = row.original;

      return <span>{deals.expected_close_date}</span>;
    },
  },
  {
    header: 'Status',
    id: 'status',
    cell: ({ row }) => {
      const deals = row.original;

      return (
        <span >
          {deals.deal_stage_id?.stage_name}
        </span>
      );
    },
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const deals = row.original;
      console.log("deals",deals)

      return (
        <div className={'flex justify-start'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <EllipsisVerticalIcon className="w-6" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              collisionPadding={{
                right: 20,
              }}
            >
              <DropdownMenuItem>
                <Link href={'activity/' + row.original.id}>Edit Activity</Link>
              </DropdownMenuItem>
              <DeleteTaskMenuItem dealsdata={deals} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function DealsTable(
  props: React.PropsWithChildren<{
    deals: Deals[];
  }>,
) {
  const router = useRouter();
  const pathname = usePathname();

  return <DataTable data={props.deals} columns={TABLE_COLUMNS} />;
}

function DeleteTaskMenuItem({ deals }: { deals: Deals }) {
  const [, startTransition] = useTransition();

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <ConfirmDeleteTaskModal
        dealsdata={deals}
        onConfirm={() => {
          startTransition(async () => {
              await deleteDealAction({ dealsdataId: dealsdata.id });
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
  deals,
}: React.PropsWithChildren<{
  deals: Deals;
  onConfirm: () => void;
}>) {
  return (
    <Modal heading={`Deleting Activity`} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm flex flex-col space-y-2'}>
          <p>You are about to delete this deals's data.</p>

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

export default DealsTable;
