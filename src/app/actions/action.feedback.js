'use server'
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
export async function feedback(formData){
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
    if(!user) return
    const name = formData.get("name")
    const msg = formData.get("msg")
    await supabase.from('feedback').insert({
        user_id:user.id,
        name:name,
        msg:msg
})
    res.redirect('back')
}