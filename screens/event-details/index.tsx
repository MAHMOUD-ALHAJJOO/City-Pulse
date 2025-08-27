import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  MD3Colors,
  Text,
  useTheme
} from "react-native-paper";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const theme = useTheme();

  const event = {
    id: "1",
    title: "Summer Music Festival",
    category: "Music",
    venue: "Central Park, New York",
    date: "Sat, Jun 15",
    time: "7:00 PM",
    attendees: 1200,
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    about:
      "Join us for an incredible evening of live music featuring top artists from around the world. Experience the magic of summer with food, drinks, and unforgettable performances.",
    organizer: "City Events Co.",
    price: "$25-50",
    locationImg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: "" }} />
      {/* Cover */}

      <Card style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.cover} />
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
            <Text>📍 {event.venue}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text>📅 {event.date}</Text>
            <Text style={{ marginLeft: 15 }}>⏰ {event.time}</Text>
            <Text style={{ marginLeft: 15 }}>
              👥 {event.attendees} attending
            </Text>
          </View>
        </View>

        {/* About Section */}
        <Card elevation={2} style={styles.section}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold", marginBottom: 8 }}
          >
            About this event
          </Text>
          <Text style={{ opacity: 0.8 }}>{event.about}</Text>
          <Text style={{ marginTop: 6 }}>
            Organized by{" "}
            <Text style={{ fontWeight: "bold" }}>{event.organizer}</Text>
          </Text>
        </Card>

        {/* Location Section */}
        <Card style={styles.section}>
          <View style={styles.locationHeader}>
            <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
              Location
            </Text>
            <Button
              compact
              onPress={() => console.log("Open Maps")}
              icon="map-marker"
            >
              Directions
            </Button>
          </View>
          <Image
            source={{ uri: event.locationImg }}
            style={styles.locationImg}
          />
        </Card>
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
  shareBtn: { position: "absolute", top: 10, right: 50 },
  favoriteBtn: { position: "absolute", top: 10, right: 10 },
  metaRow: { flexDirection: "row", marginBottom: 4 },
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
