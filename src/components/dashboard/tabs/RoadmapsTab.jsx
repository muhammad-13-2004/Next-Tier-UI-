import React, { useState } from "react";
import RoadmapCard from "../RoadmapCard";
import RoadmapDetail from "./RoadmapDetail";
import { ROADMAPS } from "@/utils/Roadmaps";


const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "saved", label: "Saved" },
];

const RoadmapsTab = () => {

  const [filter, setFilter] = useState("all");
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const counts = FILTER_TABS.reduce((acc, t) => {
    acc[t.key] = t.key === "all" ? ROADMAPS.length : ROADMAPS.filter(r => r.status === t.key).length;
    return acc;
  }, {});

  const visible = filter === "all" ? ROADMAPS : ROADMAPS.filter(r => r.status === filter);

  if (selectedRoadmap) {
    return <RoadmapDetail roadmap={selectedRoadmap} onBack={() => setSelectedRoadmap(null)} />;
  }


  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111] tracking-tight">My Roadmaps</h1>
          <p className="text-sm text-[#A3A3A3] mt-0.5">All your enrolled and saved learning paths</p>
        </div>
        <button className="flex items-center gap-2 bg-[#111] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#404040] transition-colors">
          + Add Roadmap
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-[#EBEBEB] mb-6">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-all
              ${filter === tab.key
                ? "border-[#111] text-[#111]"
                : "border-transparent text-[#A3A3A3] hover:text-[#737373]"}`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
              ${filter === tab.key ? "bg-[#111] text-white" : "bg-[#F4F4F4] text-[#A3A3A3]"}`}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Grid or empty */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#EBEBEB] rounded-2xl bg-white text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-bold text-[#111] mb-1">Nothing here yet</p>
          <p className="text-sm text-[#A3A3A3] max-w-xs leading-relaxed">
            You don't have any roadmaps in this category. Browse paths to get started.
          </p>
          <button className="mt-5 bg-[#111] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#404040] transition-colors">
            + Add Roadmap
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map(rm => (
            <RoadmapCard key={rm.id} roadmap={rm} onClick={() => setSelectedRoadmap(rm)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapsTab;
