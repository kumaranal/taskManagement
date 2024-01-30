'use client';

import type { FormEventHandler } from 'react';
import { useCallback, useState, useTransition } from 'react';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import Label from '~/core/ui/Label';
import Textarea from '~/core/ui/Textarea';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';
import ContactSelect from './ContactSelect';
import ActivityTypeSelect from './DealStageTypeSelect';
import StatusSelect from './StatusSelect';
import DealStageTypeSelect from './DealStageTypeSelect';

const DealForm: React.FC = ({ contacts, dealStageType }: any) => {
  const [isMutating, startTransition] = useTransition();
  const [status, setStatus] = useState();
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
      startTransition(async () => {
        // await createContactAction({ contact });
      });
    },
    [organizationId],
  );
  return (
    <form className={'flex flex-col'} onSubmit={onActivityCreate}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <ContactSelect contacts={contacts} onSelectContact={(value: any)=>console.log("onSelectContact",value)} />
        {/* <DealStageTypeSelect activitiesType={activitiesType}  onSelectActivityType={(value: any)=>console.log("value",value)}/> */}
        <TextField.Label>
          Deal Value
          <TextField.Input
            required
            name={'dealValue'}
            placeholder={'Add deal value here..'}
          />
        </TextField.Label>
      
        <StatusSelect onSelectStatus={(value: any) => setStatus(value)} />
        <TextField.Label>
          Expected Close date (optional)
          <TextField.Input name={'dueDate'} type={'date'} />
          <TextField.Hint>
            Leave empty to set the due date to tomorrow
          </TextField.Hint>
        </TextField.Label>
        
        <ContactSelect contacts={contacts} onSelectContact={(value: any)=>console.log("onSelectContact",value)} />

        <div className={'flex justify-end'}>
          <Button loading={isMutating}>
            <If condition={isMutating} fallback={<>Create Deals</>}>
              Creating Deals...
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

export default DealForm;
