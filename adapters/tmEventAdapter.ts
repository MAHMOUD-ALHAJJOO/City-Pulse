import type { Event } from "@/components/EventCard";
import { pickImage } from "@/helpers";
import type { TMEvent, TMSearchResponse } from "@/services/api/tm";
import type { InfiniteData } from "@tanstack/react-query";

export function adaptTMEvent(e: TMEvent): Event {
  return {
    id: e.id,
    title: e.name,
    venue: e._embedded?.venues?.[0]?.name || "",
    date: e.dates?.start?.localDate || "",
    time: e.dates?.start?.localTime || "",
    attendees: Math.floor(Math.random() * 100) + 1,
    image: pickImage(e.images),
  };
}

export function selectEventsFromInfinite(
  data: InfiniteData<TMSearchResponse> | undefined
): Event[] {
  if (!data?.pages?.length) return [];
  const raw = data.pages.flatMap((p) => p._embedded?.events ?? []);
  return raw.map(adaptTMEvent);
}
