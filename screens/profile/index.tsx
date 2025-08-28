import { useSettings } from "@/store/useSettings";
import { useFavoriteEvents } from "@/store/useFavoriteEvents";
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
  Dialog,
  Portal,
  Button,
} from "react-native-paper";

import SavedEventCard, { SavedEvent } from "@/components/SavedEventCard";

export default function ProfileScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme } = useSettings();
  const { favoriteEvents, removeFromFavorites, clearAllFavorites } = useFavoriteEvents();

  const removeEvent = (id: string) => removeFromFavorites(id);
  const [clearAllVisible, setClearAllVisible] = React.useState(false);

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

      {favoriteEvents.length === 0 ? (
        <Text style={{ opacity: 0.6, marginHorizontal: 16, marginBottom: 8 }}>
          No saved events yet. Start adding events to your favorites!
        </Text>
      ) : (
        <>
          <View style={styles.clearAllContainer}>
            <Text variant="bodySmall" style={{ opacity: 0.7 }}>
              {favoriteEvents.length} event{favoriteEvents.length !== 1 ? 's' : ''} saved
            </Text>
            <Text 
              variant="bodySmall" 
              style={[styles.clearAllButton, { color: theme.colors.error }]}
              onPress={() => setClearAllVisible(true)}
            >
              Clear All
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
        <Dialog visible={clearAllVisible} onDismiss={() => setClearAllVisible(false)}>
          <Dialog.Content style={{ alignItems: 'center' }}>
            <List.Icon icon="alert" color={theme.colors.error} />
            <Text style={{ textAlign: 'center', marginTop: 4 }}>
              Are you sure you want to clear all saved events?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setClearAllVisible(false)}>No</Button>
            <Button
              onPress={() => {
                setClearAllVisible(false);
                clearAllFavorites();
              }}
            >
              Yes
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
  clearAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  clearAllButton: {
    textDecorationLine: 'underline',
  },
});
