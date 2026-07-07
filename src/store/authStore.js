import { create } from "zustand";
import supabase from "@/services/supabase";
import { useOnboardingStore } from "@/store/onboardingStore";
import {
  isOnboardingCompletedFromUser,
  persistOnboardingCompleted,
  resolveOnboardingCompleted,
} from "@/services/onboardingStatus";

export const useAuthStore = create((set, get) => ({

  user:        null,
  accessToken: null,
  loading:     true,
  initialized: false,

  setSession: (session) =>
    set({
      user: session?.user ?? null,
      accessToken: session?.access_token ?? null,
      loading: false,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  syncOnboardingStatus: async (user, accessToken) => {
    if (!user) {
      useOnboardingStore.getState().setCompleted(null);
      return { user: null, completed: false };
    }

    const token = accessToken ?? get().accessToken;
    if (token) {
      set({ accessToken: token, user });
    }

    const completed = await resolveOnboardingCompleted(user, token);
    useOnboardingStore.getState().setCompleted(completed);

    if (completed && !isOnboardingCompletedFromUser(user)) {
      try {
        const updatedUser = await persistOnboardingCompleted(user);
        set({ user: updatedUser });
        return { user: updatedUser, completed: true };
      } catch {
        return { user, completed: true };
      }
    }

    return { user: get().user ?? user, completed };
  },

  initAuth: () => {
    if (get().initialized) return;
    set({ initialized: true });

    const handleSession = async (session) => {
      const user = session?.user ?? null;
      const accessToken = session?.access_token ?? null;

      set({
        user,
        accessToken,
        loading: false,
      });

      if (user) {
        await get().syncOnboardingStatus(user, accessToken);
      } else {
        useOnboardingStore.getState().setCompleted(null);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = session?.user ?? null;
        const accessToken = session?.access_token ?? null;

        set({
          user,
          accessToken,
          loading: false,
        });

        if (!user) {
          useOnboardingStore.getState().setCompleted(null);
          return;
        }

        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          get().syncOnboardingStatus(user, accessToken);
          return;
        }

        useOnboardingStore
          .getState()
          .setCompleted(isOnboardingCompletedFromUser(user));
      }
    );

    return () => subscription.unsubscribe();
  },

  logout: async () => {
    await supabase.auth.signOut();
    useOnboardingStore.getState().setCompleted(null);
    set({
      user: null,
      accessToken: null,
      initialized: false,
    });
  },
}));
