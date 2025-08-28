import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Event } from "@/components/EventCard";

type FavoriteEventsState = {
  favoriteEvents: Event[];
  addToFavorites: (event: Event) => void;
  removeFromFavorites: (eventId: string) => void;
  toggleFavorite: (event: Event) => void;
  isFavorite: (eventId: string) => boolean;
  clearAllFavorites: () => void;
};

export const useFavoriteEvents = create<FavoriteEventsState>()(
  persist(
    (set, get) => ({
      favoriteEvents: [],
      addToFavorites: (event: Event) => {
        const { favoriteEvents } = get();
        if (!favoriteEvents.find(e => e.id === event.id)) {
          set({ favoriteEvents: [...favoriteEvents, event] });
        }
      },
      removeFromFavorites: (eventId: string) => {
        const { favoriteEvents } = get();
        set({ 
          favoriteEvents: favoriteEvents.filter(e => e.id !== eventId) 
        });
      },
      toggleFavorite: (event: Event) => {
        const { favoriteEvents } = get();
        const isFavorite = favoriteEvents.find(e => e.id === event.id);
        
        if (isFavorite) {
          set({ 
            favoriteEvents: favoriteEvents.filter(e => e.id !== event.id) 
          });
        } else {
          set({ favoriteEvents: [...favoriteEvents, event] });
        }
      },
      isFavorite: (eventId: string) => {
        const { favoriteEvents } = get();
        return favoriteEvents.some(e => e.id === eventId);
      },
      clearAllFavorites: () => {
        set({ favoriteEvents: [] });
      },
    }),
    { 
      name: "favorite-events", 
      storage: createJSONStorage(() => AsyncStorage) 
    }
  )
);
