
import { Section, SectionBody, SectionHeader } from '~/core/ui/Section'
import { createPostAction } from '~/lib/school/schoolDetails/action'
import Heading from '~/core/ui/Heading'
import Label from '~/core/ui/Label'
import { Input } from '~/core/ui/input'
import Button from '~/core/ui/Button'


const AddSchool = ({params}:any) => {
  const addSchool=async(formDta:any)=>{
    "use server"
    await createPostAction(formDta)
  }
  return (
    <Section>
    <SectionHeader
      title={"Add a School"}
    />
    <SectionBody>
    <div> <Heading type={4}>
    <div>Add New School</div>
</Heading>
<form action={addSchool}>
  <Input name='organizationId' defaultValue={params.organization} className='hidden'/>
<Label className='flex flex-col space-y-1.5'>
    <span>School Name</span>
    <Input name='name' defaultValue={''}  required />
  </Label>
  <Label className='flex flex-col space-y-1.5'>
    <span>Address</span>
    <Input name='address' defaultValue={''}  required />
  </Label>
  <Label className='flex flex-col space-y-1.5'>
    <span>Contact No</span>
    <Input name='contact_no' type="number" defaultValue={''}  required />
  </Label>
  <Label className=' space-y-2'>
  <Button>
    Add New School
  </Button>
  </Label>
</form></div>
    </SectionBody>
  </Section>
  )
}

export default AddSchool