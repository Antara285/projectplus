"use client";

import { useEffect, useState } from "react";
import { CreateClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function MemberDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [mail, setMail] = useState("");

  useEffect(() => {
    const fetchMemberData = async () => {
      const supabase = CreateClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
  router.push("/login");

  return;
}

      setMail(user.email);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile(profileData);

      // Get project through project_members table
      const { data: memberData } = await supabase
        .from("project_members")
        .select("project_id, projects(*)")
        .eq("user_id", user.id)
        .single();

      if (memberData) {
        setProject(memberData.projects);

        // Fetch tasks assigned to this member
        const { data: taskData } = await supabase
          .from("tasks")
          .select("*")
          .eq("assigned_to", user.id);

        setTasks(taskData);
      }
    };

    fetchMemberData();
  }, []);

  return (
    <div className="min-h-screen bg-white shadow-2xl">

      {/* ===== PROFILE SECTION ===== */}
      <div className="bg-gradient-to-r from-[#0891b2] via-[#06b6d4] via-[#0e7490] via-[#06b6d4] to-[#0891b2] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-md border border-white/30">
            👨‍💻
          </div>

          <div>
            <h2 className="text-xl font-semibold">{profile?.name} • Member</h2>
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
        {project ? (
          <div className="bg-gradient-to-r from-[#0891b2] via-[#06b6d4] to-[#0891b2] p-8 rounded-2xl shadow-xl text-white mb-10">

            <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
            <p className="text-lg font-semibold mb-1">
              Company: {project.company}
            </p>
            <p className="mb-4">
              Deadline:{" "}
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "Not Set"}
            </p>

            {/* Progress (Read Only) */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-lg">Overall Progress</span>
                <span className="font-bold">{project.progress || 0}%</span>
              </div>
              <div className="w-full bg-cyan-100 rounded-full h-3">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
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

        {/* ===== MY TASKS SECTION ===== */}
        {tasks.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              My Tasks
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#06b6d4] text-white hover:-translate-y-2 transition duration-300"
                >
                  <h4 className="text-xl font-bold mb-2">
                    {task.title}
                  </h4>

                  <p className="mb-2">
                    Status:{" "}
                    <span className="font-semibold">
                      {task.status}
                    </span>
                  </p>

                  <p className="mb-4 text-sm opacity-90">
                    Deadline:{" "}
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString()
                      : "Not Set"}
                  </p>

                  {task.status !== "Completed" && (
                    <button
                      className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-[#6ee7b7] via-[#a7f3d0] to-[#6ee7b7] text-[#042f2e] shadow-lg hover:-translate-y-1 transition duration-200"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}