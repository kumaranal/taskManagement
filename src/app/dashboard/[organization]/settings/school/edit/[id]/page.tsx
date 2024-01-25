import React from 'react'
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import Label from '~/core/ui/Label';
import { Input } from '~/core/ui/input';
import { updatePostAction } from '~/lib/school/schoolDetails/action';
import { fetchSchoolUsingId } from '~/lib/school/schoolDetails/database/queries';

const EditSchool = async({params}:any) => {
    const res=await loadPost(params.id)
    const updateData=async(formDta: any)=>{
        "use server"
        await updatePostAction(formDta)
        
    }
  return (
    <div>
        <Heading type={4}>
            <div>Update the details of {res[0].name}</div>
        </Heading>
        <form action={updateData}>
        <input  name='organizationId' className='hidden' defaultValue={params.organization} />
        <input  name='id' className='hidden' defaultValue={res[0].id} />
        <Label className='flex flex-col space-y-1.5'>
            <span>School Name</span>
            <Input name='name' defaultValue={res[0].name} required />
          </Label>
          <Label className='flex flex-col space-y-1.5'>
            <span>Address</span>
            <Input name='address' defaultValue={res[0].address} required />
          </Label>
          <Label className='flex flex-col space-y-1.5'>
            <span>Contact No</span>
            <Input name='contact_no' defaultValue={res[0].contact_no} required />
          </Label>
          <Label className=' space-y-2'>
          <Button>
            Update
          </Button>
          </Label>
        </form>
    </div>
  )
}

export default EditSchool

async function loadPost(id: number) {
  const client = getSupabaseServerComponentClient();
  const { data, error } = await fetchSchoolUsingId(client, id);
  if (error) {
    throw error;
  }
  return data;
}