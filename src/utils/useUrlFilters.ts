import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "@/types/Pages";

export interface UrlFiltersState {
	page: number;
	pageSize: number;
	routeIds: string[];
	tripIds: string[];
}

const DEFAULT_STATE: UrlFiltersState = {
	page: 1,
	pageSize: DEFAULT_PAGE_SIZE,
	routeIds: [],
	tripIds: [],
};

/** Max page number to avoid huge offsets sent to the API. */
const MAX_PAGE = 10_000;
/** Max number of route/trip IDs to accept from the URL (abuse / long URLs). */
const MAX_IDS = 100;
/** Only allow IDs that look like API identifiers (alphanumeric, hyphen, underscore). */
const SAFE_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

function sanitizeIdList(raw: string[], maxLength: number): string[] {
	const trimmed = raw
		.map((s) => s.trim())
		.filter(Boolean)
		.filter((id) => SAFE_ID_REGEX.test(id));
	const unique = [...new Set(trimmed)];
	return unique.slice(0, maxLength);
}

function parseSearchParams(search: string): UrlFiltersState {
	const params = new URLSearchParams(search);

	const pageRaw = parseInt(params.get("page") ?? "1", 10);
	const page = Number.isNaN(pageRaw) ? 1 : Math.max(1, Math.min(MAX_PAGE, pageRaw));

	const pageSizeParam = params.get("pageSize");
	const pageSize =
		pageSizeParam != null && PAGE_SIZE_OPTIONS.includes(Number(pageSizeParam))
			? Number(pageSizeParam)
			: DEFAULT_PAGE_SIZE;

	const routesParam = params.get("routes");
	const routeIds = routesParam
		? sanitizeIdList(routesParam.split(","), MAX_IDS)
		: [];

	const tripsParam = params.get("trips");
	const tripIds = tripsParam
		? sanitizeIdList(tripsParam.split(","), MAX_IDS)
		: [];

	return { page, pageSize, routeIds, tripIds };
}

function stateToSearchString(state: UrlFiltersState): string {
	const params = new URLSearchParams();
	if (state.page > 1) params.set("page", String(state.page));
	if (state.pageSize !== DEFAULT_PAGE_SIZE) params.set("pageSize", String(state.pageSize));
	if (state.routeIds.length > 0) params.set("routes", state.routeIds.join(","));
	if (state.tripIds.length > 0) params.set("trips", state.tripIds.join(","));
	const qs = params.toString();
	return qs ? `?${qs}` : "";
}

function getInitialState(): UrlFiltersState {
	if (typeof window === "undefined") return DEFAULT_STATE;
	return parseSearchParams(window.location.search);
}

export default function useUrlFilters() {
	const [state, setState] = useState<UrlFiltersState>(getInitialState);

	const updateUrl = useCallback((next: UrlFiltersState) => {
		const url = `${window.location.pathname}${stateToSearchString(next)}${window.location.hash}`;
		window.history.replaceState(null, "", url);
	}, []);

	// Sync URL when state changes
	useEffect(() => {
		updateUrl(state);
	}, [state, updateUrl]);

	// Restore state on browser back/forward
	useEffect(() => {
		const onPopState = () => setState(parseSearchParams(window.location.search));
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	const setPage = useCallback((page: number) => {
		setState((prev) => ({ ...prev, page: Math.max(1, page) }));
	}, []);

	const setPageSize = useCallback((pageSize: number) => {
		setState((prev) => ({
			...prev,
			pageSize: PAGE_SIZE_OPTIONS.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE,
			page: 1,
		}));
	}, []);

	const setRouteIds = useCallback((routeIds: string[]) => {
		setState((prev) => ({
			...prev,
			routeIds: sanitizeIdList(routeIds, MAX_IDS),
			tripIds: [],
			page: 1,
		}));
	}, []);

	const setTripIds = useCallback((tripIds: string[]) => {
		setState((prev) => ({
			...prev,
			tripIds: sanitizeIdList(tripIds, MAX_IDS),
			page: 1,
		}));
	}, []);

	return useMemo(
		() => ({
			...state,
			setPage,
			setPageSize,
			setRouteIds,
			setTripIds,
		}),
		[state, setPage, setPageSize, setRouteIds, setTripIds],
	);
}
