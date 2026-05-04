import { create } from "zustand";
import supabase from "@/services/supabase";

// ===============================
// Ensure profile exists / sync user
// ===============================
const ensureProfileExists = async (user) => {
  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  // Create profile if it doesn't exist
  if (error || !data) {
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || "",
      email: user.email || "",
      avatar_url: user.user_metadata?.avatar_url || "",
      xp: 0,
      streak: 0,
      credits: 100,
      current_level: 1,
      last_active: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Profile creation error:", insertError);
    }
  } else {
    // Update last active on login
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        last_active: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Profile update error:", updateError);
    }
  }
};

// ===============================
// Zustand Auth Store
// ===============================
export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  loading: true,

  setUser: (user) => set({ user }),

  // Initialize auth listener
  initAuth: () => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;

      if (user) {
        await ensureProfileExists(user);
      }

      set({
        user,
        accessToken: session?.access_token ?? null,
        loading: false,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;

      if (user) {
        await ensureProfileExists(user);
      }

      set({
        user,
        accessToken: session?.access_token ?? null,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  },

  // Logout user
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, accessToken: null });
  },
}));