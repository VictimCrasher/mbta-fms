import { useMemo } from "react";
import useGetRoutes from "@/utils/useGetRoutes";
import useGetTrips from "@/utils/useGetTrips";
import MultiSelectDropdown, { type Option } from "@components/MultiSelectDropdown";

interface MainFiltersProps {
	selectedRouteIds: string[];
	selectedTripIds: string[];
	onRouteChange: (values: string[]) => void;
	onTripChange: (values: string[]) => void;
}

export default function MainFilters({
	selectedRouteIds,
	selectedTripIds,
	onRouteChange,
	onTripChange,
}: MainFiltersProps) {
	const {
		items: routes,
		isLoading: routesLoading,
		hasMore: routesHasMore,
		loadMore: loadMoreRoutes,
		error: routesError,
	} = useGetRoutes();
	const {
		items: trips,
		isLoading: tripsLoading,
		hasMore: tripsHasMore,
		loadMore: loadMoreTrips,
		error: tripsError,
	} = useGetTrips(selectedRouteIds);

	const routeOptions: Option[] = useMemo(() => {
		const routeOptions = routes.map((r) => ({
			value: r.id,
			label: r.attributes.long_name || r.attributes.short_name || r.id,
		}));
		// Check unique values
		const uniqueRouteOptions = routeOptions.filter(
			(r, index, self) => self.findIndex((r2) => r2.value === r.value) === index,
		);
		return uniqueRouteOptions;
	}, [routes]);

	const tripOptions: Option[] = useMemo(() => {
		return trips.map((t) => {
			const headsign = t.attributes.headsign || "(No headsign)";
			const name = t.attributes.name;
			const tripID = t.id;
			let label = headsign;
			if (name) {
				label += ` (${name})`;
			}
			return { value: t.id, label, subtitle: `ID: ${tripID}` };
		});
	}, [trips]);

	return (
		<div className="card bg-base-200 w-full flex flex-col border-2 border-base-300 shadow-md mb-4">
			<div className="flex flex-col gap-1 p-4 border-b border-base-300 border-dashed">
				<h2 className="text-xl font-bold text-accent">Filters</h2>
			</div>
			<div className="flex flex-wrap md:flex-nowrap gap-4 p-4 items-end">
				<MultiSelectDropdown
					label="Route"
					placeholder="All routes"
					options={routeOptions}
					selectedValues={selectedRouteIds}
					onChange={onRouteChange}
					hasMore={routesHasMore}
					onLoadMore={loadMoreRoutes}
					isLoading={routesLoading}
          customNoOptionsLabel={routesError ? routesError.message : "No routes found"}
				/>
				<MultiSelectDropdown
					label="Trip"
					placeholder="All trips"
					options={tripOptions}
					selectedValues={selectedTripIds}
					onChange={onTripChange}
					hasMore={tripsHasMore}
					onLoadMore={loadMoreTrips}
					isLoading={tripsLoading}
					customNoOptionsLabel={tripsError ? tripsError.message : "Please select a route first"}
				/>
			</div>
		</div>
	);
}
