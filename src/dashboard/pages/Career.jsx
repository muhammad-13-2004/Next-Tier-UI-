import { BriefcaseBusiness, Sparkles } from "lucide-react";

const Career = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[70vh] px-6">
      <div className="max-w-lg text-center">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--background-color) text-sm text-(--subtext-color) mb-5">
          <Sparkles className="w-4 h-4" />
          Coming Soon
        </div>

        <h2 className="text-3xl font-bold text-(--text-color) mb-4">
          Your AI Career Companion
        </h2>

        <div className="bg-(--secondary-color)/10 border border-(--secondary-color) rounded-2xl p-5 text-left space-y-3">
          <h3 className="font-semibold text-(--text-color)">
            What's coming
          </h3>

          <ul className="space-y-2 text-sm text-(--subtext-color)">
            <li>✓ AI-powered career recommendations</li>
            <li>✓ Personalized skill-gap analysis</li>
            <li>✓ Curated internships & job opportunities</li>
            <li>✓ Resume and portfolio suggestions</li>
            <li>✓ Interview preparation roadmap</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Career;