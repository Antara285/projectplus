"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { CreateClient } from "@/lib/supabase/client";

export default function SignIn() {
   const router = useRouter()
   const supabase = CreateClient();
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const [error,setError] = useState('')

 async function handlesignin(e) {
  e.preventDefault();
  setError("");

  const { data, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    setError(signInError.message);
    return;
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profile")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  let role = "member"; // ✅ default fallback

  if (profile && profile.role) {
    role = profile.role;
  }

  console.log("User role:", role);

  if (role === "admin") {
    router.push("/admin/dashboard");
  } else if (role === "leader") {
    router.push("/leader/dashboard");
  } else {
    router.push("/members/dashboard");
  }
}

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

        <form onSubmit={handlesignin} className="bg-white text-cyan-900 rounded-3xl shadow-xl mt-10 p-6 w-[90%] max-w-md md:mt-[5vh] md:max-w-lg lg:mt-10">

          <h1 className="text-center text-2xl md:text-3xl font-bold text-cyan-800 mb-6">
            Login
          </h1>

          <label className="block text-lg font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 display:none mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />

          <label className="block text-lg font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 display:none mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />
          <button
            type="submit"
            className="w-[20rem] h-11 ml-15 mt-2 rounded-full text-xl font-bold text-slate-900 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 hover:from-indigo-500 hover:to-indigo-500 transition transform hover:-translate-y-1 shadow-lg"
          >
            Login
          </button>
          <h2 className="text-cyan-700 text-md font-semibold pt-4 text-center">Don't have an account ? <Link href={"/sign-up"}>SighUp</Link></h2>
      
        </form>

      </div>
    </div>
  );
}
