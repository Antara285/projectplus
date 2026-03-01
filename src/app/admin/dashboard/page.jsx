"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState([]);
  const [profile , setProfile] = useState(null)
  const [mail , setMail] = useState('')


  useEffect(()=>{
    const admin = async () => {
      const supabase =  createClient()
       const {data:{user}} = await supabase.auth.getUser()
       
       if(!user) return
        setMail(user?.email)

      const {data:profiledata , error} = await supabase.from('profile').select('*').eq("user_id",user.id)
      
      if (profiledata?.[0]?.role !== "admin") {
       router.push("/unauthorized");
      return;
}

      if(error){
        router.push('/admin')
      }
      setProfile(profiledata?.[0])

          const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)

    if (!projectError) {
      setProjects(projectData)
    }
    }
    admin()
  },[]
  )
    
  return (
    
      <div className="min-h-screen max-w-screen mx-auto bg-white shadow-2xl ">

        {/* ===== PROFILE SECTION ===== */}
        <div className="bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#0e7490] via-[#06b6d4] to-[#0891b2] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">

         
          {/* Left Side - Profile */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-md border border-white/30">
              👤
            </div>

            <div>
               
              <h2 className="text-xl text-white font-semibold">{profile?.name} • Admin</h2>
              <p className="opacity-99 text-white">{profile?.company}</p>
              <p className="opacity-95 text-white text-sm">{mail}</p>
            </div>
          </div>
          {/* Right Side - Logout Button */}
          <button
            onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.push("/login");
            }}
            className="px-6 py-2 mr-15 w-[20vh] ml-7 mt-2 cursor-pointer font-bold text-xl text-[#042f2e] inset-shadow-2xl shadow-xl/20 rounded-full transition delay-5 duration-200 ease-in hover:-translate-y-1 hover:scale-100  bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] via-[#22d3ee] to-[#06b6d4]"
          >
            Logout
          </button>
        </div>

        {/* ===== CREATE PROJECT BUTTON ===== */}
        <div className="flex justify-center my-8">
          <button
            onClick={() => router.push("/admin/dashboard/create-project")}
            className="px-4 py-2 mr-15 w-[35vh] h-[9vh] ml-7 mt-2 cursor-pointer font-bolder min-text-lg sm:text-lg lg:text-xl inset-shadow-2xl shadow-xl/20 rounded-full transition delay-5 duration-200 ease-in hover:-translate-y-1 hover:scale-100 bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] via-[#22d3ee] to-[#06b6d4] hover:bg-gradient-to-r hover:from-[#0e7490] hover:via-[#06b6d4] hover:via-[#67e8f9] hover:via-[#06b6d4] hover:to-[#0e7490] text-[#042f2e] rounded-full font-semibold shadow-lg transition duration-300 "
          >
            Create New Project
          </button>
        </div>

        {/* ===== PROJECTS SECTION ===== */}
        <div className="px-6 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Projects Overview
            </h3>
            <span className="text-gray-800 font-semibold">
              {projects.length} Project{projects.length !== 1 && "s"}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">📁</div>
              <h4 className="text-xl font-semibold">
                No projects yet
              </h4>
              <p>
                Click "Create New Project" to get started
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
  <div
    key={project.id}
    className="transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-100 bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#06b6d4] to-[#0891b2] p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
  >
    {/* Project Name */}
    <h4 className="text-2xl font-bold text-[#ecfeff] mb-1">
      {project.name}
    </h4>

    {/* Company */}
    <p className="text-[#ecfeff] text-lg font-semibold mb-1">
      <span className="font-semibold">Company:</span> {project.company}
    </p>

    {/* Deadline */}
    <p className="text-[#4c0519] text-semibold mb-3">
      <span className="font-semibold">Deadline:</span>{" "}
      {project.deadline
        ? new Date(project.deadline).toLocaleDateString()
        : "Not Set"}
    </p>

    {/* Feedback Button */}
    <button
      onClick={() =>
        router.push('/feedback')
      }
      className="mb-4 bg-gradient-to-r from-[#6ee7b7] via-[#a7f3d0] to-[#6ee7b7] hover:bg-gradient-to-r hover:from-[#2dd4bf] hover:via-[#6ee7b7] hover:to-[#2dd4bf] text-[#042f2e] px-4 py-2 rounded-lg text-sm font-semibold transition duration-300"
    >
     Give Feedback
    </button>

    {/* Progress Bar */}
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold text-xl text-white">Progress</span>
        <span className="text-[#f4f4f0] text-xl font-bold">
          {project.progress || 0}%
        </span>
      </div>

      <div className="w-full bg-cyan-100 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${project.progress || 0}%` }}
        ></div>
      </div>
    </div>
  </div>
))}
            </div>
          )}
        </div>
      </div>
  );
}
