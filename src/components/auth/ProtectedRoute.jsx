import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import { isOnboardingCompleted } from "@/utils/authRouting";

const ProtectedRoute = ({
  requireVerified = false,
  blockWhenOnboardingCompleted = false,
}) => {
  const { user, loading, accessToken, syncOnboardingStatus } = useAuthStore();
  const isCompleted = useOnboardingStore((s) => s.isCompleted);
  const onboardingCompleted =
    isOnboardingCompleted(user) || isCompleted === true;

  useEffect(() => {
    if (!blockWhenOnboardingCompleted || !user || isCompleted !== null) return;
    syncOnboardingStatus(user, accessToken);
  }, [
    blockWhenOnboardingCompleted,
    user,
    accessToken,
    isCompleted,
    syncOnboardingStatus,
  ]);

  if (loading || (blockWhenOnboardingCompleted && user && isCompleted === null)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireVerified && !user.email_confirmed_at) {
    return <Navigate to="/verify-email" replace />;
  }

  if (blockWhenOnboardingCompleted && onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
