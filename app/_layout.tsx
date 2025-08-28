import Header from "@/components/Header";
import { useSettings } from "@/store/useSettings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import * as React from "react";
import { I18nManager } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const { isDark, language } = useSettings();

  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const theme = { ...base, roundness: 16 };

  // Flip layout direction when language is changed in Profile.
  React.useEffect(() => {
    const applyDir = async () => {
      try {
        const shouldRTL = (language ?? "en") === "ar";
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

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack screenOptions={{ header: (props) => <Header {...props} /> }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
