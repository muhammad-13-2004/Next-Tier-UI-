import supabase from "@/services/supabase";
import { api } from "@/services/api";

export function isTruthyOnboardingFlag(value) {
  return value === true || value === "true" || value === 1;
}

export function isOnboardingCompletedFromUser(user) {
  if (!user) return false;
  const metadata = user.user_metadata ?? {};
  return isTruthyOnboardingFlag(metadata.onboarding_completed);
}

export function isOnboardingCompletedFromDashboard(data) {
  if (!data) return false;

  const candidates = [
    data.onboarding_completed,
    data.profile?.onboarding_completed,
    data.preferences?.onboarding_completed,
    data.user_preferences?.onboarding_completed,
  ];

  if (candidates.some(isTruthyOnboardingFlag)) {
    return true;
  }

  if (Array.isArray(data.courses) && data.courses.length > 0) {
    return true;
  }

  return false;
}

async function fetchOnboardingFromPreferencesTable(userId) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("onboarding_completed")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return isTruthyOnboardingFlag(data.onboarding_completed);
}

export async function resolveOnboardingCompleted(user, accessToken) {
  if (!user) return false;

  if (isOnboardingCompletedFromUser(user)) {
    return true;
  }

  const fromPreferences = await fetchOnboardingFromPreferencesTable(user.id);
  if (fromPreferences === true) {
    return true;
  }
  if (fromPreferences === false) {
    return false;
  }

  if (!accessToken) {
    return false;
  }

  try {
    const data = await api.getDashboard();
    return isOnboardingCompletedFromDashboard(data);
  } catch {
    return false;
  }
}

export async function persistOnboardingCompleted(user) {
  const { data, error } = await supabase.auth.updateUser({
    data: { onboarding_completed: true },
  });

  if (error) {
    throw error;
  }

  return data?.user ?? user;
}
