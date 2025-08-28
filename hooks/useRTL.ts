import { useEffect } from "react";
import { I18nManager } from "react-native";
import * as Updates from "expo-updates";

export function useRTL(language: 'en' | 'ar' | null) {
  useEffect(() => {
    const applyDir = async () => {
      try {
        const shouldRTL = (language ?? 'en') === 'ar';
        if (I18nManager.isRTL !== shouldRTL) {
          I18nManager.allowRTL(shouldRTL);
          I18nManager.forceRTL(shouldRTL);
          I18nManager.swapLeftAndRightInRTL(true);
          await Updates.reloadAsync();
        }
      } catch {}
    };
    applyDir();
  }, [language]);
}

export default useRTL;

