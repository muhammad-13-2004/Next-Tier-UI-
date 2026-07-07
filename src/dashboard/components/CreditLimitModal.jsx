import { Sparkles } from "lucide-react";

export default function CreditLimitModal({ open, onBackToHome, onUpgrade }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-limit-title"
    >
      <div className="w-full max-w-md rounded-[24px] border border-[#E9E9E9] bg-white p-7 shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4FBEF] text-[#3A7A1A]">
          <Sparkles size={24} />
        </div>

        <h2
          id="credit-limit-title"
          className="text-center text-xl font-bold text-[#111]"
        >
          Daily limit reached
        </h2>

        <p className="mt-3 text-center text-sm leading-7 text-[#666]">
          You have used your free daily credits for AI-generated lessons and
          quizzes. Subscribe for unlimited access and keep learning without
          interruptions.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex-1 rounded-full border border-[#E5E5E5] px-5 py-3 text-sm font-semibold text-[#111] transition-colors hover:bg-[#F7F7F7]"
          >
            Back to Home
          </button>
          <button
            type="button"
            onClick={onUpgrade}
            className="flex-1 rounded-full bg-[#7AE84A] px-5 py-3 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
