'use client';

import { FormEventHandler, useCallback, useTransition } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import { Contact } from '~/lib/contact/types/type';
import { updateContactAction } from '~/lib/contact/actions';

const ActivityItemContainer: React.FC<{
  contact: Contact;
}> = ({ contact }) => {
  const [isMutating, startTransition] = useTransition();

  const onUpdate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const first_name = data.get('first_name') as string;
      const last_name = data.get('last_name') as string;
      const email = data.get('email') as string;
      const phone = data.get('phone') as unknown as number;
      const linkedin_profile = data.get('linked') as string;
      const designation = data.get('designation') as string;
      startTransition(async () => {
        await updateContactAction({
          contact: {
            first_name,
            last_name,
            email,
            phone,
            linkedin_profile,
            designation,
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
        <Heading type={2}>
          {contact.first_name} {contact.last_name}
        </Heading>

        <TextFieldLabel>
          First Name
          <TextFieldInput
            required
            defaultValue={contact.first_name}
            name={'first_name'}
          />
        </TextFieldLabel>
        <TextFieldLabel>
          Last Name
          <TextFieldInput
            required
            defaultValue={contact.last_name}
            name={'last_name'}
          />
        </TextFieldLabel>
        <TextFieldLabel>
          Email
          <TextFieldInput
            required
            defaultValue={contact.email}
            name={'email'}
          />
        </TextFieldLabel>
        <TextFieldLabel>
          Contact No
          <TextFieldInput
            required
            defaultValue={contact.phone}
            name={'phone'}
          />
        </TextFieldLabel>
        <TextFieldLabel>
          Designation
          <TextFieldInput
            required
            defaultValue={contact.designation}
            name={'designation'}
          />
        </TextFieldLabel>
        <TextFieldLabel>
          Linkedin Profile
          <TextFieldInput
            required
            defaultValue={contact.linkedin_profile}
            name={'linked'}
          />
        </TextFieldLabel>

        <div className={'flex space-x-2 justify-between'}>
          <Button href={'../contact'} variant={'transparent'}>
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

export default ActivityItemContainer;
