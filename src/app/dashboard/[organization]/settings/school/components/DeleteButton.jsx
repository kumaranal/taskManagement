import React from 'react'
import Button from '~/core/ui/Button'
import { deleteSchoolAction } from '~/lib/school/schoolDetails/action'


const DeleteButton = ({id,organizationId}) => {
    const DeleteButtonAction=async(formData)=>{
        "use server"
        await deleteSchoolAction(formData)

    }
  return (
    <form action={DeleteButtonAction}>
    <input className='hidden'name='id' defaultValue={id}/>
    <input className='hidden'name='organizationId' defaultValue={organizationId}/>
    <Button>Delete</Button>
    </form>
  )
}

export default DeleteButton