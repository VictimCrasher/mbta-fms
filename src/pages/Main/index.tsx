import { useState } from "react";
import useGetVehicles from "@/utils/useGetVehicles";
import Alert from "@components/Alert";
import CardSkeleton from "@components/CardSkeleton";
import VehicleCard from "@components/VehicleCard";
import Pagination from "@components/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/types/Pages";
import type { Vehicle } from "@/types/Vehicle";
import VehicleDetailModal from "@components/VehicleDetailModal";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";

export default function MainPage() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
	const [detailVehicleId, setDetailVehicleId] = useState<string | null>(null);

	const { isLoading, data, error, totalPages, refetch } = useGetVehicles(page, pageSize);

	const onOpenDetail = (vehicle: Vehicle) => {
		setDetailVehicleId(vehicle.id);
	};

	return (
		<div>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold p-2">Your Fleet</h1>
				<button className="btn btn-primary" onClick={refetch}>
					<ArrowClockwiseIcon size={16} />
					<span>Refresh</span>
				</button>
			</div>
			{detailVehicleId && (
				<VehicleDetailModal vehicleId={detailVehicleId} onClose={() => setDetailVehicleId(null)} />
			)}
			{error && <Alert message={error.message || "An error occurred"} type="error" />}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-2">
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
			/>
		</div>
	);
}
