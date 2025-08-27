import { useSettings } from "@/store/useSettings";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  List,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";

import SavedEventCard, { SavedEvent } from "@/components/SavedEventCard";

const mockEvents: SavedEvent[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    dateLine: "Sat, Jun 15 • 7:00 PM",
    place: "Central Park",
    thumbnail:
      "https://images.unsplash.com/photo-1508970436-a41e3d20662b?q=80&w=400",
  },
  {
    id: "2",
    title: "Broadway Show",
    dateLine: "Fri, Jun 21 • 8:00 PM",
    place: "Grand Theater",
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400",
  },
  {
    id: "3",
    title: "Street Performance",
    dateLine: "Sun, Jun 16 • 2:00 PM",
    place: "Downtown Plaza",
    thumbnail:
      "https://images.unsplash.com/photo-1502139214988-d0ad755818d8?q=80&w=400",
  },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme } = useSettings();

  const [events, setEvents] = React.useState<SavedEvent[]>(mockEvents);
  const removeEvent = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  const langLabel = false ? "العربية" : "English";
  const themeLabel = isDark ? "Dark" : "Light";

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
            <Text variant="titleMedium" style={styles.bold}>
              Alex Johnson
            </Text>
            <View style={styles.inline}>
              <List.Icon icon="email-outline" style={styles.inlineIcon} />
              <Text variant="bodyMedium" style={styles.subtle}>
                alex.johnson@example.com
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
                <Text variant="bodyLarge">Theme</Text>
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
                <Text variant="bodyLarge">Language</Text>
              </View>
            )}
            description={langLabel}
            right={() => (
              <Switch
                value={false}
                onValueChange={() => {}}
                accessibilityLabel="Toggle language"
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Saved Events */}
      <Text variant="titleMedium" style={[styles.bold, styles.sectionTitle]}>
        Saved Events
      </Text>

      {events.map((ev) => (
        <SavedEventCard key={ev.id} event={ev} onRemove={removeEvent} />
      ))}

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, paddingBottom: 32 },
  bold: { fontWeight: "700" },
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
});
