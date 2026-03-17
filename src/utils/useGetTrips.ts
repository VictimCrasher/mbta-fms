import { useEffect, useRef, useState } from "react";
import { apiGet } from "./fetch";
import type { Trip, TripResponse } from "@/types/Trip";
import { parseOffsetFromUrl } from ".";

const PAGE_SIZE = 20;

export default function useGetTrips(routeIds: string[]) {
	const [items, setItems] = useState<Trip[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const nextUrlRef = useRef<string | null>(null);
	const isLoadingRef = useRef(false);

	const loadTrips = async () => {
		if (isLoadingRef.current || !hasMore || routeIds.length === 0) return;
		isLoadingRef.current = true;
		setIsLoading(true);
		setError(null);
		try {
			const params: Record<string, string | number> = {
				"page[limit]": PAGE_SIZE,
				"page[offset]": nextUrlRef.current ? (parseOffsetFromUrl(nextUrlRef.current) ?? items.length) : 0,
			};
			if (routeIds.length > 0) {
				params["filter[route]"] = routeIds.join(",");
			}
			const response: TripResponse = (await apiGet("trips", {
				params,
			})) as unknown as TripResponse;
			setItems((prev) => {
				const existingIds = new Set(prev.map((t) => t.id));
				const newOnes = response.data.filter((t) => !existingIds.has(t.id));
				return prev.concat(newOnes);
			});
			const next = response.links?.next ?? null;
			nextUrlRef.current = next;
			setHasMore(!!next);
		} catch (err) {
			setError(err as Error);
			setHasMore(false);
		} finally {
			isLoadingRef.current = false;
			setIsLoading(false);
		}
	};

	const loadMore = async () => {
		await loadTrips();
	};

	const reset = () => {
		setItems([]);
		nextUrlRef.current = null;
		setHasMore(true);
		setError(null);
	};

	const refetch = async () => {
		reset();
		await loadTrips();
	};

	useEffect(() => {
		if (routeIds.length === 0) {
			reset();
			return;
		}
		loadTrips();
		// eslint-disable-next-line
	}, [routeIds]);

	return { items, isLoading, hasMore, error, loadMore, refetch };
}
