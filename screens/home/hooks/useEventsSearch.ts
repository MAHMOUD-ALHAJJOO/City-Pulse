import { searchEventsPage, TMSearchResponse } from "@/services/api/ticketmasterApi";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = { keyword?: string; city?: string; size?: number };

export function useEventsSearch({ keyword, city, size = 10 }: Params) {
  return useInfiniteQuery<TMSearchResponse, Error>({
    queryKey: ["events", "search", { keyword, city, size }],
    queryFn: ({ pageParam = 0, signal }) =>
      searchEventsPage({ keyword, city, page: pageParam as number, size, signal }),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      const cur = last.page.number;
      const total = last.page.totalPages;
      return cur + 1 < total ? cur + 1 : undefined;
    },
  });
}