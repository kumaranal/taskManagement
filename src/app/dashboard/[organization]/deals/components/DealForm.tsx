'use client';

import type { FormEventHandler } from 'react';
import { useCallback, useState, useTransition } from 'react';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import ContactSelect from './ContactSelect';
import DealStageTypeSelect from './DealStageTypeSelect';
import { createDealsAction } from '~/lib/deals/action';

const DealForm: React.FC = ({ contacts, dealStageType }: any) => {
  const [isMutating, startTransition] = useTransition();
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
      };

      startTransition(async () => {
        await createDealsAction({ deals });
      });
    },
    [organization_id,contact_id,deal_stage_id],
  );
  const handleKeyDown = (event:any) => {
    const keyCode = event.key;
    // Allow only numeric characters and backspace
    if ((isNaN(keyCode) || keyCode === ' ') && keyCode !== 'Backspace'  && keyCode!=='Tab') {
      event.preventDefault();
    }
  };
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
            autoComplete='off'
            onKeyDown={handleKeyDown}
          />
        </TextField.Label>

        <TextField.Label>
          Expected Close date(optional)
          <TextField.Input name={'dueDate'} type={'date'} />
          <TextField.Hint>
            Leave empty to set the due date to tomorrow
          </TextField.Hint>
        </TextField.Label>
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
