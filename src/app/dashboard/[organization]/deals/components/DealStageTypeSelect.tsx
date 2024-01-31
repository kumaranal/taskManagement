import React, { useState } from 'react';
import Label from '~/core/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/core/ui/Select';

const DealStageTypeSelect = ({ dealStageType, onSelectdealstageType,currentdata }: any) => {
  const id= currentdata && currentdata.toString() || "";
  const contactOptions = dealStageType.map((dealstagetype: { deal_stage_id: number; stage_name: string; }) => ({
    label: `${dealstagetype.stage_name}`,
    value: dealstagetype.deal_stage_id.toString(),
  }));

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(id);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    onSelectdealstageType(value); 
  };

  return (
    <Label>
      Select activity type from list
      <Select value={selectedStatus} onValueChange={handleStatusChange} required>
        <SelectTrigger data-cy={'role-selector-trigger'}>
          <SelectValue placeholder={"Please select an activity type from the list"} />
        </SelectTrigger>
        <SelectContent className='max-h-60'>
          {contactOptions.map((option: { value: string; label: string }) => (
            <SelectItem
              key={option.value}
              data-cy={`role-item-${option.value}`}
              value={option.value}
            >
              <span className={'text-sm'}>{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
};

export default DealStageTypeSelect;
