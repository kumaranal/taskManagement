import React, { useState } from 'react';
import Label from '~/core/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/core/ui/Select';

const ContactSelect = ({ contacts, onSelectContact }: any) => {
  const contactOptions = contacts.map((contact: { first_name: string; last_name: string; id: { toString: () => any; }; }) => ({
    label: `${contact.first_name} ${contact.last_name}`,
    value: contact.id.toString(),
  }));

  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(undefined);

  const handleContactChange = (value: string) => {
    setSelectedContactId(value);
    onSelectContact(value); 
  };

  return (
    <Label>
      Select contact from the list
      <Select value={selectedContactId} onValueChange={handleContactChange} required>
        <SelectTrigger data-cy={'role-selector-trigger'}>
          <SelectValue placeholder={"Please select a contact from the list"} />
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

export default ContactSelect;
