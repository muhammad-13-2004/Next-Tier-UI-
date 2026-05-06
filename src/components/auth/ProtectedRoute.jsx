import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const isOnboardingCompleted = (user) => {

  const preferences = user?.user_metadata?.preferences ?? user?.app_metadata?.preferences;

  if (typeof preferences?.onboarding === "boolean") {
    return preferences.onboarding;
  }

  if (typeof user?.user_metadata?.onboarding_completed === "boolean") {
    return user.user_metadata.onboarding_completed;
  }

  return false;
};

const ProtectedRoute = ({
  requireVerified = false,
  blockWhenOnboardingCompleted = false,
}) => {
  const { user, loading } = useAuthStore();

  if (loading) {
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

  if (blockWhenOnboardingCompleted && isOnboardingCompleted(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
