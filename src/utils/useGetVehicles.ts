import { useEffect, useState } from "react";
import { apiGet } from "./fetch";
import type { Vehicle, VehicleLinks, VehicleResponse } from "@/types/Vehicle";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export type VehicleFilters = {
	routeIds: string[];
	tripIds: string[];
};

export default function useGetVehicles(
	page: number = DEFAULT_PAGE,
	pageSize: number = DEFAULT_PAGE_SIZE,
	filters: VehicleFilters = { routeIds: [], tripIds: [] }
) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Vehicle[]>([]);
	const [links, setLinks] = useState<VehicleLinks | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState(0);
	const getVehicles = async (
		pageNum: number = DEFAULT_PAGE,
		pageSizeNum: number = DEFAULT_PAGE_SIZE,
		f: VehicleFilters = { routeIds: [], tripIds: [] }
	) => {
		setIsLoading(true);
		setTotalPages(0);
		setData([]);
		setLinks(null);
		setError(null);
		try {
			const params: Record<string, string | number> = {
				"page[offset]": (pageNum - 1) * pageSizeNum,
				"page[limit]": pageSizeNum,
			};
			if (f.routeIds.length > 0) {
				params["filter[route]"] = f.routeIds.join(",");
			}
			if (f.tripIds.length > 0) {
				params["filter[trip]"] = f.tripIds.join(",");
			}
			const response: VehicleResponse = (await apiGet("vehicles", {
				params,
			})) as unknown as VehicleResponse;
			setLinks(response.links);
			setData(response.data ?? []);
			const lastLink = response.links?.last;
			if (lastLink) {
				const lastOffset = lastLink.split("page[offset]=")[1]?.split("&")[0];
				if (lastOffset) {
					setTotalPages(Math.ceil(Number(lastOffset) / pageSizeNum) + 1);
				}
			} else if ((response.data?.length ?? 0) < pageSizeNum) {
				setTotalPages(pageNum);
			}
		} catch (err) {
			setError(err as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const routeKey = filters.routeIds.join(",");
	const tripKey = filters.tripIds.join(",");
	useEffect(() => {
		getVehicles(page, pageSize, {
			routeIds: routeKey ? routeKey.split(",") : [],
			tripIds: tripKey ? tripKey.split(",") : [],
		});
	}, [page, pageSize, routeKey, tripKey]);

	const refetch = () => {
		getVehicles(page, pageSize, filters);
	};

	return { isLoading, data, links, error, totalPages, refetch };
}
