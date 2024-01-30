'use client';

import type { FormEventHandler } from 'react';
import { useCallback, useState, useTransition } from 'react';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import Label from '~/core/ui/Label';
import Textarea from '~/core/ui/Textarea';
import ContactSelect from './ContactSelect';
import ActivityTypeSelect from './ActivityTypeSelect';
import StatusSelect from './StatusSelect';
import { createActivityAction } from '~/lib/activity/action';

const ActivityForm: React.FC = ({ contacts, activitiesType }: any) => {
  const [isMutating, startTransition] = useTransition();
  const [status, setStatus] = useState();
  const [selectedContact, setSelectedContact] = useState();
  const [activities, setActivities] = useState();
  const organization = useCurrentOrganization();
  const organizationId = organization?.id as number;

  const onActivityCreate: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const target = event.currentTarget;
      const data = new FormData(target);
      const subject = data.get('subject') as string;
      const notes = data.get('notes') as string;
      const dueDate = (data.get('dueDate') as string) || getDefaultDueDate();

      const activity = {
        organizationId,
        subject,
        notes,
        dueDate,
        status,
        selectedContact,
        activities
      };
      startTransition(async () => {
      
        await createActivityAction({ activity });
      });
    },
    [activities, organizationId, selectedContact, status],
  );
  return (
    <form className={'flex flex-col'} onSubmit={onActivityCreate}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <ContactSelect
          contacts={contacts}
          onSelectContact={(value: any) => setSelectedContact(value)}
        />
        <ActivityTypeSelect
          activitiesType={activitiesType}
          onSelectActivityType={(value: any) => setActivities(value)}
        />
        <TextField.Label>
          Subject
          <TextField.Input
            required
            name={'subject'}
            placeholder={'Add subject here..'}
          />
        </TextField.Label>
        <Label>
          notes
          <Textarea
            name={'notes'}
            className={'h-32'}
            placeholder={'Add notes...'}
          />
        </Label>
        <StatusSelect onSelectStatus={(value: any) => setStatus(value)} />
        <TextField.Label>
          Due date (optional)
          <TextField.Input name={'dueDate'} type={'date'} />
          <TextField.Hint>
            Leave empty to set the due date to tomorrow
          </TextField.Hint>
        </TextField.Label>

        <div className={'flex justify-end'}>
          <Button loading={isMutating}>
            <If condition={isMutating} fallback={<>Create Activity</>}>
              Creating Activity...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};
function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(23, 59, 59);
  return date.toDateString();
}

export default ActivityForm;
