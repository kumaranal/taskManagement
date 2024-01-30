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
import { createDealsAction } from '~/lib/deals/action';

const DealForm: React.FC = ({ contacts, dealStageType }: any) => {
  const [isMutating, startTransition] = useTransition();
  const [deal_owner, setDealowner] = useState();
  const [contact_id, setSelectedContact] = useState();
  const [deal_stage_id, setdealstagetype] = useState();
  const organization = useCurrentOrganization();
  const organization_id = organization?.id as number;

  const onDealCreate: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const target = event.currentTarget;
      const data = new FormData(target);
      const deal_value = data.get('dealValue') as unknown as number;
      const expected_close_date = (data.get('dueDate') as string) || getDefaultDueDate();

      const deals = {
        organization_id,
        contact_id,
        deal_stage_id,
        deal_value,
        expected_close_date,
        deal_owner
      };

      startTransition(async () => {
        await createDealsAction({ deals });
      });
    },
    [organization_id,deal_owner,contact_id,deal_stage_id],
  );

  return (
    <form className={'flex flex-col'} onSubmit={onDealCreate}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <ContactSelect
          contacts={contacts}
          onSelectContact={(value: any) =>
            setSelectedContact(value)
          }
        />
        <DealStageTypeSelect
          dealStageType={dealStageType}
          onSelectdealstageType={(value: any) => setdealstagetype(value)}
        />

        <TextField.Label>
          Deal Value
          <TextField.Input
            required
            name={'dealValue'}
            placeholder={'Add deal value here..'}
          />
        </TextField.Label>

        <TextField.Label>
          Expected Close date
          <TextField.Input name={'dueDate'} type={'date'} />
        </TextField.Label>

        <ContactSelect
          contacts={contacts}
          onSelectContact={(value: any) =>
            setDealowner(value)
          }
        />

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
