"use client";
import { useEffect, useState } from "react";
import { CreateClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LeaderDashboard() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [profile, setProfile] = useState(null);
  const [members, setMembers] = useState([]);
  const [mail, setMail] = useState("");

  useEffect(() => {
    const fetchLeaderData = async () => {
      const supabase = CreateClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setMail(user.email);

      // Fetch profile
      const { data: profileData, error } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user.id)
      .single();

      if (error || profileData.role !== "leader") {
        router.push("/unauthorized");
        return;
      }

setProfile(profileData);

      // Fetch assigned project (leader_id = current user)
      const { data: projectData , error:projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("leader_id", profileData.user_id)
        .maybeSingle();

        console.log("Profile:", profileData);

        if (projectError) {
          console.log(projectError);
        }

      setProject(projectData);

      // Fetch members of this project
      if (projectData) {
        const { data: memberData } = await supabase
          .from("project_members")
          .select("profile(*)")
          .eq("project_id", projectData.id)

        setMembers(memberData||[]);
      }
    };

    fetchLeaderData();
  }, []);

  return (
    <div className="min-h-screen bg-white shadow-2xl">

      {/* ===== PROFILE SECTION ===== */}
      <div className="bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#0e7490] via-[#06b6d4] to-[#0891b2] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-md border border-white/30">
            👨‍💼
          </div>

          <div>
            <h2 className="text-xl font-semibold">{profile?.name} • Leader</h2>
            <p>{profile?.company}</p>
            <p className="text-sm opacity-80">{mail}</p>
          </div>
        </div>

    

        <button
          onClick={async () => {
            const supabase = CreateClient();
            await supabase.auth.signOut();
            router.push("/login");
            }}
          className="px-6 py-2 w-[20vh] cursor-pointer font-bold text-xl text-[#042f2e] shadow-xl rounded-full transition duration-200 hover:-translate-y-1 bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] via-[#67e8f9] to-[#06b6d4]"
        >
          Logout
        </button>
      </div>

      {/* ===== PROJECT SECTION ===== */}
      <div className="px-8 py-10">
        {project? (
          <div className="bg-gradient-to-r from-[#0891b2] via-[#06b6d4] to-[#0891b2] p-8 rounded-2xl shadow-xl text-white">

            {/* Project Info */}
            <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
            <p className="text-lg font-semibold mb-1">
              Company: {project.company}
            </p>
            <p className="mb-1">
              Deadline:{" "}
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "Not Set"}
            </p>
            <p className="mb-4">
              Scope: {project.scope || "No Scope Defined"}
            </p>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-lg">Progress</span>
                <span className="font-bold">{project.progress || 0}%</span>
              </div>
              <div className="w-full bg-cyan-100 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-[#6ee7b7] via-[#a7f3d0] to-[#6ee7b7] text-[#042f2e] shadow-lg hover:-translate-y-1 transition duration-200"
              >
                Update Progress
              </button>

              <button
                className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-[#fcd34d] via-[#fde68a] to-[#fcd34d] text-[#042f2e] shadow-lg hover:-translate-y-1 transition duration-200"
              >
                Add Task
              </button>
               <button
           onClick={() =>
           router.push(`/admin/dashboard/projects/${project.id}/feedback`)
           }
           className="ml-[5rem] bg-gradient-to-r from-[#6ee7b7] via-[#a7f3d0] to-[#6ee7b7] hover:bg-gradient-to-r hover:from-[#2dd4bf] hover:via-[#6ee7b7] hover:to-[#2dd4bf] text-[#042f2e] px-4 py-2 rounded-full text-md font-semibold transition duration-300"
           >
           Give Feedback
          </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold">
              No Project Assigned
            </h3>
          </div>
        )}
      </div>

      {/* ===== MEMBERS SECTION ===== */}
      {members.length > 0 && (
        <div className="px-8 pb-10">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Team Members
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4] text-white hover:-translate-y-2 transition duration-300"
              >
                <h4 className="text-xl font-bold">
                  {member.profile?.name}
                </h4>
                <p>{member.profile?.company}</p>
                <p className="text-sm opacity-80">
                  {member.profile?.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}