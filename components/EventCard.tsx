import { useFavoriteEvents } from "@/store/useFavoriteEvents";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, MD3Colors, Text, Snackbar, Portal } from "react-native-paper";

export type Event = {
  id: string;
  title: string;
  venue: string;
  date: string; // e.g. "Sat, Jun 15"
  time: string; // e.g. "7:00 PM"
  attendees: number;
  image: string;
};

type EventCardProps = {
  item: Event;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
};

const EventCard = ({
  item,
  onPress,
}: EventCardProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteEvents();
  const attendeesLabel = useMemo(() => `${item.attendees}`, [item.attendees]);
  const [addedVisible, setAddedVisible] = useState(false);

  const handleToggleFavorite = () => {
    const wasFavorite = isFavorite(item.id);
    toggleFavorite(item);
    if (!wasFavorite) setAddedVisible(true);
  };

  return (
    <>
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      {/* Cover */}
      <Image source={{ uri: item.image }} style={styles.cover} />

      {/* Content */}
      <View style={styles.content}>
        {/* Title + Heart */}
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <IconButton
            icon={isFavorite(item.id) ? "heart" : "heart-outline"}
            iconColor={isFavorite(item.id) ? MD3Colors.error50 : MD3Colors.neutral50}
            onPress={handleToggleFavorite}
            size={20}
            style={styles.heart}
          />
        </View>

        {/* Venue */}
        <View style={styles.row}>
          <FontAwesome5
            name="map-marked-alt"
            size={18}
            color={MD3Colors.neutral50}
          />
          <Text variant="titleSmall" style={styles.meta}>
            {item.venue || "Not yet determined"}
          </Text>
        </View>

        {/* Date • Time • Attendees */}
        <View style={[styles.row, { marginTop: 8, columnGap: 18 }]}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="calendar"
              size={18}
              color={MD3Colors.neutral50}
            />
            <Text variant="bodyMedium" style={styles.meta}>
              {item.date}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color={MD3Colors.neutral50}
            />
            <Text variant="bodyMedium" style={styles.meta}>
              {item.time}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="account-group"
              size={18}
              color={MD3Colors.neutral50}
            />
            <Text variant="bodyMedium" style={styles.meta}>
              {attendeesLabel}
            </Text>
          </View>
        </View>

        {/* CTA */}
        <Button
          mode="contained"
          onPress={() => router.push(`/event/${item.id}`)}
          style={styles.cta}
          contentStyle={{ height: 44 }}
          labelStyle={{ fontWeight: "700" }}
        >
          View Details
        </Button>
      </View>
    </Card>

    <Portal>
      <Snackbar
        visible={addedVisible}
        onDismiss={() => setAddedVisible(false)}
        duration={1500}
      >
        Added to favorites
      </Snackbar>
    </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
  },
  cover: {
    width: "100%",
    height: 150,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontWeight: "700",
  },
  heart: {
    margin: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  meta: {
    marginLeft: 6,
    opacity: 0.9,
  },
  cta: {
    marginTop: 12,
    borderRadius: 14,
  },
});

export default EventCard;
