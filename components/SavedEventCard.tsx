import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  MD3Colors,
  Portal,
  Text,
} from "react-native-paper";

export type SavedEvent = {
  id: string;
  title: string;
  dateLine: string;
  place: string;
  thumbnail: string;
};

type SavedEventProps = {
  event: SavedEvent;
  onRemove?: (id: string) => void;
  onPress?: (id: string) => void;
};

export default function SavedEventCard({
  event,
  onRemove,
  onPress,
}: SavedEventProps) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <Card
      mode="elevated"
      style={styles.eventCard}
      onPress={() => router.push(`/event/${event.id}`)}
    >
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
              onPress={() => setConfirmVisible(true)}
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

      {/* Remove confirmation dialog */}
      <Portal>
        <Dialog
          style={{ borderRadius: 16 }}
          visible={confirmVisible}
          onDismiss={() => setConfirmVisible(false)}
        >
          <Dialog.Content style={{ alignItems: "center" }}>
            <IconButton icon="alert" size={36} iconColor={MD3Colors.error50} />
            <Text style={{ textAlign: "center", marginTop: 4 }}>
              Are you sure you want to remove this saved event?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmVisible(false)}>No</Button>
            <Button
              onPress={() => {
                setConfirmVisible(false);
                onRemove?.(event.id);
              }}
              textColor={MD3Colors.error50}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Card>
  );
}

const styles = StyleSheet.create({
  eventCard: { borderRadius: 16, marginBottom: 12 },
  eventContent: { flexDirection: "row", gap: 12, paddingBottom: 16 },
  thumb: { width: 76, height: 76, borderRadius: 12 },
  eventInfo: { flex: 1, minHeight: 76 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "700", width: "80%" },
  subtle: { opacity: 0.8, marginTop: 4 },
  trashBtn: { margin: 0 },
});
