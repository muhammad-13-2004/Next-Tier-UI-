import React from "react";
import QuickPanel from "@/dashboard/features/home/components/QuickPanel";
import LearningPathsSection from "@/dashboard/features/home/components/LearningPathsSection";
import DashOverview from "@/dashboard/features/home/components/DashOverview";
import { useDashboard } from "@/hooks/useDashboard";

const Main = () => {
  const { error } = useDashboard();

  return (
    <div className="grid grid-cols-12 gap-6">
      {error && (
        <div className="col-span-12 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

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
