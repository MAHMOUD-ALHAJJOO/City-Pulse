import { fetchEventById, TMEvent } from "@/services/api/ticketmasterApi";
import { useQuery } from "@tanstack/react-query";

export function useEventDetails(id?: string) {
  return useQuery<TMEvent, Error>({
    queryKey: ["events", "detail", id],
    queryFn: ({ signal }) => fetchEventById(id!, { signal }),
    enabled: !!id,
    staleTime: 60_000,
  });
}