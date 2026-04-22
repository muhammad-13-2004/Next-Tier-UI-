import React from "react";
import QuickPanel from "@/components/dashboard/QuickPanel";
import LearningPathsSection from "@/components/dashboard/LearningPathsSection";
import DashOverview from "@/components/dashboard/DashOverview";

const MainTab = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <DashOverview />
      </div>

      <div className="col-span-9">
        <LearningPathsSection />
      </div>

      <div className="col-span-3">
        <QuickPanel />
      </div>
    </div>
  );
};

export default MainTab;
