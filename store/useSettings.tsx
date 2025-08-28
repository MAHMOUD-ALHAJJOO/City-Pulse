import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Language = 'en' | 'ar' | null; // null = follow device

type SettingsState = {
  isDark: boolean;
  language: Language;
  setTheme: (v: boolean) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void; // toggles between 'en' and 'ar'
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      isDark: false,
      language: null,
      setTheme: (v) => set({ isDark: v }),
      toggleTheme: () => set({ isDark: !get().isDark }),
      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () => {
        const cur = get().language;
        const next = cur === 'ar' ? 'en' : 'ar';
        set({ language: next });
      },
    }),
    { name: "settings", storage: createJSONStorage(() => AsyncStorage) }
  )
);
