import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
  isDark: boolean;
  // isArabic: boolean;
  setTheme: (v: boolean) => void;
  toggleTheme: () => void;
  // setArabic: (v: boolean) => void;
  // toggleArabic: () => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      isDark: false,
      // isArabic: false,
      setTheme: (v) => set({ isDark: v }),
      toggleTheme: () => set({ isDark: !get().isDark }),
      // setArabic: (v) => set({ isArabic: v }),
      // toggleArabic: () => set({ isArabic: !get().isArabic }),
    }),
    { name: "settings", storage: createJSONStorage(() => AsyncStorage) }
  )
);
