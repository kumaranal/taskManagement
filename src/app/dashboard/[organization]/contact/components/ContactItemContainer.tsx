'use client';

import { FormEventHandler, useCallback, useTransition } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

import Textarea from '~/core/ui/Textarea';
import Label from '~/core/ui/Label';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';

import { updateTaskAction } from '~/lib/tasks/actions';
import { Contact } from '~/lib/contact/types/type';

const ContactItemContainer: React.FC<{
  contact: Contact;
}> = ({ contact }) => {
  const [isMutating, startTransition] = useTransition();

  const onUpdate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const name = data.get('name') as string;
      const description = data.get('description') as string;

      startTransition(async () => {
        await updateTaskAction({
          contact: {
            name,
            description,
            id: contact.id,
          },
        });
      });
    },
    [contact.id],
  );

  return (
    <form onSubmit={onUpdate}>
      <div className={'flex flex-col space-y-4 max-w-xl'}>
        <Heading type={2}>{contact.first_name} {contact.last_name}</Heading>

        <TextFieldLabel>
          First Name
          <TextFieldInput required defaultValue={contact.first_name} name={'first_name'} />
        </TextFieldLabel>
        <TextFieldLabel>
          First Name
          <TextFieldInput required defaultValue={contact.first_name} name={'first_name'} />
        </TextFieldLabel>
        <TextFieldLabel>
          First Name
          <TextFieldInput required defaultValue={contact.first_name} name={'first_name'} />
        </TextFieldLabel>
        <TextFieldLabel>
          First Name
          <TextFieldInput required defaultValue={contact.first_name} name={'first_name'} />
        </TextFieldLabel>


        <div className={'flex space-x-2 justify-between'}>
          <Button href={'../tasks'} variant={'transparent'}>
            <span className={'flex space-x-2 items-center'}>
              <ChevronLeftIcon className={'w-4'} />
              <span>Back to Contact</span>
            </span>
          </Button>

          <Button loading={isMutating}>Update Contact</Button>
        </div>
      </div>
    </form>
  );
};

export default ContactItemContainer;
