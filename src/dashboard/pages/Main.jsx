import React from "react";
import QuickPanel from "@/dashboard/features/home/components/QuickPanel";
import LearningPathsSection from "@/dashboard/features/home/components/LearningPathsSection";
import DashOverview from "@/dashboard/features/home/components/DashOverview";

const Main = () => {
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

export default Main;
