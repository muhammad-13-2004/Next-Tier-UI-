import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Lock, Info, Check } from "lucide-react";
import LoadingImage from "@/assets/nexttier-icon.png";
import CourseCard from "@/components/boarding/CourseCard";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useCourseStore } from "@/store/courseStore";
import { api } from "@/services/api";

const AddRoadmap = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("pref"); // "pref" | "manual"
  const [prompt, setPrompt] = useState("");
  const [level, setLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loadingRecommendations | recommendations | generatingManual | generatingSelected
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");

  const user = useAuthStore((s) => s.user);
  const onboarding = useOnboardingStore();
  const generateRoadmap = useCourseStore((s) => s.generateRoadmap);

  const toArray = (value) => {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value === "string" && value.trim()) return [value.trim()];
    return [];
  };

  const metadataPreferences = user?.user_metadata?.preferences ?? {};

  const resolvePreferencePayload = () => ({
    // Match the edge function contract exactly:
    // { interests, learning_style, time_commitment, goal }
    interests: toArray(
      onboarding.interests?.length > 0
        ? onboarding.interests
        : metadataPreferences?.interests ?? user?.user_metadata?.interests
    ),
    learning_style: toArray(
      onboarding.learningStyles?.length > 0
        ? onboarding.learningStyles
        : metadataPreferences?.learning_style ??
          metadataPreferences?.learning_styles ??
          user?.user_metadata?.learning_styles
    ),
    time_commitment:
      onboarding.timeCommitment ??
      metadataPreferences?.time_commitment ??
      user?.user_metadata?.time_commitment ??
      "30 minutes",
    goal:
      onboarding.goal ??
      metadataPreferences?.goal ??
      user?.user_metadata?.goal ??
      "Get a job",
  });

  const handleGenerate = async () => {
    setError("");

    if (mode === "manual") {
      if (!prompt.trim()) return;
      setStatus("generatingManual");
      try {
        const course = await generateRoadmap({
          input: prompt.trim(),
          level: level || "Beginner",
          time: timeCommitment || "30 minutes",
          goal: goal || "Learn for fun",
        });
        const resolvedSlug = course?.slug ?? course?.id;
        navigate(resolvedSlug ? `/dashboard/roadmaps/${resolvedSlug}` : "/dashboard/roadmaps");
      } catch (err) {
        setError(err?.message ?? "Could not generate roadmap from manual input.");
        setStatus("idle");
      }
      return;
    }

    // Preferences flow
    if (!user?.id) {
      setError("Please login again to generate roadmap from preferences.");
      return;
    }

    setStatus("loadingRecommendations");
    try {
      const payload = resolvePreferencePayload();
      if (!payload.interests.length) payload.interests = ["technology"];
      if (!payload.goal) payload.goal = "Get a job";

      const data = await api.recommendCourses(payload);
      const recs = Array.isArray(data?.recommendations)
        ? data.recommendations
        : [];
      setRecommendations(recs);
      setStatus("recommendations");
    } catch (err) {
      setError(err?.message ?? "Could not fetch recommendations.");
      setStatus("idle");
    }
  };

  const handleStartRecommended = async (courseSlug) => {
    setSelectedSlug(courseSlug);
    setStatus("generatingSelected");
    setError("");

    try {
      const selectedCourse = recommendations.find((c) => c.slug === courseSlug);
      const pref = resolvePreferencePayload();
      const course = await generateRoadmap({
        mode: "recommendation",
        input: {
          title: selectedCourse?.title ?? courseSlug,
          complexity: selectedCourse?.complexity ?? selectedCourse?.level ?? level ?? "beginner",
          goal: pref.goal ?? goal ?? "Learn for fun",
          time_commitment: pref.time_commitment ?? timeCommitment ?? "30 minutes",
        },
      });
      const resolvedSlug = course?.slug ?? course?.id;
      navigate(resolvedSlug ? `/dashboard/roadmaps/${resolvedSlug}` : "/dashboard/roadmaps");
    } catch (err) {
      setError(err?.message ?? "Could not generate roadmap for selected path.");
      setStatus("recommendations");
    } finally {
      setSelectedSlug("");
    }
  };

  return (
    <div className="min-h-screen pb-16 max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#111] mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Roadmaps
      </button>

      {/* Page Title */}
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-2xl font-extrabold text-[#111]">Add New Roadmap</h1>
        <span className="text-[#22c55e] text-xl">✦</span>
      </div>
      <p className="text-sm text-[#888] mb-6">
        Let AI create a personalized learning path tailored just for you.
      </p>
      {error ? (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {status === "loadingRecommendations" || status === "generatingManual" || status === "generatingSelected" ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <img
            src={LoadingImage}
            alt="Loading"
            className="w-24 h-24 object-contain"
            style={{ animation: "pulse-scale 1.5s ease-in-out infinite" }}
          />
          <p className="text-sm text-[#888]">
            {status === "loadingRecommendations"
              ? "Finding the best paths for you..."
              : "Generating your roadmap..."}
          </p>
          <style>{`
            @keyframes pulse-scale {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
          `}</style>
        </div>
      ) : null}

      {status === "recommendations" ? (
        <div className="mt-2">
          <h2 className="text-xl font-bold text-[#111] mb-1">Recommended Paths</h2>
          <p className="text-sm text-[#888] mb-5">
            Pick one path and we will generate a complete roadmap for it.
          </p>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((course) => (
                <CourseCard
                  key={course.slug ?? course.title}
                  course={course}
                  loading={selectedSlug === (course.slug ?? "")}
                  onStart={handleStartRecommended}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#666]">No recommendations found from your preferences.</p>
          )}
        </div>
      ) : null}

      {status === "idle" ? (
        <>

      {/* Option Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Use My Preferences */}
        <button
          onClick={() => setMode("pref")}
          className={`relative flex items-center gap-3 text-left p-5 rounded-2xl border-2 transition-all ${
            mode === "pref"
              ? "border-[#22c55e] bg-[#f0fdf4]"
              : "border-[#e5e5e5] bg-white hover:border-[#bbb]"
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0 text-lg">
            ✦
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-[#111]">Use My Preferences</span>
              <span className="text-[10px] font-bold bg-[#22c55e] text-white px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>
            <p className="text-xs text-[#888] mt-1 leading-relaxed">
              Generate roadmap using your onboarding choices and interests.
            </p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              mode === "pref" ? "border-[#22c55e] bg-[#22c55e]" : "border-[#ddd] bg-white"
            }`}
          >
            {mode === "pref" && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </div>
        </button>

        {/* Customize Manually */}
        <button
          onClick={() => setMode("manual")}
          className={`relative flex items-center gap-3 text-left p-5 rounded-2xl border-2 transition-all ${
            mode === "manual"
              ? "border-[#22c55e] bg-[#f0fdf4]"
              : "border-[#e5e5e5] bg-white hover:border-[#bbb]"
          }`}
        >
          <div className="w-11 h-11 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0 text-xl">
            ✏️
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-bold text-[#111]">Customize Manually</span>
            <p className="text-xs text-[#888] mt-1 leading-relaxed">
              Provide your own details to create a roadmap from scratch.
            </p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
              mode === "manual" ? "border-[#22c55e] bg-[#22c55e]" : "border-[#ddd] bg-white"
            }`}
          >
            {mode === "manual" && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </div>
        </button>
      </div>

      {/* ── USE MY PREFERENCES PANEL ── */}
      {mode === "pref" && (
        <div className="mt-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl p-6">
          <div className="flex gap-5">
            <div className="w-16 h-16 bg-[#dcfce7] rounded-2xl flex items-center justify-center text-3xl shrink-0">
              📋
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-[#111]">We'll use your saved preferences</h3>
              <p className="text-xs text-[#666] mt-1 mb-4">
                Your roadmap will be generated based on:
              </p>
              {[
                "Your selected interests",
                "Your current level",
                "Preferred time commitment",
                "Your learning goals",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#333] mb-2">
                  <Check className="w-4 h-4 text-[#22c55e] stroke-[2.5] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="bg-white border border-[#bbf7d0] rounded-xl p-4 w-52 shrink-0">
              <p className="text-xs font-bold text-[#22c55e] mb-2 flex items-center gap-1">
                <span>✦</span> Why this is better?
              </p>
              <p className="text-xs text-[#555] leading-relaxed">
                AI will create a highly personalized roadmap that matches your goals and learning style.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6">
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-bold px-9 py-3.5 rounded-full transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate Roadmap
            </button>
            <p className="text-xs text-[#aaa] flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Takes less than 30 seconds
            </p>
          </div>
        </div>
      )}

      {/* ── CUSTOMIZE MANUALLY PANEL ── */}
      {mode === "manual" && (
        <div className="mt-4 bg-white border border-[#e5e5e5] rounded-2xl p-6">
          <h2 className="text-lg font-extrabold text-[#111]">Customize Manually</h2>
          <p className="text-sm text-[#888] mt-1 mb-5">
            Tell us more about what you want so we can build the right roadmap for you.
          </p>

          {/* Textarea */}
          <div className="border border-[#e5e5e5] focus-within:border-[#22c55e] rounded-xl bg-white overflow-hidden transition-colors">
            <div className="px-4 pt-3 pb-1">
              <label className="text-xs font-semibold text-[#555]">What do you want to learn?</label>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
              placeholder="e.g. I want to learn full stack web development with modern tools..."
              className="w-full px-4 pt-1 pb-2 text-sm text-[#111] placeholder:text-[#bbb] outline-none resize-none min-h-[90px] bg-transparent font-[inherit]"
            />
            <div className="text-right text-xs text-[#bbb] px-4 pb-3">
              {prompt.length} / 500
            </div>
          </div>

          {/* Selects */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              {
                label: "Level",
                value: level,
                setter: setLevel,
                options: ["Beginner", "Intermediate", "Advanced"],
                placeholder: "Select your level",
              },
              {
                label: "Time Commitment",
                value: timeCommitment,
                setter: setTimeCommitment,
                options: ["15 minutes", "30 minutes", "1 hour", "2+ hours"],
                placeholder: "Select time per day",
              },
              {
                label: "Goal",
                value: goal,
                setter: setGoal,
                options: ["Get a job", "Build a project", "Learn for fun", "Switch careers"],
                placeholder: "Select your goal",
              },
            ].map(({ label, value, setter, options, placeholder }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-[#555] flex items-center gap-1 mb-1.5">
                  {label}
                  <Info className="w-3 h-3 text-[#bbb]" />
                </label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full appearance-none border border-[#e5e5e5] focus:border-[#22c55e] rounded-lg px-3 py-2.5 text-sm text-[#111] bg-white outline-none cursor-pointer transition-colors font-[inherit]"
                  >
                    <option value="">{placeholder}</option>
                    {options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <div className="flex flex-col items-center gap-2 mt-8">
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-[#d1fae5] disabled:cursor-not-allowed text-white text-sm font-bold px-9 py-3.5 rounded-full transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate Roadmap
            </button>
            <p className="text-xs text-[#aaa] flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Takes less than 30 seconds
            </p>
          </div>
        </div>
      )}
      </>
      ) : null}
    </div>
  );
};

export default AddRoadmap;
