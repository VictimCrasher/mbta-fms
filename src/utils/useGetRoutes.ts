import { useEffect, useRef, useState } from "react";
import { apiGet } from "./fetch";
import type { Route, RouteResponse } from "@/types/Route";
import { parseOffsetFromUrl } from ".";

const PAGE_SIZE = 20;

export default function useGetRoutes() {
	const [items, setItems] = useState<Route[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const nextUrlRef = useRef<string | null>(null);
	const isLoadingRef = useRef(false);

	const loadRoutes = async () => {
		if (isLoadingRef.current || !hasMore) return;
		isLoadingRef.current = true;
		setIsLoading(true);
		setError(null);
		try {
			const params: Record<string, string | number> = {
				"page[limit]": PAGE_SIZE,
				"page[offset]": nextUrlRef.current ? (parseOffsetFromUrl(nextUrlRef.current) ?? items.length) : 0,
			};
			const response: RouteResponse = (await apiGet("routes", {
				params,
			})) as unknown as RouteResponse;
			setItems((prev) => {
				const existingIds = new Set(prev.map((r) => r.id));
				const newOnes = response.data.filter((r) => !existingIds.has(r.id));
				return prev.concat(newOnes);
			});
			const next = response.links?.next ?? null;
			nextUrlRef.current = next;
			setHasMore(!!next);
		} catch (err) {
			setError(err as Error);
		} finally {
			isLoadingRef.current = false;
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadRoutes();
		// eslint-disable-next-line
	}, []);

	const loadMore = async () => {
		await loadRoutes();
	};

	const refetch = async () => {
		setItems([]);
		nextUrlRef.current = null;
		setHasMore(true);
		setError(null);
		await loadRoutes();
	};

	return { items, isLoading, hasMore, error, loadMore, refetch };
}
