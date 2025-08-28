import { selectEventsFromInfinite } from "@/adapters/tmEventAdapter";
import EventCard from "@/components/EventCard";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useEventsSearch } from "@/hooks/useEventsSearch";
import { useI18n } from "@/i18n";
import { useFavoriteEvents } from "@/store/useFavoriteEvents";
import { globalStyles } from "@/style/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { MD3Colors, Searchbar, Text, useTheme } from "react-native-paper";
import HomeHeader from "./components/HomeHeader";

const HomeScreen = () => {
  const theme = useTheme();
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 400);
  const debouncedCity = useDebouncedValue(city, 400);
  const router = useRouter();
  const { t } = useI18n();

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    status,
    error,
  } = useEventsSearch({
    keyword: debouncedKeyword,
    city: debouncedCity,
    size: 10,
  });

  const events = useMemo(() => selectEventsFromInfinite(data), [data]);
  const { favoriteEvents } = useFavoriteEvents();

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
          placeholder={t("home.searchEvents")}
          value={keyword}
          onChangeText={setKeyword}
          style={styles.search}
          icon="magnify"
          iconColor={theme.colors.primary}
        />
        <Searchbar
          placeholder={t("home.searchCity")}
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
          {t("home.featured")}
        </Text>
        {favoriteEvents.length > 0 && (
          <View style={styles.favoriteCount}>
            <MaterialCommunityIcons
              name="heart"
              size={16}
              color={MD3Colors.error50}
            />
            <Text variant="bodySmall" style={styles.favoriteCountText}>
              {t("home.savedCount", { count: favoriteEvents.length })}
            </Text>
          </View>
        )}
      </View>

      {status === "pending" && events.length === 0 ? (
        <ActivityIndicator
          color={MD3Colors.primary30}
          size="large"
          style={{ marginTop: 16 }}
        />
      ) : null}
      {status === "error" ? (
        <Text
          style={{
            color: theme.colors.error,
            marginHorizontal: 16,
            marginBottom: 8,
          }}
        >
          {(error as Error)?.message || "Failed to load"}
        </Text>
      ) : null}
      {status === "success" && events.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={{ opacity: 0.6, marginHorizontal: 16, marginBottom: 8 }}>
            {t("home.noResults")}
          </Text>
          {favoriteEvents.length > 0 && (
            <Text
              style={[
                styles.viewFavoritesLink,
                { color: theme.colors.primary },
              ]}
              onPress={() => router.push("/profile")}
            >
              {t("home.viewFavorites", { count: favoriteEvents.length })}
            </Text>
          )}
        </View>
      ) : null}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <EventCard item={item} />}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color={MD3Colors.primary30}
              size="large"
              style={{ marginVertical: 12 }}
            />
          ) : null
        }
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
  },
  search: { borderRadius: 14 },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { marginTop: 4 },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  favoriteCount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  favoriteCountText: {
    marginStart: 4,
  },
  noResultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  viewFavoritesLink: {
    marginTop: 8,
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
