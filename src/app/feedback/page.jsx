'use client'

import { CreateClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { feedback } from "../actions/action.feedback";
import { useRouter } from "next/navigation";

export default function Feedback() {
   const router = useRouter()
    
  const [name,setName] = useState('')

  useEffect(
    () =>{
       async function getUser() {
         const supabase = CreateClient();
        const {data:{user}} = await supabase.auth.getUser()
        if(!user){
          return
        }
         const {data,error} = await supabase
          .from('profile')
          .select('name')
          .eq('id',user.id)
          .single()
         if(data){
          setName(data.name)
         }
         if(error) return
       };
       getUser();
      },[]
  )
  

    return (
    <div className="min-h-screen w-full bg-gradient-to-r from-cyan-100 via-cyan-300 to-cyan-100 relative">

      {/* Logo (Top Left Always) */}
      <img
        src="/workgrid.svg"
        alt="WorkGrid Logo"
        className="absolute top-[-30] left-[-2] w-[15rem] ml-[8vh] md:left-[-4rem] md:w-50 lg:w-[20rem]"
      />

      {/* Center Form */}
      <div className="flex justify-center items-center min-h-screen">

        <form action={feedback}
            className="bg-white text-cyan-900 rounded-3xl shadow-xl mt-10 p-6 w-[90%] max-w-md md:mt-[5vh] md:max-w-lg lg:mt-10">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-cyan-800 mb-6">
            What's On Your Mind ?
          </h1>

          <label className="block text-lg font-semibold mb-1 required">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-9 mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />
          <label className="block text-lg font-semibold mb-1 required">
            Message
          </label>
          <textarea
            type="text"
            name="msg"
            placeholder="Anything in your mind? Just be KIND...."
            required
            onChange={(e) =>setName(e.target.value)}
            className="w-full h-[5rem] mb-4 px-4 resize-none rounded-lg border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
           <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#0891b2] mt-2 mb-4  text-cyan-100 font-bold text-xl py-3 rounded-lg hover:bg-[#0e7490]"
            >
              Send
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-[#cffafe] py-3 text-cyan-900 font-bold text-xl mt-2 mb-4 rounded-lg hover:bg-[#a5f3fc]"
            >
              Cancel
            </button>
            </div>

        </form>

      </div>
    </div>
  );
};
