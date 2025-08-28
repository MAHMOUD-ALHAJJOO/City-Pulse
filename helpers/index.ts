import { Linking, Platform } from "react-native";

export function pickImage(
  images?: { url: string; width: number; height: number }[]
) {
  if (!images || images.length === 0) return "";
  const sorted = [...images].sort((a, b) => (a.width ?? 0) - (b.width ?? 0));
  const target =
    sorted.find((img) => (img.width ?? 0) >= 1024) ?? sorted[sorted.length - 1];
  return target?.url || "";
}

export function openDirections(lat: number, lng: number, label?: string) {
  const latLng = `${lat},${lng}`;
  const q = label ? encodeURIComponent(label) : "";
  if (Platform.OS === "ios") {
    // Apple Maps
    const url = `http://maps.apple.com/?daddr=${latLng}${q ? `&q=${q}` : ""}`;
    Linking.openURL(url);
  } else if (Platform.OS === "android") {
    // Google Maps app
    const url = `geo:${latLng}?q=${latLng}${q ? `(${q})` : ""}`;
    Linking.openURL(url);
  } else {
    // Web fallback
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latLng}${
      q ? `&destination_place_id=${q}` : ""
    }`;
    Linking.openURL(url);
  }
}
