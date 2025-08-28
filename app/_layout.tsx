import Header from "@/components/Header";
import { useAppTheme } from "@/hooks/useAppTheme";
import useRTL from "@/hooks/useRTL";
import queryClient from "@/lib/queryClient";
import { useSettings } from "@/store/useSettings";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const { isDark, language } = useSettings();

  // Apply RTL when language changes
  useRTL(language);

  // Load fonts, build theme, and defer splash hiding
  const { theme, fontsLoaded, onLayoutRootView } = useAppTheme(
    isDark,
    language
  );
  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <StatusBar style={isDark ? "light" : "dark"} />
          <Stack screenOptions={{ header: (props) => <Header {...props} /> }} />
        </PaperProvider>
      </QueryClientProvider>
    </View>
  );
}
