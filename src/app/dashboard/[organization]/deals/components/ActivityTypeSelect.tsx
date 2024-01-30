import React, { useState } from 'react';
import Label from '~/core/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/core/ui/Select';

const ActivityTypeSelect = ({ activitiesType, onSelectActivityType }: any) => {
  const contactOptions = activitiesType.map((activity: { activity_type_id: number; type_name: string; }) => ({
    label: `${activity.type_name}`,
    value: activity.activity_type_id.toString(),
  }));

  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    onSelectActivityType(value); 
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

export default ActivityTypeSelect;
