import { useState } from "react";
import useGetVehicles from "@/utils/useGetVehicles";
import Alert from "@components/Alert";
import CardSkeleton from "./components/CardSkeleton";
import VehicleCard from "@components/VehicleCard";
import Pagination from "@components/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/types/Pages";

export default function MainPage() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

	const { isLoading, data, error, totalPages } = useGetVehicles(page, pageSize);

	return (
		<div>
			<h1 className="text-3xl font-bold p-2">Your Fleet</h1>
			{error && <Alert message={error.message || "An error occurred"} type="error" />}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-2">
				{isLoading && <CardSkeleton count={pageSize} />}
				{data.map((vehicle) => (
					<VehicleCard key={vehicle.id} vehicle={vehicle} />
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
