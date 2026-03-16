import { useEffect, useState } from "react";
import { apiGet } from "./fetch";
import type { IncludedData, Vehicle, VehicleDetailResponse } from "@/types/Vehicle";

export default function useGetVehicle(vehicleId: string) {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<Vehicle | null>(null);
	const [included, setIncluded] = useState<IncludedData[]>([]);
	const [error, setError] = useState<Error | null>(null);

	const getVehicle = async (vehicleId: string) => {
		setIsLoading(true);
		setData(null);
		setError(null);
		try {
			const response: VehicleDetailResponse = (await apiGet(`vehicles/${vehicleId}`, {
				params: {
					include: "trip,stop,route",
				},
			})) as unknown as VehicleDetailResponse;
			setData(response.data);
			setIncluded(response.included);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getVehicle(vehicleId);
	}, [vehicleId]);

	const refetch = () => {
		getVehicle(vehicleId);
	};

	return { isLoading, data, included, error, refetch };
}
