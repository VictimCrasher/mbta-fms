import { useMemo, useState } from "react";
import useGetVehicles from "@/utils/useGetVehicles";
import Alert from "@components/Alert";
import CardSkeleton from "@components/CardSkeleton";
import VehicleCard from "@components/VehicleCard";
import Pagination from "@components/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/types/Pages";
import type { Vehicle } from "@/types/Vehicle";
import VehicleDetailModal from "@components/VehicleDetailModal";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import MainFilters from "./MainFilters";

export default function MainPage() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [detailVehicleId, setDetailVehicleId] = useState<string | null>(null);
	const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>([]);
	const [selectedTripIds, setSelectedTripIds] = useState<string[]>([]);

	const filters = useMemo(
		() => ({ routeIds: selectedRouteIds, tripIds: selectedTripIds }),
		[selectedRouteIds, selectedTripIds],
	);
	const { isLoading, data, error, totalPages, refetch } = useGetVehicles(page, pageSize, filters);

	const onOpenDetail = (vehicle: Vehicle) => {
		setDetailVehicleId(vehicle.id);
	};

	const onRouteChange = (values: string[]) => {
		setSelectedRouteIds(values);
		// Clear trip selection when routes change so we don't keep invalid trip IDs
		setSelectedTripIds([]);
		setPage(1);
	};

	const onTripChange = (values: string[]) => {
		setSelectedTripIds(values);
		setPage(1);
	};

	return (
		<div>
			<MainFilters
				selectedRouteIds={selectedRouteIds}
				selectedTripIds={selectedTripIds}
				onRouteChange={onRouteChange}
				onTripChange={onTripChange}
			/>
			<div className="flex justify-between items-center gap-2 p-2">
				<h1 className="text-3xl font-bold">Your Fleet</h1>
				<button className="btn btn-primary" onClick={refetch}>
					<ArrowClockwiseIcon size={16} />
					<span>Refresh</span>
				</button>
			</div>
			{detailVehicleId && (
				<VehicleDetailModal vehicleId={detailVehicleId} onClose={() => setDetailVehicleId(null)} />
			)}
			{error && <Alert message={error.message || "An error occurred"} type="error" />}
			{data.length === 0 && !isLoading && (
				<div className="flex justify-center items-center p-2">
					<Alert message="No vehicles found" type="info" />
				</div>
			)}
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
				{isLoading && <CardSkeleton count={pageSize} />}
				{data.map((vehicle) => (
					<VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => onOpenDetail(vehicle)} />
				))}
			</div>
			<Pagination
				page={page}
				pageSize={pageSize}
				totalPages={totalPages}
				setPage={setPage}
				setPageSize={setPageSize}
				disabled={isLoading}
			/>
		</div>
	);
}
