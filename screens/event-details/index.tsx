import { useI18n } from "@/shared/i18n";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  MD3Colors,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";

import {
  adaptTMEventDetails,
  type EventDetailsModel,
} from "@/screens/event-details/adapters/tmEventDetailsAdapter";
import { useEventDetails } from "@/screens/event-details/hooks/useEventDetails";
import { useFavoriteEvents } from "@/shared/store/useFavoriteEvents";
import { openDirections } from "@/shared/utils/helpers";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavoriteEvents();
  const [addedVisible, setAddedVisible] = useState(false);
  const { t } = useI18n();

  const { data, isPending, error } = useEventDetails(id);
  const event: EventDetailsModel | null = useMemo(
    () => (data ? adaptTMEventDetails(data) : null),
    [data]
  );

  const handleToggleFavorite = () => {
    if (event) {
      const wasFavorite = isFavorite(event.id);
      toggleFavorite({
        id: event.id,
        title: event.title,
        venue: event?.venue || "",
        date: event?.date || "",
        time: event?.time || "",
        image: event?.image || "",
        attendees: 0,
      });
      if (!wasFavorite) setAddedVisible(true);
    }
  };

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
    <>
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
            icon={isFavorite(event.id) ? "heart" : "heart-outline"}
            iconColor={
              isFavorite(event.id) ? MD3Colors.error50 : MD3Colors.neutral50
            }
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteBtn,
              { backgroundColor: theme.colors.surface },
            ]}
          />
        </Card>

        {/* Title + Info */}
        <View style={{ paddingHorizontal: 8 }}>
          <View style={{ padding: 15 }}>
            <Text variant="headlineSmall">{event.title}</Text>

            <View style={styles.metaRow}>
              <Text>
                📍 {event.venue}
                {event.city ? `, ${event.city}` : ` ${t("card.notDetermined")}`}
              </Text>
            </View>

            <View style={styles.metaRow}>
              <Text>📅 {event.date || "-"}</Text>
              <Text style={{ marginStart: 15 }}>⏰ {event.time || "-"}</Text>
            </View>
          </View>

          {/* About Section */}
          {event.about || event.description ? (
            <Card elevation={2} style={styles.section}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                {t("details.about")}
              </Text>
              <Text style={{ opacity: 0.8 }}>{event.about}</Text>
              {event.organizer ? (
                <Text style={{ marginTop: 6 }}>
                  {t("details.organizedBy")} <Text>{event.organizer}</Text>
                </Text>
              ) : null}
            </Card>
          ) : null}

          {/* Location Section */}
          {event.lat && event.lng && (
            <Card style={styles.section}>
              <View style={styles.locationHeader}>
                <Text variant="titleMedium"> {t("details.location")}</Text>
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
                  {" "}
                  {t("details.directions")}
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

      <Portal>
        <Snackbar
          visible={addedVisible}
          onDismiss={() => setAddedVisible(false)}
          duration={1500}
        >
          {t("snackbar.added")}
        </Snackbar>
      </Portal>
    </>
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
