'use client';

import { FormEventHandler, useCallback, useState, useTransition } from 'react';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { Contact } from '~/lib/contact/types/type';
import { DealStageType, Deals } from '~/lib/deals/types/type';
import ContactSelect from './ContactSelect';
import DealStageTypeSelect from './DealStageTypeSelect';
import If from '~/core/ui/If';
import { updateDealAction } from '~/lib/deals/action';

const DealsItemContainer: React.FC<{
  deals: Deals; dealStageType:DealStageType ; contacts?:Contact ;organization?:string
}> = ({ deals ,dealStageType ,contacts,organization}) => {
  console.log("deals data", deals)
  const dealId=deals.id
   const [isMutating, startTransition] = useTransition();
   const [contact_id, setSelectedContact] = useState(deals.contact_id?.id);
   const [deal_stage_id, setdealstagetype] = useState(deals.deal_stage_id?.deal_stage_id);


   const onDealUpdate: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const target = event.currentTarget;
      const data = new FormData(target);
      const deal_value = data.get('dealValue') as unknown as number;
      const expected_close_date = (data.get('dueDate') as string) ;
      const organization_id = organization;
      const id=dealId;
      const deals = {id,
        organization_id,
        contact_id,
        deal_stage_id,
        deal_value,
        expected_close_date,
      };


      startTransition(async () => {
        await updateDealAction({ deals });
      });
    },
    [contact_id, dealId, deal_stage_id, organization],
  );


  return (
    <form className={'flex flex-col'} onSubmit={onDealUpdate}>
      <div className={'flex flex-col space-y-4 w-full'}>
        <ContactSelect
          contacts={contacts} currentdata={deals.contact_id?.id}
          onSelectContact={(value: any) =>
            setSelectedContact(value)
          }
        />
        <DealStageTypeSelect
          dealStageType={dealStageType} currentdata={deals.deal_stage_id?.deal_stage_id}
          onSelectdealstageType={(value: any) => setdealstagetype(value)}
        />

        <TextField.Label>
          Deal Value
          <TextField.Input
            required
            name={'dealValue'}
            defaultValue={deals.deal_value}
            placeholder={'Add deal value here..'}
          />
        </TextField.Label>

        <TextField.Label>
          Expected Close date
          <TextField.Input name={'dueDate'} type={'date'} defaultValue={deals.expected_close_date} />
        </TextField.Label>


        <div className={'flex justify-end'}>
          <Button loading={isMutating}>
            <If condition={isMutating} fallback={<>Update Deals</>}>
              Updateing Deals...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );

};

export default DealsItemContainer;
