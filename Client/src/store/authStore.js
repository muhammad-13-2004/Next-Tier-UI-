import { create } from "zustand";
import supabase from "@/services/supabase";


export const useAuthStore = create((set) => ({

    user: null, 
    loading: true,

    fetchUser: async () => {
        const { data : {user} } = await supabase.auth.getUser();

        set({ user, loading: false})
    },

    setUser: (user) => set({user}),

    logout:  async () => {
        await supabase.auth.signOut();
        set({ user: null})
    }


}));