'use server'
import { createClient } from "@/lib/supabase/server";

export async function Member_project() {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user) return
     const {data:project_data}=supabase
     .from('projects')
     .select('id')
     .eq('user_id',user.id)
     .single()

     if(project_data){
        supabase.from('project_members').insert({
            user_id:user.id,
            project_id : project_data ,
      } )
     }
     const {data:profile_data}=supabase
     .from('profile')
     .select('id')
     .eq('user_id',user.id)
     .single()
      if(profile_data){
        supabase.from('project_members').insert({
            user_id:user.id,
            profile_id : profile_data ,
      } )
     }
     
}