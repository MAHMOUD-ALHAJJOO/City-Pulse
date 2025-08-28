import { useI18n } from "@/shared/i18n";
import { useFavoriteEvents } from "@/shared/store/useFavoriteEvents";
import { useSettings } from "@/shared/store/useSettings";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  List,
  MD3Colors,
  Portal,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";

import SavedEventCard from "@/screens/profile/components/SavedEventCard";

export default function ProfileScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme, language, setLanguage } = useSettings();
  const { favoriteEvents, removeFromFavorites, clearAllFavorites } =
    useFavoriteEvents();

  const removeEvent = (id: string) => removeFromFavorites(id);
  const [clearAllVisible, setClearAllVisible] = React.useState(false);

  const { t } = useI18n();

  const langLabel =
    (language ?? "en") === "ar" ? t("profile.arabic") : t("profile.english");
  const themeLabel = isDark ? t("profile.dark") : t("profile.light");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Profile Card */}
      <Card mode="elevated" style={styles.sectionCard}>
        <Card.Content style={styles.profileRow}>
          <Avatar.Image
            size={56}
            source={{
              uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256",
            }}
          />
          <View style={styles.profileInfo}>
            <Text variant="titleMedium">{t("profile.name")}</Text>
            <View style={styles.inline}>
              <List.Icon icon="email-outline" style={styles.inlineIcon} />
              <Text variant="bodyMedium" style={styles.subtle}>
                Yasmine.Al-Agha@example.com
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Settings Card */}
      <Card mode="elevated" style={styles.sectionCard}>
        <Card.Content style={styles.cardContentNoXPad}>
          {/* Theme (Dark/Light) */}
          <List.Item
            title={() => (
              <View style={styles.rowTitle}>
                <List.Icon icon={isDark ? "weather-night" : "weather-sunny"} />
                <Text variant="bodyLarge">{t("profile.theme")}</Text>
              </View>
            )}
            description={themeLabel}
            right={() => (
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                accessibilityLabel="Toggle dark mode"
              />
            )}
          />

          <Divider />

          {/* Language row */}
          <List.Item
            title={() => (
              <View style={styles.rowTitle}>
                <List.Icon icon="earth" />
                <Text variant="bodyLarge">{t("profile.language")}</Text>
              </View>
            )}
            description={langLabel}
            right={() => (
              <Switch
                disabled={true}
                value={(language ?? "en") === "ar"}
                onValueChange={(val) => setLanguage(val ? "ar" : "en")}
                accessibilityLabel="Toggle language"
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Saved Events */}
      <Text variant="titleMedium" style={[styles.sectionTitle]}>
        {t("profile.saved")}
      </Text>

      {favoriteEvents.length === 0 ? (
        <Text style={{ opacity: 0.6, marginHorizontal: 16, marginBottom: 8 }}>
          {t("profile.noneSaved")}
        </Text>
      ) : (
        <>
          <View style={styles.clearAllContainer}>
            <Text variant="bodySmall" style={{ opacity: 0.7 }}>
              {favoriteEvents.length} {t("event")}
              {favoriteEvents.length !== 1 && langLabel === "en"
                ? "s"
                : ""}{" "}
              {t("saved")}
            </Text>
            <Text
              variant="bodySmall"
              style={[styles.clearAllButton, { color: theme.colors.error }]}
              onPress={() => setClearAllVisible(true)}
              accessibilityRole="button"
              accessibilityLabel={t("profile.clearAll")}
            >
              {t("profile.clearAll")}
            </Text>
          </View>
          {favoriteEvents.map((event) => (
            <SavedEventCard
              key={event.id}
              event={{
                id: event.id,
                title: event.title,
                dateLine: `${event.date} • ${event.time}`,
                place: event.venue,
                thumbnail: event.image,
              }}
              onRemove={removeEvent}
            />
          ))}
        </>
      )}

      <View style={styles.bottomSpacer} />

      {/* Clear all confirmation dialog */}
      <Portal>
        <Dialog
          visible={clearAllVisible}
          style={{ borderRadius: 16 }}
          onDismiss={() => setClearAllVisible(false)}
        >
          <Dialog.Content style={{ alignItems: "center" }}>
            <List.Icon icon="alert" color={theme.colors.error} />
            <Text style={{ textAlign: "center", marginTop: 4 }}>
              {t("dialog.clear.confirm")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearAllVisible(false)}>
              {t("dialog.no")}
            </Button>
            <Button
              onPress={() => {
                setClearAllVisible(false);
                clearAllFavorites();
              }}
              textColor={MD3Colors.error50}
            >
              {t("dialog.yes")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, paddingBottom: 32 },
  subtle: { opacity: 0.8 },
  sectionCard: { borderRadius: 16, marginBottom: 12 },
  sectionTitle: { marginVertical: 8, marginHorizontal: 4 },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  profileInfo: { flex: 1, justifyContent: "center", gap: 2 },
  inline: { flexDirection: "row", alignItems: "center", gap: 6 },
  inlineIcon: { margin: 0 },
  rowTitle: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardContentNoXPad: { paddingHorizontal: 0 },
  bottomSpacer: { height: 24 },
  clearAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  clearAllButton: {
    textDecorationLine: "underline",
  },
});
