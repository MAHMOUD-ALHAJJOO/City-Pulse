import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, IconButton, MD3Colors, Text } from "react-native-paper";

export type SavedEvent = {
  id: string;
  title: string;
  dateLine: string;
  place: string;
  thumbnail: string;
};

type Props = {
  event: SavedEvent;
  onRemove?: (id: string) => void;
  onPress?: (id: string) => void;
};

export default function SavedEventCard({ event, onRemove, onPress }: Props) {
  return (
    <Card mode="elevated" style={styles.eventCard} onPress={() => onPress?.(event.id)}>
      <Card.Content style={styles.eventContent}>
        <Image source={{ uri: event.thumbnail }} style={styles.thumb} />
        <View style={styles.eventInfo}>
          <View style={styles.titleRow}>
            <Text variant="titleMedium" style={styles.bold} numberOfLines={1}>
              {event.title}
            </Text>

            <IconButton
              icon="trash-can-outline"
              size={22}
              iconColor={MD3Colors.error50}
              onPress={() => onRemove?.(event.id)}
              accessibilityLabel="Remove saved event"
              style={styles.trashBtn}
            />
          </View>

          <Text variant="bodySmall" style={styles.subtle} numberOfLines={1}>
            {event.dateLine}
          </Text>
          <Text variant="bodySmall" style={styles.subtle} numberOfLines={1}>
            {event.place}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  eventCard: { borderRadius: 16, marginBottom: 12 },
  eventContent: { flexDirection: "row", gap: 12 },
  thumb: { width: 76, height: 76, borderRadius: 12 },
  eventInfo: { flex: 1, minHeight: 76 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  bold: { fontWeight: "700" },
  subtle: { opacity: 0.8, marginTop: 4 },
  trashBtn: { margin: 0 },
});
