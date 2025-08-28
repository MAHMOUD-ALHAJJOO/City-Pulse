import { api } from "./client";

export type TMEvent = {
  id: string;
  name: string;
  info?: string;
  pleaseNote?: string;
  description?: string;
  images?: { url: string; width: number; height: number }[];
  dates?: { start?: { localDate?: string; localTime?: string } };
  classifications?: {
    segment?: { name?: string };
    genre?: { name?: string };
  }[];
  priceRanges?: { min?: number; max?: number; currency?: string }[];
  promoter?: { name?: string };
  promoters?: { name?: string }[];
  _embedded?: {
    venues?: {
      name?: string;
      city?: { name?: string };
      location?: { latitude?: string; longitude?: string };
    }[];
  };
};

export type TMSearchResponse = {
  page: {
    number: number;
    totalPages: number;
    totalElements: number;
    size: number;
  };
  _embedded?: { events?: TMEvent[] };
};

const DEFAULT_FROM_2025 = "2025-01-01T00:00:00Z";
const DEFAULT_END_2035 = "2035-01-01T00:00:00Z";

const toTmISO = (d?: Date | string) => {
  if (!d) return undefined;
  const iso = (typeof d === "string" ? new Date(d) : d).toISOString();
  return iso.replace(/\.\d{3}Z$/, "Z");
};

export async function searchEventsPage(params: {
  keyword?: string;
  city?: string;
  page?: number;
  size?: number;
  signal?: AbortSignal;
  startDateTime?: Date | string;
  endDateTime?: Date | string;
}) {
  const {
    keyword,
    city,
    page = 0,
    size = 10,
    signal,
    startDateTime = DEFAULT_FROM_2025,
    endDateTime = DEFAULT_END_2035,
  } = params;

  const res = await api.get("/events.json", {
    params: {
      keyword,
      city,
      page,
      size,
      sort: "date,asc",
      startDateTime: toTmISO(startDateTime),
      endDateTime: toTmISO(endDateTime),
    },
    signal,
  });

  return res.data as {
    page: {
      number: number;
      totalPages: number;
      totalElements: number;
      size: number;
    };
    _embedded?: { events?: any[] };
  };
}

export async function fetchEventById(
  id: string,
  opts?: { signal?: AbortSignal }
) {
  const res = await api.get<TMEvent>(`/events/${id}.json`, {
    signal: opts?.signal,
  });
  return res.data;
}
