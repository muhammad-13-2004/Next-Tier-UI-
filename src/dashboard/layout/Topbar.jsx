import { Bell, Search } from "lucide-react";
import fireIcon from '../../assets/fire-icon.png'
import { useDashboard } from "@/hooks/useDashboard";

const Topbar = () => {
  const { profile } = useDashboard();
  const fullName = profile?.full_name ?? "Learner";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  const streak = profile?.streak ?? 0;

  return (
    <header className="h-16 sticky top-0 bg-(--background-color) border-b border-[#F1F5F9] px-6 flex items-center justify-between">
      <div className="relative w-[400px]">
        <Search className="absolute left-3 top-3 w-4 h-4 text-(--subtext-color)" />
        <input
          type="text"
          placeholder="Search courses, mentors..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-[#F1F5F9] outline-none"
        />
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-1 border px-3 py-2 rounded-full">
          <p className="text-sm font-semibold">{streak}-days streak</p>
          <img src={fireIcon} className="w-5" />
        </div>

        <Bell className="w-5 h-5" />

        <div className="flex items-center gap-3 border-s px-3 py-1 cursor-pointer">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-(--secondary-color) flex items-center justify-center text-xs font-bold text-(--primary-color)">
              {initials || "U"}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold">{fullName}</p>
            <p className="text-xs text-(--subtext-color)">Free Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
