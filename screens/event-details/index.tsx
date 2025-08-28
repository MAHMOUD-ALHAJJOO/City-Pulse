import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  MD3Colors,
  Text,
  useTheme,
} from "react-native-paper";

import {
  adaptTMEventDetails,
  type EventDetailsModel,
} from "@/adapters/tmEventDetailsAdapter";
import { openDirections } from "@/helpers";
import { useEventDetails } from "@/hooks/useEventDetails";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  const { data, isPending, error } = useEventDetails(id);
  const event: EventDetailsModel | null = useMemo(
    () => (data ? adaptTMEventDetails(data) : null),
    [data]
  );

  if (isPending) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ActivityIndicator
          color={MD3Colors.primary30}
          size="large"
          style={{ marginVertical: 12 }}
        />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.error, margin: 16 }}>
          {(error as Error)?.message || "Failed to load"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cover */}
      <Card style={styles.card}>
        {!!event.image && (
          <Image source={{ uri: event.image }} style={styles.cover} />
        )}
        <IconButton
          icon="heart-outline"
          iconColor={MD3Colors.error50}
          style={[
            styles.favoriteBtn,
            { backgroundColor: theme.colors.surface },
          ]}
          onPress={() => console.log("Favorite toggled")}
        />
      </Card>

      {/* Title + Info */}
      <View style={{ paddingHorizontal: 8 }}>
        <View style={{ padding: 15 }}>
          <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
            {event.title}
          </Text>

          <View style={styles.metaRow}>
            <Text>
              📍 {event.venue}
              {event.city ? `, ${event.city}` : "Not yet determined"}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text>📅 {event.date || "-"}</Text>
            <Text style={{ marginLeft: 15 }}>⏰ {event.time || "-"}</Text>
          </View>
        </View>

        {/* About Section */}
        {event.about || event.description ? (
          <Card elevation={2} style={styles.section}>
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", marginBottom: 8 }}
            >
              About this event
            </Text>
            <Text style={{ opacity: 0.8 }}>{event.about}</Text>
            {event.organizer ? (
              <Text style={{ marginTop: 6 }}>
                Organized by{" "}
                <Text style={{ fontWeight: "bold" }}>{event.organizer}</Text>
              </Text>
            ) : null}
          </Card>
        ) : null}

        {/* Location Section */}
        {event.lat && event.lng && (
          <Card style={styles.section}>
            <View style={styles.locationHeader}>
              <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                Location
              </Text>
              <Button
                compact
                onPress={() => {
                  if (event.lat && event.lng) {
                    openDirections(
                      event.lat,
                      event.lng,
                      event.venue || event.title
                    );
                  }
                }}
                icon="map-marker"
              >
                Directions
              </Button>
            </View>
            <Image
              source={require("../../assets/images/compass.jpeg")}
              style={styles.locationImg}
            />
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { position: "relative" },
  cover: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteBtn: { position: "absolute", top: 10, right: 10 },
  metaRow: { flexDirection: "row", marginVertical: 6 },
  section: { margin: 10, padding: 15, borderRadius: 12 },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationImg: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
});
