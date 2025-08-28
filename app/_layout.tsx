import Header from "@/components/Header";
import { useSettings } from "@/store/useSettings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
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
  const { isDark } = useSettings();

  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const theme = { ...base, roundness: 16 };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack screenOptions={{ header: (props) => <Header {...props} /> }} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
