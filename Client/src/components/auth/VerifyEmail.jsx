import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import supabase from "@/services/supabase";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateEmail = location.state?.email;

  const [email, setEmail] = useState(stateEmail ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (user?.email_confirmed_at) {
        navigate("/dashboard", { replace: true });
        return;
      }
      if (user?.email) setEmail(user.email);
    };

    sync();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      sync();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleResend = async () => {
    const to = email || stateEmail;
    if (!to) {
      setMessage("Add your email above or sign up again.");
      return;
    }
    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: to,
    });
    setBusy(false);
    if (error) setMessage(error.message);
    else setMessage("Another email is on its way. Check spam too.");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[500px] rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-medium">Check your inbox</h1>
        <p className="mb-6 text-sm text-gray-600">
          We sent a confirmation link
          {email ? (
            <>
              {" "}
              to <span className="font-medium text-gray-900">{email}</span>
            </>
          ) : (
            " to your email"
          )}
          . Open it to verify your account, then you can use the dashboard.
        </p>

        {!email && (
          <p className="mb-4 text-xs text-gray-500">
            If you just signed up, use the same address you registered with. You
            can also go back to login after verifying.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-white disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Resend confirmation email
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full rounded-full border border-gray-200 py-3 text-gray-700"
          >
            Back to login
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-center text-sm text-gray-500 underline"
          >
            Sign out
          </button>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
