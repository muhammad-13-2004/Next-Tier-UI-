import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import supabase from "@/services/supabase";
import { useAuthStore } from "@/store/authStore";
import { getPostLoginPath } from "@/utils/authRouting";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const finish = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (cancelled) return;

      if (!session?.user) {
        navigate("/login", { replace: true });
        return;
      }

      useAuthStore.getState().setSession(session);

      const { user, completed } = await useAuthStore
        .getState()
        .syncOnboardingStatus(session.user, session.access_token);

      if (cancelled) return;

      navigate(getPostLoginPath(user, completed), {
        replace: true,
        ...(!user?.email_confirmed_at ? { state: { email: user?.email } } : {}),
      });
    };

    finish();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-500">
      <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />
    </div>
  );
};

export default AuthCallback;
