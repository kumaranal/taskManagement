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
import { Contact } from '~/lib/contact/types/type';
import { deleteTaskAction } from '~/lib/contact/actions';
import { toast } from 'sonner';

const TABLE_COLUMNS: ColumnDef<Contact>[] = [
  {
    header: 'Name',
    cell: ({ row }) => {
      const contact = row.original;

      return (
        <Link className={'hover:underline'} href={'contact/' + contact.id}>
          {contact.first_name} {contact.last_name}
        </Link>
      );
    },
  },
  {
    header: 'Email',
    id: 'email',
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <span className={'truncate max-w-[50px]'}>{contact.email || '-'}</span>
      );
    },
  },
  {
    header: 'Contact No.',
    id: 'contact',
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <span className={'truncate max-w-[50px]'}>{contact.phone || '-'}</span>
      );
    },
  },
  {
    header: 'Designation',
    id: 'designation',
    cell: ({ row }) => {
      const contact = row.original;

      return (
        <span className={'truncate max-w-[50px]'}>
          {contact.designation || '-'}
        </span>
      );
    },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className={'flex '}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <EllipsisVerticalIcon className="w-5" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              collisionPadding={{
                right: 20,
              }}
            >
              <DropdownMenuItem>
                <Link href={'contact/' + row.original.id}>Edit Contact</Link>
              </DropdownMenuItem>
              <DeleteTaskMenuItem contact={contact} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function ContactTable(
  props: React.PropsWithChildren<{
    contacts: Contact[];
  }>,
) {
  const router = useRouter();
  const pathname = usePathname();

  return <DataTable data={props.contacts} columns={TABLE_COLUMNS} />;
}

function DeleteTaskMenuItem({ contact }: { contact: Contact }) {
  const [, startTransition] = useTransition();

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <ConfirmDeleteTaskModal
        contact={contact}
        onConfirm={() => {
          startTransition(async () => {
            const data = await deleteTaskAction({ contactId: contact.id });
            if(data){
              toast.error(data)
            }
            else{
              toast.success("Contact detected successfully")
            }
          });
        }}
      >
        <span className={'text-red-500'}>Delete Contact</span>
      </ConfirmDeleteTaskModal>
    </DropdownMenuItem>
  );
}

function ConfirmDeleteTaskModal({
  children,
  onConfirm,
  contact,
}: React.PropsWithChildren<{
  contact: Contact;
  onConfirm: () => void;
}>) {
  return (
    <Modal heading={`Deleting Contact`} Trigger={children}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'text-sm flex flex-col space-y-2'}>
          <p>
            You are about to delete the Contact{' '}
            <b>
              {contact.first_name} {contact.last_name}
            </b>
          </p>

          <p>Do you want to continue?</p>
        </div>

        <div className={'flex justify-end space-x-2'}>
          <Button variant={'destructive'} onClick={onConfirm}>
            Yep, delete {contact.first_name} {contact.last_name}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ContactTable;
