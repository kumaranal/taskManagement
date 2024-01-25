import getSupabaseServerActionClient from "~/core/supabase/action-client";
import { insertSchool } from "./database/mutation";
import { redirect } from "next/navigation";

export async function createPostAction(title: string,content: string) {
    // console.log(“param”,title,content)
    const client = getSupabaseServerActionClient();
    const data= await insertSchool(client, {
      title,
      content,
    });
  //  console.log(“f”,data)
    // revalidatePath(`/dashboard/view`, ‘page’);
    // redirect to the post page.
    // NB: it will return a 404 error since we haven’t implemented the post page yet
    return redirect(`/dashboard/view`);
  }