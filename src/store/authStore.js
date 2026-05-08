import { create } from "zustand";
import supabase from "@/services/supabase";

export const useAuthStore = create((set, get) => ({

  user:        null,
  accessToken: null,
  loading:     true,
  initialized: false,

  setUser: (user) => set({ user }),

  initAuth: () => {

    // Prevent double-init
    if (get().initialized) return;
    set({ initialized: true });

    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        user: session?.user ?? null,
        accessToken: session?.access_token ?? null,
        loading: false,
      });
    });
 
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({
          user: session?.user ?? null,
          accessToken: session?.access_token ?? null,
          loading: false,
        });
      }
    );

    return () => subscription.unsubscribe();
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, accessToken: null, initialized: false });
  },
}));
