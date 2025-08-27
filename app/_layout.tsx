import Header from "@/components/Header";
import { useSettings } from "@/store/useSettings";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";

export default function RootLayout() {
  const { isDark } = useSettings();

  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const theme = { ...base, roundness: 16 };

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          header: (props) => <Header {...props} />,
          // animation: "simple_push",
        }}
      />
    </PaperProvider>
  );
}
