'use server'
import { redirect } from "next/navigation"
import { createClient } from '@/lib/supabase/server'

export async function addadmin(formdata) {
  const supabase = await createClient()

  const email = String(formdata?.get?.('email') ?? '').trim()
  if(!email){
    throw new Error('email is required')
  }
  const password = String(formdata?.get?.('password') ?? '').trim()
  if(!password){
    throw new Error('password is rquired')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    throw new Error(error.message)
  }
  await supabase.from('Users').insert({
    id:data.user.id,
    email:data.user.email,
  })

  redirect('/members/member-profile')
}

