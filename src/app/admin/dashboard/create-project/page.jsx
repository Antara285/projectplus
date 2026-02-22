'use client'

import { addProject } from "@/app/actions/action.project";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a5f3fc] via-white to-[#a5f3fc] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-8">
        <h2 className="flex flex-col justify-center items-center text-2xl text-cyan-900 font-semibold mb-2">
          Create New Project
        </h2>
        <p className="flex flex-col justify-center items-center text-cyan-900 mb-6">
          Fill in the details to create a new project
        </p>

        {/* IMPORTANT: encType required for file upload */}
        <form action={addProject} className="">
          
          <label className="font-bold text-cyan-900 ">Project Name</label>
          <input
            name="name"
            required
            placeholder="Project Name"
            className="w-full border mt-2 mb-4 text-cyan-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-700 outline-none"
          />

          <label className="font-bold text-cyan-900 ">Company Name</label>
          <input
            name="company"
            required
            placeholder="Project Company Name"
            className="w-full border mt-2 mb-4 text-cyan-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-700 outline-none"
          />

          <label className="font-bold text-cyan-900 ">Project Leader Name</label>
          <input
            name="leader"
            required
            placeholder="Leader Assigned"
            className="w-full border mt-2 mb-4 text-cyan-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-700 outline-none"
          />

          <label className="font-bold text-cyan-900 ">Scope of Project</label>
          <textarea
            name="scope"
            required
            placeholder="Scope of Project"
            className="w-full border resize-none mt-2 mb-4 text-cyan-900 rounded-lg px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-cyan-700 outline-none"
          />

          <label className="font-bold text-cyan-900 ">Requirements File</label>
          <input
            type="file"
            name="file"
            required
            className="w-full border mt-2 mb-4 text-cyan-900 rounded-xl px-4 py-2"
          />

          <label className="font-bold text-cyan-900 ">Deadline</label>
          <input
            type="date"
            name="deadline"
            required
            className="w-full border mt-2 mb-4 text-cyan-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#0891b2] mt-2 mb-4  text-cyan-100 font-bold text-xl py-3 rounded-lg hover:bg-[#0e7490]"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="flex-1 bg-[#cffafe] py-3 text-cyan-900 font-bold text-xl mt-2 mb-4 rounded-lg hover:bg-[#a5f3fc]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}