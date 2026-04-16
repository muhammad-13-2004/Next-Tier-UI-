import { PanelLeftClose, PanelLeftOpen, House, BookOpen, Users, Bot, Briefcase, Settings} from "lucide-react";
import LogoApp from '@/assets/LogoApp.png' 


const menuItems = [
    { label: "Home", icon: House },
    { label: "My Roadmaps", icon: BookOpen },
    { label: "Community", icon: Users },
    { label: "AI Tutor", icon: Bot },
    { label: "Career", icon: Briefcase },
];
  
const Sidebar = ({ collapsed, setCollapsed }) => {
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
                className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-(--primary-color)/3 transition"
              >
                <Icon className="w-5 h-5 text-(--subtext-color)" />
                {!collapsed && (
                  <span className="text-(--subtext-color) font-normal">
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
            <button className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-(--secondary-color)/10 transition">
            <Settings className="w-5 h-5 text-(--subtext-color)" />
                <span className="text-(--subtext-color) font-normal">
                    Settings
                </span>
            </button>
        </div>

      </aside>
    );
  };
  
  export default Sidebar;