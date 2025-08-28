## Live Links

### Mobile Builds
- [Download Android APK](https://expo.dev/accounts/alhajjomahmoud/projects/city-pulse/builds/34446d09-6539-4309-84e2-119ae48748fe)  

### Video Demos
- [iOS Demo](https://drive.google.com/file/d/15yKRDMPEks8AE7X74ajq-bplx464wXDk/view?usp=sharing)

- [Android Demo](https://drive.google.com/file/d/15xoXA4dBvoqDCgxFNCWKX4YKO_dlZhxf/view?usp=sharing)  

## Important Note ⚠️

Arabic language and RTL support are **only available in the Android APK build**.  
To test this feature, please download and install the APK from the following link:  
[Download Android APK](https://expo.dev/accounts/alhajjomahmoud/projects/city-pulse/builds/34446d09-6539-4309-84e2-119ae48748fe)

If you run the app in **development mode** (using Expo Go), Arabic and RTL **will not be supported**.  
This is because **Expo Go does not support custom fonts or RTL**, so the feature will appear disabled in that environment.

# City Pulse

Cross-platform mobile app: Discover local events with search, favorites, dark mode, and bilingual support (English/Arabic + RTL). Built with Expo Router, React Native Paper, React Query, and Zustand.

## Tech Stack
- Expo 53 + Expo Router 5
- React Native 0.79, React 19
- React Native Paper (Material 3)
- @tanstack/react-query
- Zustand (+ AsyncStorage)
- Axios

## Folder Structure (concise)
```
app/                     # Expo Router routes (thin wrappers)
  _layout.tsx
  index.tsx              # Home
  profile.tsx            # Profile
  event/[id].tsx         # Event details

screens/                 # Feature UI + local logic
  home/
    components/          # EventCard, HomeHeader
    adapters/            # tmEventAdapter.ts
    hooks/               # useEventsSearch.ts
    index.tsx            # HomeScreen
  event-details/
    adapters/            # tmEventDetailsAdapter.ts
    hooks/               # useEventDetails.ts
    index.tsx            # EventDetailsScreen
  profile/
    components/          # SavedEventCard
    index.tsx            # ProfileScreen

services/api/            # Provider-specific API
  client.ts              # Axios base (uses EXPO_PUBLIC_TM_KEY or a built-in default)
  ticketmasterApi.ts     # Ticketmaster Discovery API helpers

shared/                  # Reusable building blocks
  hooks/                 # useAppTheme, useRTL, useDebouncedValue
  i18n/                  # useI18n + locales (en/ar)
  store/                 # useFavoriteEvents, useSettings
  ui/                    # Header
  utils/                 # queryClient, helpers

assets/
  fonts/                 # Montserrat*, DINNextLTArabic*
  images/                # icons & splash
```

## Setup
1) Prerequisites
- Node.js 18+ and npm
- Xcode (macOS) and/or Android Studio if using simulators
- Ticketmaster API key (optional, see below)

2) Install dependencies
```
npm install
```

3) Environment (optional)
- The client includes a default Ticketmaster API key, so you can run without any env setup.
- To use your own key, create a `.env` file at the project root:
```
EXPO_PUBLIC_TM_KEY=YOUR_TICKETMASTER_KEY
```

4) Start the app (Metro bundler)
```
npx expo start
```
- Press `a` for Android, `i` for iOS, or `w` for web.
- Or scan the QR with Expo Go / a dev client on device.

5) Optional: Run a development build (dev client)
```
expo run:android   # or: expo run:ios
```
Then use `npx expo start` to connect to the dev client.

6) EAS builds (optional)
```
npx eas build -p android --profile development   # APK dev build
npx eas build -p android --profile preview       # Internal preview
```

## Run Scripts
- `npm start` → `expo start`
- `npm run android` / `npm run ios` / `npm run web`
- `npm run lint`

## Features
- Search events by keyword and city (infinite scroll + pull-to-refresh)
- Event details: cover image, about/organizer, open-in-maps directions
- Favorites: add/remove and clear-all (persisted in AsyncStorage)
- Light/Dark theme toggle
- i18n (EN/AR) with RTL; language toggle reloads UI for layout direction
- Custom fonts: Montserrat (EN), DINNextLTArabic (AR)

## Assumptions
- Ticketmaster Discovery API is the single data provider.
- `services/api/client.ts` falls back to a built-in API key if `EXPO_PUBLIC_TM_KEY` is not set. You can override it via `.env`.
- Default search window is bounded in the API helper to reduce irrelevant results.
- Fonts are located under `assets/fonts/Montserrat` and `assets/fonts/DINNextLTArabic` and loaded in `shared/hooks/useAppTheme.ts`.
