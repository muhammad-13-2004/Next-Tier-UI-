import { create } from "zustand";
import supabase from "@/services/supabase";
import { useOnboardingStore } from "@/store/onboardingStore";

export const useAuthStore = create((set, get) => ({

  user:        null,
  accessToken: null,
  loading:     true,
  initialized: false,

  setUser: (user) =>
    set({
      user,
    }),

  initAuth: () => {

    // Prevent double-init
    if (get().initialized) return;
    set({ initialized: true });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      const persistedCompleted =
        typeof user?.user_metadata?.onboarding_completed === "boolean"
          ? user.user_metadata.onboarding_completed
          : false;
      useOnboardingStore.getState().setCompleted(persistedCompleted);
      set({
        user,
        accessToken: session?.access_token ?? null,
        loading: false,
      });
    });
 
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        const persistedCompleted =
          typeof user?.user_metadata?.onboarding_completed === "boolean"
            ? user.user_metadata.onboarding_completed
            : false;
        useOnboardingStore.getState().setCompleted(persistedCompleted);
        set({
          user,
          accessToken: session?.access_token ?? null,
          loading: false,
        });
      }
    );

    return () => subscription.unsubscribe();
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      accessToken: null,
      initialized: false,
    });
  },
}));
