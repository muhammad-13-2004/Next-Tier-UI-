import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";

const SetupCard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const syncOnboardingStatus = useAuthStore((s) => s.syncOnboardingStatus);
  const isCompleted = useOnboardingStore((s) => s.isCompleted);

  useEffect(() => {
    if (!user || isCompleted !== null) return;
    syncOnboardingStatus(user, accessToken);
  }, [user, accessToken, isCompleted, syncOnboardingStatus]);

  if (isCompleted !== false) return null;

  return (
    <div className="bg-(--primary-color) border border-(--subtext-color)/10 text-white rounded-3xl p-5">
      <span className="text-xs bg-(--secondary-color)/30 px-3 py-1 rounded-full font-medium">
        PROFILE INCOMPLETE
      </span>

      <h3 className="font-bold mt-4 text-lg">
        Finish setup to unlock AI recommendations
      </h3>

      <p className="text-sm text-gray-300 mt-2">
        Takes 60 seconds. Unlock a roadmap built around your exact goals.
      </p>

      <button
        onClick={() => navigate("/boarding")}
        className="w-full mt-5 bg-(--secondary-color) text-(--primary-color) py-3 rounded-full font-semibold"
      >
        Complete setup
      </button>
    </div>
  );
};

export default SetupCard;
