import { useEffect, useState } from "react";
import { apiGet } from "./fetch";
import type { Vehicle, VehicleLinks, VehicleResponse } from "@/types/Vehicle";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default function useGetVehicles(page: number = DEFAULT_PAGE, pageSize: number = DEFAULT_PAGE_SIZE) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Vehicle[]>([]);
	const [links, setLinks] = useState<VehicleLinks | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState(0);

	const getVehicles = async (page: number = DEFAULT_PAGE, pageSize: number = DEFAULT_PAGE_SIZE) => {
		setIsLoading(true);
		setTotalPages(0);
		setData([]);
		setLinks(null);
		setError(null);
		try {
			const response: VehicleResponse = (await apiGet("vehicles", {
				params: {
					"page[offset]": (page - 1) * pageSize,
					"page[limit]": pageSize,
				},
			})) as unknown as VehicleResponse;
			setLinks(response.links);
			setData(response.data);
			// https://api-v3.mbta.com/vehicles?page[limit]=20&page[offset]=520
			const lastOffset = (response.links.last || "").split("page[offset]=")[1].split("&")[0];
			if (lastOffset) {
				setTotalPages(Math.ceil(Number(lastOffset) / pageSize) + 1);
			}
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getVehicles(page, pageSize);
	}, [page, pageSize]);

	const refetch = () => {
		getVehicles(page, pageSize);
	};

	return { isLoading, data, links, error, totalPages, refetch };
}
