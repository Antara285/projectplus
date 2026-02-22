import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-[#F8FAFC] text-gray-800">

      {/* =================/ NAVBAR ================= */}
      <nav className="flex items-center justify-between backdrop-blur-xs h-15 w-full subpixel-antialiased fixed">
      <img
      src="/workgrid.svg"
      alt="WorkGrid Logo"
      className="h-[15rem] w-[20rem] ml-[-30] mt-8 "/>
        <div className="space-x-8 font-bold pl-[20rem] mt-5 text-xl text-[#0369a1]">
          <a href="#home" className="hover:underline decoration-[#7dd3fc] decoration-2 underline-offset-3">Home</a>
          <a href="#features" className="hover:underline decoration-[#7dd3fc] decoration-2 underline-offset-3">Features</a>
          <a href="#flow" className="hover:underline decoration-[#7dd3fc] decoration-2 underline-offset-3">How It Works</a>
          <a href="#roles" className="hover:underline decoration-[#7dd3fc] decoration-2 underline-offset-3">Roles</a>
        </div>  
          <button className="px-6 py-2 mr-15 w-[20vh] ml-7 mt-2 cursor-pointer font-bold text-2xl text-[#2e1065] inset-shadow-2xl shadow-xl/20 rounded-full transition delay-5 duration-200 ease-in hover:-translate-y-1 hover:scale-100 bg-gradient-to-r from-[#4f46e5] via-[#0891b2] via-[#a5b4fc] via-[#0891b2] to-[#4f46e5] hover:bg-gradient-to-r hover:from-[#6366f1] hover:via-[#06b6d4] hover:via-[#a5b4fc] hover:via-[#06b6d4] hover:to-[#6366f1]"><Link href={"/login"}>Login</Link> </button>
      </nav>


      {/* ================= HERO ================= */}
      <section id="home" className="px-8 py-22 grid md:grid-cols-2 gap-12 items-center">
        <div className="mt-[1rem]">
          <h2 className="text-5xl text-[#164e63] font-extrabold mb-2">
            Manage Work Smarter, Not Harder.
          </h2>
          <p className="text-xl text-[#155e75] font-bold mb-8 mt-5">
            Plan projects with clarity, balance team workload, track real progress, and improve execution quality — all in one intelligent system.
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 ml-[23rem] mt-[-5vh] text-[#1e1b4b] rounded-full cursor-pointer font-extrabold text-2xl  inset-shadow-2xl shadow-xl/20 rounded-full transition delay-5 duration-200 ease-in hover:-translate-y-1 hover:scale-100 bg-gradient-to-r from-[#0e7490] via-[#06b6d4] via-[#67e8f9] via-[#06b6d4] to-[#0e7490] hover:bg-gradient-to-r hover:from-[#6366f1] hover:via-[#06b6d4] hover:via-[#a5b4fc] hover:via-[#06b6d4] hover:to-[#6366f1]">
               <Link href={"/sign-up"}>Get Started</Link>
            </button>
          </div>

          <ul className="mt-[-2] space-y-2 text-md font-semibold text-[#075985]">
            <li>✔ Workload Balance Meter</li>
            <li>✔ Decision Log & Feedback Loop</li>
            <li>✔ Skill-Aware Task Assignment</li>
          </ul>
        </div>

         <img src="/landingpage.png" className="h-[30rem] w-[200rem] mt-[3rem]"></img>
        
      </section>


{/* ================= HOW IT WORKS ================= */}
      <section id="flow" className="px-8 px-1 mt-[-5vh] bg-gray-50">
        <h3 className="text-3xl font-bold text-[#155e75] text-center mb-10">
           Structured Lifecycle Flow
        </h3>

        <div className="grid md:grid-cols-5 gap-5 pt-16">
          <div className="rounded-4xl h-[40vh] p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 flex-col place-items-center bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] via-[#22d3ee] to-[#06b6d4] shadow-xl/20 drop-shadow-[#cffafe]">
            <h1 className="shadow-xl/30 bg-white text-shadow-lg font-extrabold text-xl text-[#042f2e] w-10 h-10 rounded-full mt-3 pl-[15px] pt-[6px]">1</h1>
            <h1 className="mt-4 text-2xl font-extrabold text-[#042f2e]">Create Project</h1>
            <p className="mt-5 bg-[#ecfeff]/50 shadow-xl/30 rounded-2xl p-3 text-center text-md text-[#083344] font-bold mx-2">Start and structure your project</p>
          </div>
        <div className="rounded-4xl h-[40vh] p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 flex-col place-items-center bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#22d3ee] via-[#06b6d4] to-[#0891b2] shadow-xl/20 drop-shadow-[#cffafe]">
            <h1 className="shadow-xl/30 bg-white text-shadow-lg font-extrabold text-xl text-[#042f2e] w-10 h-10 rounded-full mt-3 pl-[15px] pt-[6px]">2</h1>
            <h1 className="mt-4 text-2xl font-extrabold text-[#042f2e]">Define Scope</h1>
            <p className="mt-5 bg-[#ecfeff]/50 shadow-xl/30 rounded-2xl p-3 text-center text-md text-[#083344] font-bold mx-2">Set boundaries, goals, and limits</p>
          </div>
          <div className="rounded-4xl h-[40vh] p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 flex-col place-items-center bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] via-[#22d3ee] to-[#06b6d4] shadow-xl/20 drop-shadow-[#cffafe]">
            <h1 className="shadow-xl/30 bg-white text-shadow-lg font-extrabold text-xl text-[#042f2e] w-10 h-10 rounded-full mt-3 pl-[15px] pt-[6px]">3</h1>
            <h1 className="mt-4 text-2xl font-extrabold text-[#042f2e]">Add Requirement</h1>
            <p className="mt-5 bg-[#ecfeff]/50 shadow-xl/30 rounded-2xl p-3 text-center text-md text-[#083344] font-bold mx-2">Start and structure your project</p>
          </div>
           <div className="rounded-4xl h-[40vh] p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 flex-col place-items-center bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#22d3ee] via-[#06b6d4] to-[#0891b2] shadow-xl/20 drop-shadow-[#cffafe]">
            <h1 className="shadow-xl/30 bg-white text-shadow-lg font-extrabold text-xl text-[#042f2e] w-10 h-10 rounded-full mt-3 pl-[15px] pt-[6px]">4</h1>
            <h1 className="mt-4 text-2xl font-extrabold text-[#042f2e]">Assign Task</h1>
            <p className="mt-5 bg-[#ecfeff]/50 shadow-xl/30 rounded-2xl p-2 text-center text-md text-[#083344] font-bold mx-2">Distribute work amoung the members</p>
          </div>
          <div className="rounded-4xl h-[40vh] p-4 transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 flex-col place-items-center bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] via-[#22d3ee] to-[#06b6d4] shadow-xl/20 drop-shadow-[#cffafe]">
            <h1 className="shadow-xl/30 bg-white text-shadow-lg font-extrabold text-xl text-[#042f2e] w-10 h-10 rounded-full mt-3 pl-[15px] pt-[6px]">5</h1>
            <h1 className="mt-4 text-2xl font-extrabold text-[#042f2e]">Track Progress</h1>
            <p className="mt-5 bg-[#ecfeff]/50 shadow-xl/30 rounded-2xl p-3 text-center text-md text-[#083344] font-bold mx-2">Monitor work status in real-time</p>
          </div>
          </div>
      </section>

     


      {/* ================= CORE FEATURES ================= */}
      <section id="features" className="px-8 py-20 mt-[10vh] bg-gray-50 ">
        <h3 className="text-3xl font-bold text-[#155e75] text-center mb-10">
           Core Features
        </h3>

        <div className="grid md:grid-rows ">
          <div className="transition delay-100 duration-300 ease-in-out hover:-translate-x-2 hover:scale-108 shadow-xl/30 bg-linear-to-r from-[#a5f3fc] to-white mb-8 mt-10 h-[15vh] w-[35rem] ml-8 py-4 pl-4 rounded-xl">
            <h1 className="text-[#134e4a] text-xl font-bold pl-2">Workload Balance Meter</h1>
            <p className="text-md font-bold text-[#155e75] pl-6 pt-1">→ Visualize team workload distribution</p>
          </div>
          <div className="transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 shadow-xl/30 bg-linear-to-l from-[#a5f3fc] to-white h-[15vh] w-[35rem] ml-[38rem] py-4 pl-4 rounded-xl">
            <h1 className="text-[#134e4a] text-xl font-bold pl-2">Decision Log</h1>
            <p className="text-md font-bold text-[#155e75] pl-6 pt-1">→ Record key project decisions centrally</p>
          </div>
          <div className="transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 shadow-xl/30 bg-linear-to-r from-[#a5f3fc] to-white h-[15vh] w-[35rem] m-10 py-4 pl-4 ml-8 rounded-xl">
            <h1 className="text-[#134e4a] text-xl font-bold pl-2">Skill Tracking</h1>
            <p className="text-md font-bold text-[#155e75] pl-6 pt-1">→ Track team members skills and strengths</p>
          </div>
          <div className="transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-108 shadow-xl/30 bg-linear-to-l from-[#a5f3fc] to-white h-[15vh] w-[35rem] ml-[38rem] mr-10 py-4 pl-4 rounded-xl">
            <h1 className="text-[#134e4a] text-xl font-bold pl-2">Feedback</h1>
            <p className="text-md font-bold text-[#155e75] pl-6 pt-1">→ Collect insights to improve delivery</p>
          </div>
        </div>
      </section>


      

      {/* ================= ROLES ================= */}
      <section id="roles" className="px-8 py-16 mb-[8rem]">
        <h3 className="text-3xl font-bold text-[#155e75] text-center mb-[6rem] mt-[-15]">
          Role Based Workflow
        </h3>
        <div className="grid md:grid-cols-3">
         <div className="rounded-xl ml-9 shadow-lg/20 h-[18rem] w-[21rem] text-[#ecfeff] transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-100 bg-gradient-to-r from-[#0e7490] via-[#0891b2] via-[#155e75] via-[#0891b2] to-[#0e7490]">
          <h1 className="pl-9 text-3xl font-bold mb-5 mt-6">Admin</h1>
          <ul className=" list-inside space-y-2 pl-9 font-semibold text-lg">
            <li>✔  Defines Scope</li>
            <li>✔  Add Requirements</li>
            <li>✔  Track Progress</li>
            <li>✔  Provides Feedback</li>
          </ul>
         </div>
          <div className="rounded-xl ml-[2rem] shadow-lg/20 h-[18rem] w-[21rem] text-[#ecfeff] transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-100 bg-gradient-to-r from-[#0e7490] via-[#0891b2] via-[#155e75] via-[#0891b2] to-[#0e7490]">
          <h1 className="pl-9 text-3xl font-bold mb-5 mt-6">Team Leader</h1>
          <ul className=" list-inside space-y-2 pl-9 font-semibold text-lg">
            <li>✔  Assign Taks</li>
            <li>✔  Manage Workload</li>
            <li>✔  Logs Decision</li>
            <li>✔  Track Progress</li>
            <li>✔  Provides Feedback</li>
          </ul>
         </div>
          <div className="rounded-xl ml-7 shadow-lg/20 h-[18rem] w-[21rem] text-[#ecfeff] transition delay-100 duration-300 ease-in-out hover:-translate-y-3 hover:scale-100 bg-gradient-to-r from-[#0e7490] via-[#0891b2] via-[#155e75] via-[#0891b2] to-[#0e7490]">
          <h1 className="pl-9 text-3xl font-bold mb-5 mt-6">Members</h1>
          <ul className=" list-inside space-y-2 pl-9 font-semibold text-lg">
            <li>✔  Performs Tasks</li>
            <li>✔  Updates Work-Status</li>
            <li>✔  Logs Decision</li>
            <li>✔  Track Progress</li>
            <li>✔  Provides Feedback</li>
          </ul>
         </div>
        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="py-5 h-[10vh] shadow-lg bg-gradient-to-r from-[#06b6d4] via-[#0891b2] via-[#0e7490] via-[#0891b2] to-[#06b6d4] text-xl font-bold text-white text-center">
       WorkGrid • A Smart Project Lifecycle Manager 
      </footer>

    </div>
  );
}

