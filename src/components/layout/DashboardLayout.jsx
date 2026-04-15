import { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-(--background-color) flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${ collapsed ? "ml-20" : "ml-64"}`}>
        <Topbar />
        <main className="min-h-screen p-6 bg-[#FAFAFA]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;