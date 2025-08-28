import { useI18n } from "@/i18n";
import { router } from "expo-router";
import { View } from "react-native";
import { Appbar, MD3Colors, Text, useTheme } from "react-native-paper";

const HomeHeader = () => {
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.Content
        title={
          <View>
            <Text variant="headlineMedium" style={{ opacity: 0.9 }}>
              {t("app.title")}
            </Text>
            <Text variant="bodySmall" style={{ opacity: 0.7, marginTop: 1 }}>
              {t("app.subtitle")}
            </Text>
          </View>
        }
      />

      <Appbar.Action
        icon="account-circle-outline"
        color={MD3Colors.primary50}
        onPress={() => router.push("/profile")}
      />
    </Appbar.Header>
  );
};

export default HomeHeader;
