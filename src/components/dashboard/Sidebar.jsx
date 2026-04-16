import { PanelLeftClose, PanelLeftOpen, House, BookOpen, Users, Bot, Briefcase, Settings } from "lucide-react";
import LogoApp from '@/assets/LogoApp.png' 


const menuItems = [
    { id: "main", label: "Home", icon: House },
    { id: "roadmaps", label: "My Roadmaps", icon: BookOpen },
    { id: "community", label: "Community", icon: Users },
    { id: "aiTutor", label: "AI Tutor", icon: Bot },
    { id: "career", label: "Career", icon: Briefcase },
];
  
const Sidebar = ({ collapsed, setCollapsed, activeTab, onTabChange }) => {
    return (
      <aside
        className={`fixed left-0 top-0 h-screen border-r border-[#F1F5F9] bg-(--background-color) transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#F1F5F9]">
          {!collapsed && (
            <img src={LogoApp} width="100px" alt="This is the logo of the webpage" />
          )}
  
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="p-3 space-y-1 h-4/5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-2 p-3 rounded-xl transition ${
                  activeTab === item.id
                    ? "bg-(--primary-color)/6 text-(--primary-color)"
                    : "hover:bg-(--primary-color)/6 text-(--subtext-color)"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="font-normal">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 space-y-1">
            <div>
                <h2>You have 10 credits!</h2>
            </div>
            <button
              onClick={() => onTabChange("settings")}
              className={`w-full flex items-center gap-2 p-3 rounded-xl transition ${
                activeTab === "settings"
                  ? "bg-(--secondary-color)/20 text-(--primary-color)"
                  : "hover:bg-(--secondary-color)/10 text-(--subtext-color)"
              }`}
            >
            <Settings className="w-5 h-5" />
                {!collapsed && <span className="font-normal">
                    Settings
                </span>}
            </button>
        </div>

      </aside>
    );
  };
  
  export default Sidebar;