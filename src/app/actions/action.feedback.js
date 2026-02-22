'use server'
import { createClient } from "@/lib/supabase/server"
export async function feedback(formData){
    const supabase = await createClient()
    const name = formData.get("name")
    const msg = formData.get("msg")
    await supabase.from('feedback').insert({
        user_id:user.id,
        name:name,
        msg:msg
})
}