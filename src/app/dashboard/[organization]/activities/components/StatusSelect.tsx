import React, { useState, useEffect } from 'react';
import Label from '~/core/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/core/ui/Select';

const StatusSelect = ({ onSelectStatus }: any) => {
  const statusOptions = [
    {
      label: "Open", value: "Open"
    },
    {
      label: "Ongoing", value: "ongoing"
    },
    {
      label: "Closed", value: "closed"
    }
  ];

  const defaultStatus = statusOptions[0].value;
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);

  const handleStatusChange = (value: React.SetStateAction<string>) => {
    setSelectedStatus(value);
  };

  useEffect(() => {
    onSelectStatus(selectedStatus);
  }, [onSelectStatus, selectedStatus]); 

  return (
    <Label>
      Status
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger data-cy={'role-selector-trigger'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem
              key={option.value}
              data-cy={`role-item-${option.value}`}
              value={option.value.toString()}
            >
              <span className={'text-sm'}>
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Label>
  );
}

export default StatusSelect;
