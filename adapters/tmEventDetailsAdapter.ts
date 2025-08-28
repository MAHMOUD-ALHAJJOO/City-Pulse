import { pickImage } from "@/helpers";
import type { TMEvent } from "@/services/api/tm";

export type EventDetailsModel = {
  id: string;
  title: string;
  category?: string;
  venue?: string;
  city?: string;
  date?: string;
  time?: string;
  image?: string;
  about?: string;
  description?: string;
  organizer?: string;
  lat?: number;
  lng?: number;
};

export function adaptTMEventDetails(e: TMEvent): EventDetailsModel {
  const venue = e._embedded?.venues?.[0];
  const lat = venue?.location?.latitude
    ? Number(venue.location.latitude)
    : undefined;
  const lng = venue?.location?.longitude
    ? Number(venue.location.longitude)
    : undefined;

  return {
    id: e.id,
    title: e.name,
    category:
      e.classifications?.[0]?.genre?.name ??
      e.classifications?.[0]?.segment?.name ??
      undefined,
    venue: venue?.name ?? undefined,
    city: venue?.city?.name ?? undefined,
    date: e.dates?.start?.localDate ?? undefined,
    time: e.dates?.start?.localTime ?? undefined,
    image: pickImage(e.images),
    about: e.info ?? e.pleaseNote ??  e.description??undefined,
    organizer: e.promoter?.name ?? e.promoters?.[0]?.name ?? undefined,
    lat,
    lng,
  };
}
