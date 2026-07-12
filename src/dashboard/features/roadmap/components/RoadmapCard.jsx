import React from "react";
import { BarChart3, BookOpen, Bot, Code2, Palette } from "lucide-react";


const CARD_ICONS = {
  python: Code2,
  design: Palette,
  dataViz: BarChart3,
  ml: Bot,
};

const STATUS_META = {
  "not-started": { label: "Saved", pill: "bg-[#F4F4F4] text-[#737373]" },
  "in-progress": { label: "In Progress", pill: "bg-[#F2FCE8] text-[#3a7a1a]" },
  completed: { label: "Completed", pill: "bg-[#D1FAE5] text-[#065f46]" },
};


const RoadmapCard = ({ roadmap, onClick }) => {

  const modules = Array.isArray(roadmap.modules) ? roadmap.modules : [];
  const doneCount =
    roadmap.completed_modules ??
    modules.filter((m) => m.status === "completed").length;
  const totalCount = roadmap.total_modules ?? modules.length;

  const Icon = CARD_ICONS[roadmap.iconName] || BookOpen;
  const meta = STATUS_META[roadmap.status] || STATUS_META.saved;

  const barColor =
    roadmap.status === "completed" ? "#10b981"
      : roadmap.status === "saved" ? "#D4D4D4"
        : (roadmap.accentColor || "#7AE84A");

  const actionLabel =
    roadmap.status === "in-progress" ? "Resume"
      : roadmap.status === "completed" ? "Review"
        : "Start";

  const actionCls =
    roadmap.status === "in-progress"
      ? "bg-[#7AE84A] text-black hover:bg-[#5BC932]"
      : roadmap.status === "completed"
        ? "bg-[#D1FAE5] text-[#065f46] hover:bg-[#A7F3D0]"
        : "bg-[#111] text-white hover:bg-[#404040]";

  const footerNote =
    roadmap.status === "saved" ? "Not started yet"
      : roadmap.status === "completed" ? "Certificate earned"
        : (() => {
          const m = modules.find(x => x.status === "in-progress");
          return m ? `${m.time} in current module` : `${doneCount} / ${totalCount} modules done`;
        })();

  return (
    <div
      onClick={onClick}
      className="bg-white border-[1.5px] border-[#EBEBEB] rounded-2xl overflow-hidden cursor-pointer flex flex-col
        hover:border-[#7AE84A] hover:shadow-[0_4px_20px_rgba(122,232,74,0.18)] hover:-translate-y-1
        transition-all duration-200"
    >

      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Icon + status */}
        <div className="flex items-start justify-between gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: roadmap.iconBg }}
          >
            <Icon size={20} className="text-[#111]" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${meta.pill}`}>
            {meta.label}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-sm font-bold text-[#111] leading-snug mb-0.5">{roadmap.title}</h3>
          <p className="text-xs text-[#A3A3A3] leading-relaxed line-clamp-2">{roadmap.subtitle}</p>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[#A3A3A3]">{doneCount} / {totalCount} modules</span>
            <span className="font-bold text-[#111]">{roadmap.progress}%</span>
          </div>
          <div className="h-1.5 bg-[#F4F4F4] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${roadmap.progress}%`, background: barColor }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#F4F4F4] px-5 py-3 flex items-center justify-between gap-3">
        <span className="text-xs text-[#A3A3A3] truncate">{footerNote}</span>
        <button
          onClick={e => { e.stopPropagation(); onClick(); }}
          className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${actionCls}`}
        >
          {actionLabel} →
        </button>
      </div>
    </div>
  )
}

export default RoadmapCard
