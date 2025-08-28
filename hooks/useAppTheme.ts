import * as Font from "expo-font";
import * as Localization from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from "react-native-paper";

// Keep the splash screen visible while we load fonts
void SplashScreen.preventAutoHideAsync();

export function useAppTheme(isDark: boolean, language: "en" | "ar" | null) {
  // Load all font files
  const [fontsLoaded] = Font.useFonts({
    // English: Montserrat
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    // Arabic: DINNextLTArabic
    "DINNextLTArabic-UltraLight": require("../assets/fonts/DINNextLTArabic-UltraLight.ttf"),
    "DINNextLTArabic-Light": require("../assets/fonts/DINNextLTArabic-Light.ttf"),
    "DINNextLTArabic-Regular": require("../assets/fonts/DINNextLTArabic-Regular.ttf"),
    "DINNextLTArabic-Medium": require("../assets/fonts/DINNextLTArabic-Medium.ttf"),
    "DINNextLTArabic-Bold": require("../assets/fonts/DINNextLTArabic-Bold.ttf"),
  });

  // Determine whether to use Arabic fonts based on settings or device
  const device =
    Localization.getLocales?.()[0]?.languageCode?.toLowerCase?.() ?? "en";
  const effectiveLang = language ?? device;
  const useArabicFonts = effectiveLang.startsWith("ar");

  // Map Paper MD3 type scale to our custom families
  const md3FontConfig = useArabicFonts
    ? {
        displayLarge: { fontFamily: "DINNextLTArabic-Bold" },
        displayMedium: { fontFamily: "DINNextLTArabic-Bold" },
        displaySmall: { fontFamily: "DINNextLTArabic-Medium" },
        headlineLarge: { fontFamily: "DINNextLTArabic-Bold" },
        headlineMedium: { fontFamily: "DINNextLTArabic-Medium" },
        headlineSmall: { fontFamily: "DINNextLTArabic-Medium" },
        titleLarge: { fontFamily: "DINNextLTArabic-Bold" },
        titleMedium: { fontFamily: "DINNextLTArabic-Medium" },
        titleSmall: { fontFamily: "DINNextLTArabic-Medium" },
        labelLarge: { fontFamily: "DINNextLTArabic-Medium" },
        labelMedium: { fontFamily: "DINNextLTArabic-Medium" },
        labelSmall: { fontFamily: "DINNextLTArabic-Medium" },
        bodyLarge: { fontFamily: "DINNextLTArabic-Regular" },
        bodyMedium: { fontFamily: "DINNextLTArabic-Regular" },
        bodySmall: { fontFamily: "DINNextLTArabic-Regular" },
      }
    : {
        displayLarge: { fontFamily: "Montserrat-Bold" },
        displayMedium: { fontFamily: "Montserrat-Bold" },
        displaySmall: { fontFamily: "Montserrat-SemiBold" },
        headlineLarge: { fontFamily: "Montserrat-Bold" },
        headlineMedium: { fontFamily: "Montserrat-SemiBold" },
        headlineSmall: { fontFamily: "Montserrat-SemiBold" },
        titleLarge: { fontFamily: "Montserrat-Bold" },
        titleMedium: { fontFamily: "Montserrat-Medium" },
        titleSmall: { fontFamily: "Montserrat-Medium" },
        labelLarge: { fontFamily: "Montserrat-Medium" },
        labelMedium: { fontFamily: "Montserrat-Medium" },
        labelSmall: { fontFamily: "Montserrat-Medium" },
        bodyLarge: { fontFamily: "Montserrat-Regular" },
        bodyMedium: { fontFamily: "Montserrat-Regular" },
        bodySmall: { fontFamily: "Montserrat-Regular" },
      };

  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const theme = {
    ...base,
    roundness: 16,
    fonts: configureFonts({ config: md3FontConfig }),
  };

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { theme, fontsLoaded, onLayoutRootView } as const;
}
