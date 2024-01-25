import getSupabaseServerActionClient from "~/core/supabase/action-client";
import { deleteSchool, insertSchool, updateSchoolDetails } from "./database/mutation";
import { redirect } from "next/navigation";

export async function createPostAction(formData:FormData) {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const contact_no = formData.get('contact_no') as unknown as number;
  const organizationId = formData.get('organizationId') as unknown as number;
  const client = getSupabaseServerActionClient();
     await insertSchool(client, {
      name,
      address,
      contact_no
    });
  //  console.log(“f”,data)
    // revalidatePath(`/dashboard/view`, ‘page’);
    // redirect to the post page.
    // NB: it will return a 404 error since we haven’t implemented the post page yet
    return redirect(`${`/dashboard/${organizationId}/settings/school`}`);
  }


  

export async function updatePostAction(formData: FormData) {
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const contact_no = formData.get('contact_no') as unknown as number;
  const id = formData.get('id') as unknown as number;
  const organizationId = formData.get('organizationId') as unknown as number;
  const client = getSupabaseServerActionClient();
  await updateSchoolDetails(client,{name,address,contact_no,id});
  return redirect(`${`/dashboard/${organizationId}/settings/school`}`);
}


export async function deleteSchoolAction(formData:any) {
  const organizationId = formData.get('organizationId') as unknown as number;
    const id = formData.get('id') as unknown as number;

  const client = getSupabaseServerActionClient();
  
  await deleteSchool(client, id);
  // revalidatePath(path, ‘page’);
  return redirect(`${`/dashboard/${organizationId}/settings/school`}`);
}