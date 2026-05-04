import React from "react";
import FilterBar from "@/dashboard/features/community/components/FilterBar";
import RoadmapGrid from "@/dashboard/features/community/components/RoadmapGrid";


const Community = () => {
  return (
    <>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-(--primary-color)">
        Community
      </h1>
      <p className="text-(--subtext-color) mt-1">
        Discover and learn from roadmaps shared by the community.
      </p>
    </div>
    <FilterBar />
    <RoadmapGrid/>
    </>
  );
};

export default Community;
