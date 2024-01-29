'use client';

import type { FormEventHandler } from 'react';
import { useCallback, useTransition } from 'react';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';

import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import { createContactAction } from '~/lib/contact/actions';


const ContactForm: React.FC = () => {
  const [isMutating, startTransition] = useTransition();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as number;
  const onCreateTask: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const target = event.currentTarget;
      const data = new FormData(target);
      const first_name = data.get('fname') as string;
      const last_name = data.get('lname') as string;
      const email = data.get('email') as string;
      const phone = data.get('phone') as unknown as number;
      const linkedin_profile = data.get('linkedin') as string;
      const designation = data.get('designation') as string;

      // if (first_name.trim().length < 3) {
      //   toast.error('Task name must be at least 3 characters long');

      //   return;
      // }

      const contact = {
        organizationId,
        first_name,
        last_name,
        email,
        phone,
        linkedin_profile,
        designation,
      };

      startTransition(async () => {
        await createContactAction({ contact });
        console.log(contact)
      });
    },
    [organizationId],
  );



  return (
    <form className={'flex flex-col'} onSubmit={onCreateTask}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <TextField.Label>
          First Name
          <TextField.Input required name={'fname'} placeholder={'ex. Ram'} />
        </TextField.Label>
        <TextField.Label>
          Last Name
          <TextField.Input required name={'lname'} placeholder={'ex. Singh'} />
        </TextField.Label>
        <TextField.Label>
          Email Id
          <TextField.Input required name={'email'} placeholder={'ex. ramsingh@gmail.com'} />
        </TextField.Label>
        <TextField.Label>
          Contact No
          <TextField.Input required name={'phone'} placeholder={'ex. 58787878787'} />
        </TextField.Label>
        <TextField.Label>
        Linkedin Profile
          <TextField.Input required name={'linkedin'} placeholder={'ex. https://www.linkedin.com/iranee65454'} />
        </TextField.Label>
        <TextField.Label>
          Designation
          <TextField.Input required name={'designation'} placeholder={'ex. Marketing Head'} />
        </TextField.Label>

        <div className={'flex justify-end'}>
          <Button loading={isMutating}>
            <If condition={isMutating} fallback={<>Create Contact</>}>
              Creating Contact...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
