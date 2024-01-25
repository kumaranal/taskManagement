
import { Section, SectionBody, SectionHeader } from '~/core/ui/Section'
import SchoolForm from '../../components/SchoolForm';


const AddSchool = () => {

  return (
    <Section>
    <SectionHeader
      title={"Add a School"}
    />
    <SectionBody>
     <SchoolForm />
    </SectionBody>
  </Section>
  )
}

export default AddSchool