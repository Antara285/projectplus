"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function insertProfile(formData) {
  const supabase = await createClient()

  const name = formData.get("name")
  const company = formData.get("company")
  const {data:{user}} = await supabase.auth.getUser()
  if(!user){
    redirect('/members/login')
  }
  await supabase.from("profile").insert({
    name,
    company,
    user_id:user.id
  })
  redirect('/members/dashboard')
}