import EventCard, { Event } from "@/components/EventCard";
import { globalStyles } from "@/style/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar, Text, useTheme } from "react-native-paper";
import HomeHeader from "./components/HomeHeader";

const mock: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    venue: "Central Park",
    date: "Sat, Jun 15",
    time: "7:00 PM",
    attendees: 1200,
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Broadway Night",
    venue: "Radio City Music Hall",
    date: "Sun, Jun 16",
    time: "8:30 PM",
    attendees: 980,
    image:
      "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Indie Rock Live",
    venue: "Brooklyn Steel",
    date: "Mon, Jun 17",
    time: "9:00 PM",
    attendees: 650,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1974&auto=format&fit=crop",
  },
];

const HomeScreen = () => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");

  return (
    <View
      style={[
        globalStyles.screen,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <HomeHeader />

      <View style={styles.searchBox}>
        <Searchbar
          placeholder="Search events..."
          value={keyword}
          onChangeText={setKeyword}
          style={styles.search}
          icon="magnify"
          iconColor={theme.colors.primary}
        />
        <Searchbar
          placeholder="Search city..."
          value={city}
          onChangeText={setCity}
          style={styles.search}
          icon={() => (
            <MaterialCommunityIcons
              color={theme.colors.primary}
              name="map-search-outline"
              size={20}
            />
          )}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Featured Events
        </Text>
      </View>

      <FlatList
        data={mock}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            item={item}
            onPress={() => {
              /* navigate later */
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 8,
    // backgroundColor: "#F5F6FB",
  },
  search: { borderRadius: 14 },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "#F5F6FB",
  },
  sectionTitle: { fontWeight: "700", marginTop: 4 },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
});

export default HomeScreen;
