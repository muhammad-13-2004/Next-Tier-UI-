import React from "react";
import { ArrowLeft, TrendingUp } from "lucide-react";
import ModuleAccordion from "@/dashboard/features/roadmap/components/ModuleAccordion";
import LoadingImage from "@/assets/nexttier-icon.png";

const RoadmapDetail = ({ roadmap, onBack }) => {
    
    if (!roadmap) return null;

    const modules = Array.isArray(roadmap.modules) ? roadmap.modules : [];
    const doneCount =
      roadmap.completed_modules ?? modules.filter(m => m.status === "completed").length;
    const totalCount = roadmap.total_modules ?? modules.length;

    if (modules.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <img
                    src={LoadingImage}
                    alt="Loading roadmap"
                    className="w-16 h-16 object-contain"
                    style={{ animation: 'pulse-scale 1.5s ease-in-out infinite' }}
                />
                <style>{`
                    @keyframes pulse-scale {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.08); }
                    }
                `}</style>
            </div>
        );
    }

    console.log("Module data :", modules);

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#A3A3A3] uppercase tracking-widest">
                    <button onClick={onBack} className="flex items-center gap-1.5 hover:text-[#111] transition-colors">
                        <ArrowLeft size={14} /> Roadmaps
                    </button>
                    <span className="text-[#D4D4D4]">›</span>
                    <span className="text-[#5BC932] font-bold">Current Path</span>
                </div>
            </div>

            {/* Hero */}
            <div className="py-6 flex items-start justify-between gap-6 flex-wrap">
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#111] tracking-tight leading-tight mb-2">
                        {roadmap.title}
                    </h1>
                    <p className="text-sm text-[#737373] max-w-xl leading-relaxed">{roadmap.subtitle}</p>
                </div>

                {/* Progress */}
                <div className="shrink-0 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3] mb-1">Overall Progress</p>
                    <p className="text-4xl font-extrabold text-[#111] leading-none">
                        {roadmap.progress}<span className="text-2xl">%</span>
                        <TrendingUp size={18} className="inline ml-1 text-[#7AE84A]" />
                    </p>
                    <div className="w-40 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden mt-2 ml-auto">
                        <div
                            className="h-full rounded-full"
                            style={{ width: `${roadmap.progress}%`, background: roadmap.accentColor }}
                        />
                    </div>
                    <p className="text-xs text-[#A3A3A3] mt-1.5">{doneCount} of {totalCount} modules done</p>
                </div>
            </div>

            {/* Modules */}
            <div className="py-6 flex flex-col gap-3">
                {modules.map(mod => (
                    <ModuleAccordion
                        key={mod.id}
                        module={mod}
                        roadmapSlug={roadmap.id}
                        defaultOpen={mod.status === "in-progress"}
                    />
                ))}
            </div>
        </div>
    )
}

export default RoadmapDetail
