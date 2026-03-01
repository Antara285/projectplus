"use client"
import { CreateClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUp() {
  const router = useRouter()
  const supabase = CreateClient()
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const [confirmpassword,setConfirmPassword] = useState('')

  async function handleSignUp() {
    try{
      setError('')
      const {data,error:signUpError}=await supabase.auth.signUp({email,password})
      if(signUpError){
        setError(`❌ ${signUpError.message}`)
        return
      }
      if(password!==confirmpassword){
        setError(`Password Do not match`)
        return
      }
      setError(`✅ Sign up successful!`)
      router.push('members/member-profile')
    }catch(err){
        setError(`❌ ${err.message}`)
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

        <form onSubmit={(e) => {
          e.preventDefault()
          handleSignUp
        }}
          
            className="bg-white text-cyan-900 rounded-3xl shadow-xl mt-10 p-6 w-[90%] max-w-md md:mt-[5vh] md:max-w-lg lg:mt-10">

          <h1 className="text-center text-2xl md:text-3xl font-bold text-cyan-800 mb-6">
            Sign Up
          </h1>

          <label className="block text-lg font-semibold mb-1 required">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9 mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />

          <label className="block text-lg font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9 mb-4 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 required"
          />

          <label className="block text-lg font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-9 mb-6 rounded-lg border border-cyan-300 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="submit"
            className="w-[20rem] h-11 rounded-full ml-15 text-xl font-bold text-slate-900 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 hover:from-indigo-500 hover:to-indigo-500 transition transform hover:-translate-y-1 shadow-lg"
          >
            Sign Up
          </button>
          <h2 className="text-cyan-700 text-md font-semibold pt-4 text-center" > Already have an account ? <Link href={"/login"} >Login</Link></h2>
        </form>
      </div>
    </div>
  );
}
