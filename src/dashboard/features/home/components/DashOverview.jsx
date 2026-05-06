import React from "react";
import { Button } from "../../../../components/ui/button";
import { Dumbbell, Play, BookOpen, CalendarClock, CircleCheck, Flame } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

const DashOverview = () => {
  const { profile, stats: dashboardStats, loading } = useDashboard();
  const firstName = profile?.full_name?.split(" ")?.[0] ?? "Learner";

  const stats = [
    { icon: <BookOpen />, value: dashboardStats?.total_courses ?? 0, label: "Courses Enrolled" },
    { icon: <CalendarClock />, value: dashboardStats?.active_courses ?? 0, label: "In Progress" },
    { icon: <CircleCheck />, value: dashboardStats?.completed_courses ?? 0, label: "Completed" },
    { icon: <Flame />, value: profile?.xp ?? 0, label: "XP Earned" },
  ];

  return (

    <div className="rounded-3xl bg-gradient-to-b from-(--background-color) to-(--secondary-color)/10 shadow-sm px-8 py-12">

      <div className="flex flex-col md:flex-row items-start justify-between md:items-center gap-6 md:gap-12 mb-10">

        <div>
        {/* Heading */}
        <h1 className="text-5xl font-bold text-(--primary-color)">
          Welcome back, <span className="text-(--secondary-color)">{firstName}</span>
        </h1>

        {/* Description */}
        <p className="text-(--subtext-color) mt-4">
          What do you want to learn today? Browse paths below or let AI suggest the perfect one for you in 60 seconds.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-8 pb-10">
          <Button size="lg">
            Let AI Pick for me
            <Dumbbell className="w-5 h-5 ml-2 text-(--secondary-color)" />
          </Button>

          <Button variant="outline" size="lg">
            Watch Demo
            <Play className="w-5 h-5 ml-2 text-(--primary-color)" />
          </Button>
        </div>
        </div>

        <img src="\src\assets\dashowl-.png" alt="Overview Illustration" className="w-50 h-50 object-contain" />
      </div>

      {/* Stats Bar */}
      <div className="bg-(--background-color) rounded-2xl flex justify-between items-center p-6">

        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">

            {/* Icon */}
            <div className="text-(--primary-color)">
              {item.icon}
            </div>

            {/* Value */}
            <p className="text-2xl font-bold pt-3">
              {loading ? "..." : item.value}
            </p>

            {/* Label */}
            <p className="text-(--subtext-color) text-sm">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DashOverview;
