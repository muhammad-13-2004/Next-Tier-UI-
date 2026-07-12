import { isOnboardingCompletedFromUser } from "@/services/onboardingStatus";

export function isOnboardingCompleted(user) {
  return isOnboardingCompletedFromUser(user);
}

export function getPostLoginPath(user, onboardingCompleted = isOnboardingCompleted(user)) {
  if (!user) return "/login";

  if (!user.email_confirmed_at) {
    return "/verify-email";
  }

  return onboardingCompleted ? "/dashboard" : "/boarding";
}
