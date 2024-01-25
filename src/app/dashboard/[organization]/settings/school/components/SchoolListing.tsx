
import Link from 'next/link'
import React from 'react'
import configuration from '~/configuration'
import Button from '~/core/ui/Button'
import { Section, SectionBody } from '~/core/ui/Section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/core/ui/Table'
import DeleteButton from "../components/DeleteButton"

const SchoolListing = ({data,organizationId}:any) => {

  return (
    <Section>
     <div className='flex justify-between p-2	'>
      <div className='font-heading scroll-m-20 text-2xl font-bold tracking-tight dark:text-white'>School List</div>
     <Button>
        <Link href={getPath(organizationId, 'add')}>Add School</Link>
      </Button>
     </div>
     <SectionBody>
     <div className={'flex flex-col space-y-4 w-full'}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>School Name</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {data.map((data:any,index:number) => (
          <TableRow key={index.toString()}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>+91 {data.contact_no}</TableCell>
            <TableCell className='flex gap-2'>
             <Button> <Link href={getPath(organizationId, `${`edit/${data.id}` }`)}>Edit</Link></Button>
            <DeleteButton id={data.id} organizationId={organizationId}/>         
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
     
    </SectionBody>
    
    </Section>
  )
}

export default SchoolListing

function getPath(organizationId: string, path: string) {
    const appPrefix = configuration.paths.appPrefix;
    const appSchool=configuration.paths.settings.school
  
    return `${appPrefix}/${organizationId}/${appSchool}/${path}`;
  }