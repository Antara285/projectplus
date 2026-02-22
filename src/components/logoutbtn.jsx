import { redirect } from "next/navigation"
import { CreateClient } from "@/app/lib/supabase/client"
export  async function logoutbtn(){
  const supabase = CreateClient()
  await supabase.auth.signOut()
  redirect('/admin')
}