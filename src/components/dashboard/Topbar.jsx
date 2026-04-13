import { Bell, Search } from "lucide-react";

const Topbar = () => {
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
        <Bell className="w-5 h-5" />

        <div className="flex items-center gap-3 border px-3 py-1 rounded-full">
          <div className="w-8 h-8 rounded-full bg-(--secondary-color)"></div>
          <div>
            <p className="text-sm font-semibold">Muhammad</p>
            <p className="text-xs text-(--subtext-color)">Free Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;