'use client'

import { CreateClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { insertProfile } from "@/app/actions/action.profile";

export default function AdminProfile() {
    
  const [name,setName] = useState('')
  const [compname,setCompName] = useState('')
  const [email,setEmail] = useState('')

  useEffect(
    () =>{
       async function getUser() {
         const supabase = CreateClient();
         const {data :{user}} = await supabase.auth.getUser();
         if(user){
          setEmail(user.email)
         }
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

        <form action={insertProfile}
            className="bg-white text-cyan-900 rounded-3xl shadow-xl mt-10 p-6 w-[90%] max-w-md md:mt-[5vh] md:max-w-lg lg:mt-10">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-cyan-800 mb-6">
            Profile
          </h1>

          <label className="block text-lg font-semibold mb-1 required">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Full Name"
            required
            onChange={(e) =>setName(e.target.value)}
            className="w-full h-9 mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />

          <label className="block text-lg font-semibold mb-1">
            Comapny Name
          </label>
          <input
            type="text"
            name="company"
            placeholder="Comapny Name"
            required
            value={compname}
            onChange={(e) => setCompName(e.target.value)}
            className="w-full h-9 mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />

          <label className="block text-lg font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="Email"
            value={email}
            required
            readOnly
            className="w-full h-9 mb-6 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="w-[20vh] h-11 rounded-full ml-15 text-xl font-bold md:w-[30rem] text-slate-900 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 hover:from-indigo-500 hover:to-indigo-500 transition transform hover:-translate-y-1 shadow-lg"
          >
            SET
          </button>
        </form>

      </div>
    </div>
  );
};
