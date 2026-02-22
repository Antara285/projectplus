'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function addProject(formdata) {
  const supabase = await createClient()

  const name = formdata.get("name")
  const company = formdata.get("company")
  const leader = formdata.get("leader")
  const scope = formdata.get("scope")
  const deadline = formdata.get("deadline")
  const file = formdata.get("file")

  const { data: { user } } = await supabase.auth.getUser()
  console.log("USER OBJECT:", user)
  
  if (!user) {
    redirect("/admin")
  }


  if (!file || file.size === 0) {
    throw new Error("File is required")
  }

  // Make filename unique
  const filePath = `projects/${user.id}-${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from("requirement_files")   // ⚠ Make sure this matches EXACT bucket name
    .upload(filePath, file)

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data } = supabase.storage
    .from("requirement_files")
    .getPublicUrl(filePath)

  const fileURL = data.publicUrl

   // 🔥 1️⃣ Get leader profile first
  const { data: leaderProfile, error: leaderError } = await supabase
    .from("profile")
    .select("user_id") // or "id" depending on your foreign key
    .eq("role", "leader")
    .single()

  if (leaderError || !leaderProfile) {
    throw new Error("Leader not found in profile table")
  }

  const { error: insertError } = await supabase
    .from("projects")
    .insert({
      leader_id: leaderProfile.user_id,
      name : formdata.get("name"),
      company : formdata.get("company"),
      leader : formdata.get("leader"),
      scope : formdata.get("scope"),
      deadline : formdata.get("deadline"),
      file_url: fileURL,
     
    })

  if (insertError) {
    throw new Error(insertError.message)
  }

  // Redirect after success
  redirect("/admin/dashboard")
}