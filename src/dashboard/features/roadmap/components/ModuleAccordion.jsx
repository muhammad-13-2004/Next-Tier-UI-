import React, { useState } from "react";
import LessonRow from './LessonRow';
import {
    CheckCircle2,
    ChevronDown,
    Clock3,
    Lock,
    PlayCircle,
    Sparkles,
    Trophy,
} from "lucide-react";



const ModuleAccordion = ({ module, roadmapSlug, defaultOpen = false }) => {

    const [open, setOpen] = useState(defaultOpen);

    const done = module.status === "completed";
    const active = module.status === "in-progress";
    const notStarted = module.status === "not-started";
    const locked = module.status === "locked";

    return (
        <div className={`rounded-2xl border overflow-hidden transition-all duration-200
        ${active ? "border-[#7AE84A] shadow-[0_0_0_2px_rgba(122,232,74,0.2)] bg-white"
                : done ? "border-[#EBEBEB] bg-white"
                    : "border-[#EBEBEB] bg-white"}`}>

            {/* Header row */}
            <button
                onClick={() => !locked && setOpen(o => !o)}
                className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-colors
            ${locked ? "cursor-default" : "hover:bg-[#FAFAFA] cursor-pointer"}`}
            >
                {/* Status icon */}
                {done ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                ) : active ? (
                    <PlayCircle size={18} className="text-[#5BC932]" />
                ) : notStarted ? (
                    <PlayCircle size={18} className="text-[#A3A3A3]" />
                ) : (
                    <Lock size={18} className="text-[#A3A3A3]" />
                )}

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-700 leading-tight ${locked ? "text-[#A3A3A3]" : "text-[#111]"}`}>
                        {module.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${locked ? "text-[#C4C4C4]" : "text-[#A3A3A3]"}`}>
                        {module.subtitle}
                    </p>
                </div>

                {/* Right meta */}
                <div className="hidden sm:flex items-center gap-5 shrink-0">
                    <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] mb-0.5 flex items-center justify-end gap-1"><Trophy size={12} /> Rewards</p>
                        <p className={`text-sm font-bold ${locked ? "text-[#C4C4C4]" : "text-[#111]"}`}>+{module.xp} XP</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] mb-0.5 flex items-center justify-end gap-1"><Clock3 size={12} /> Time</p>
                        <p className={`text-sm font-bold ${locked ? "text-[#C4C4C4]" : "text-[#111]"}`}>{module.time}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full
                ${done ? "bg-[#D1FAE5] text-[#065f46]"
                            : active ? "bg-[#7AE84A] text-black"
                                : "bg-[#EBEBEB] text-[#A3A3A3]"}`}>
                        {done ? "Completed" : active ? "In Progress" : notStarted ? "Not Started" : "Locked"}
                    </span>
                </div>

                {!locked && (
                    <div className="ml-1 shrink-0">
                        <ChevronDown
                            size={18}
                            className={`text-[#737373] transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                        />
                    </div>
                )}
            </button>

            {/* Expanded body */}
            {open && !locked && module.lessons.length > 0 && (
                <div className="border-t border-[#F4F4F4]">
                    <div className="flex gap-0">
                        {/* Lesson list */}
                        <div className="flex-1 px-6 py-2 divide-y divide-[#F4F4F4]">
                            {module.lessons.map((lesson, i) => (
                                <LessonRow key={lesson.id} lesson={lesson} num={i + 1} roadmapSlug={roadmapSlug} />
                            ))}
                        </div>

                        {/* Next concept panel — in-progress only */}
                        {active && module.nextConcept && (
                            <div className="w-60 shrink-0 m-3 bg-[#111] rounded-2xl p-5 flex flex-col gap-3">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7AE84A] flex items-center gap-1.5">
                                    <Sparkles size={12} /> Next Concept
                                </p>
                                <p className="text-base font-extrabold text-white leading-snug">
                                    {module.nextConcept.title}
                                </p>
                                <p className="text-xs text-[#737373] leading-relaxed">
                                    {module.nextConcept.desc}
                                </p>
                                <button className="mt-auto bg-[#7AE84A] hover:bg-[#5BC932] text-black text-xs font-extrabold uppercase tracking-widest py-3 rounded-xl transition-colors">
                                    Start Next Lesson
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModuleAccordion
