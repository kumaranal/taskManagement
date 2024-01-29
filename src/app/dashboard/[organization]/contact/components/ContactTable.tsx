import React from 'react'
import Button from '~/core/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/core/ui/Table'

const ContactTable = ({contacts}:any) => {
  return (
    <div className={'flex flex-col space-y-4 w-full'}>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sr No.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
      {contacts.map((contact:any,index:number) => (
        <TableRow key={index.toString()}>
          <TableCell>{index+1}</TableCell>
          <TableCell>{contact.first_name} {contact.last_name}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.designation}</TableCell>
          <TableCell className='flex gap-2'>
           <Button> Edit</Button>       
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  </div>
  )
}

export default ContactTable