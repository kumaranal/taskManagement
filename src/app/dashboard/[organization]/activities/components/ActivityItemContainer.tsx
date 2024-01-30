'use client';

import { FormEventHandler, useCallback, useState, useTransition } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import TextField, { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import { Activity } from '~/lib/activity/types/type';
import Label from '~/core/ui/Label';
import Textarea from '~/core/ui/Textarea';
import StatusSelect from './StatusSelect';

const ActivityItemContainer: React.FC<{
  activitity: Activity;
}> = ({ activitity }) => {
  const [isMutating, startTransition] = useTransition();
  const [status, setStatus] = useState();

  const onUpdate: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const subject = data.get('subject') as string;
      const notes = data.get('notes') as string;
      const dueDate = (data.get('dueDate') as string) || getDefaultDueDate();
      startTransition(async () => {
        const activity={
          subject,status,notes,dueDate,
        }
        // await updateContactAction({
        //   contact: {
        //     first_name,
        //     last_name,
        //     email,
        //     phone,
        //     linkedin_profile,
        //     designation,
        //     id: activitity.id,
        //   },
        // });
        console.log("activity",activity)
      });
    },
    [status],
  );

  return (
    <form onSubmit={onUpdate}>
      <div className={'flex flex-col space-y-4 max-w-xl'}>
        <TextField.Label>
          Subject
          <TextField.Input
            required
            defaultValue={activitity.subject}
            name={'subject'}
            placeholder={'Add subject here..'}
          />
        </TextField.Label>
        <Label>
          Notes
          <Textarea
            name={'notes'}
            className={'h-32'}
            defaultValue={activitity.notes}
            placeholder={'Add notes...'}
          />
            <StatusSelect onSelectStatus={(value: any) => setStatus(value)}  defaultValue={activitity.status}/>
        </Label>
        <TextField.Label>
          Due date (optional)
          <TextField.Input name={'dueDate'} type={'date'} defaultValue={activitity.due_date} />
          <TextField.Hint>
            Leave empty to set the due date to tomorrow
          </TextField.Hint>
        </TextField.Label>

    

        <div className={'flex space-x-2 justify-between'}>
          <Button href={'../activities'} variant={'transparent'}>
            <span className={'flex space-x-2 items-center'}>
              <ChevronLeftIcon className={'w-4'} />
              <span>Back to Activity</span>
            </span>
          </Button>

          <Button loading={isMutating}>Update Contact</Button>
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
export default ActivityItemContainer;
