import useGetVehicle from "@/utils/useGetVehicle";
import Alert from "./Alert";
import {
	OCCUPANCY_STATUS_LABELS,
	REVENUE_STATUS_LABELS,
	UNKNOWN_STATUS_LABEL,
	VEHICLE_STATUS_LABELS,
	type IncludedData,
} from "@/types/Vehicle";
import {
	ArrowClockwiseIcon,
	ArticleIcon,
	BusIcon,
	FlagCheckeredIcon,
	MapPinIcon,
	MoneyIcon,
	ShuffleAngularIcon,
	UsersFourIcon,
} from "@phosphor-icons/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { TripAttributes } from "@/types/Trip";
import Header from "./Header";
import type { RouteAttributes } from "@/types/Route";

interface VehicleDetailModalProps {
	vehicleId: string;
	onClose: () => void;
}

export default function VehicleDetailModal({ vehicleId, onClose }: VehicleDetailModalProps) {
	const { isLoading, data, included, error, refetch } = useGetVehicle(vehicleId);

	const renderCloseButton = (isBackdrop: boolean = false) => {
		return (
			<form method="dialog" className={isBackdrop ? "modal-backdrop" : ""}>
				<button className={isBackdrop ? "" : "btn btn-secondary"} onClick={onClose}>
					Close
				</button>
			</form>
		);
	};

	const renderItem = (icon: React.ReactNode, label: string, value: string, color?: string) => {
		return (
			<div className="flex items-center gap-2">
				{icon}
				<div className="flex flex-col">
					<span className="text-sm font-bold">{label}</span>
					<span className={`text-xs ${color}`}>{value}</span>
				</div>
			</div>
		);
	};

	if (isLoading)
		return (
			<dialog className="modal" open>
				<div className="modal-box flex flex-col gap-4 justify-center items-center">
					<span className="loading loading-infinity loading-2xl"></span>
				</div>
				{renderCloseButton(true)}
			</dialog>
		);

	if (!data)
		return (
			<dialog className="modal" open>
				<div className="modal-box flex flex-col gap-4 justify-center items-center">
					<Alert message="No vehicle data found" type="error" />
					{renderCloseButton()}
				</div>
				{renderCloseButton(true)}
			</dialog>
		);

	const currentStatus = VEHICLE_STATUS_LABELS[data.attributes.current_status] || UNKNOWN_STATUS_LABEL;
	const occupancyStatus = OCCUPANCY_STATUS_LABELS[data.attributes.occupancy_status] || UNKNOWN_STATUS_LABEL;
	const revenueStatus = REVENUE_STATUS_LABELS[data.attributes.revenue_status] || UNKNOWN_STATUS_LABEL;
	const tripData = included.find((item: IncludedData) => item.type === "trip")?.attributes as TripAttributes;
	const routeData = included.find((item: IncludedData) => item.type === "route")?.attributes as RouteAttributes;

	return (
		<dialog className="modal" open>
			{error ? (
				<div className="modal-box flex flex-col gap-4 justify-center items-center">
					<Alert message={error.message || "An error occurred"} type="error" />
					{renderCloseButton()}
				</div>
			) : data ? (
				<div className="modal-box max-w-[90vw] h-[75vh] flex flex-col md:flex-row gap-4">
					<div className="flex flex-col gap-4 md:border-r border-base-300 border-dashed pr-4 w-full md:w-1/3">
						<div className="flex flex-col gap-1 border-b border-base-300 border-dashed pb-4">
							<div className="flex items-center gap-2">
								<h1 className="text-2xl font-bold">{data.attributes.label}</h1>
								<span className={`text-xs ${currentStatus.backgroundColor} p-1 px-2 w-fit rounded-md`}>
									{currentStatus.label}
								</span>
							</div>
							<div className="flex text-xs text-gray-500">
								<strong>Last updated:&nbsp;</strong>
								<p>{`${new Date(data.attributes.updated_at).toLocaleString()}`}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 min-h-0 overflow-y-auto">
							<Header name="Vehicle Information" withBorder />

							{renderItem(
								<UsersFourIcon size={24} weight="duotone" />,
								"Occupancy status",
								occupancyStatus.label,
								occupancyStatus.color,
							)}
							{renderItem(
								<MapPinIcon size={24} weight="duotone" />,
								"Location",
								`${data.attributes.latitude.toFixed(6)}, ${data.attributes.longitude.toFixed(6)}`,
							)}
							{renderItem(
								<MoneyIcon size={24} weight="duotone" />,
								"Revenue status",
								revenueStatus.label,
								revenueStatus.color,
							)}

							{/* Route Information */}
							<Header name="Route Information" withBorder />
							{renderItem(
								<ShuffleAngularIcon size={24} />,
								"Route Name",
								`${routeData.long_name} (${routeData.short_name})`,
							)}
							{renderItem(
								<ArticleIcon size={24} />,
								"Description",
								routeData.description || "No description available",
							)}
							{renderItem(
								<FlagCheckeredIcon size={24} />,
								"Directions",
								routeData.direction_destinations.join(", "),
							)}

							{/* Trip Information */}
							<Header name="Trip Information" withBorder />
							{renderItem(
								<BusIcon size={24} weight="duotone" />,
								"Trip name",
								tripData.name || tripData.headsign || "Unknown",
							)}
						</div>

						<div className="mt-auto flex flex-col md:flex-row items-center gap-2">
							<button className="btn btn-primary" onClick={refetch}>
								<ArrowClockwiseIcon size={16} />
								<span>Refresh</span>
							</button>
							{renderCloseButton()}
						</div>
					</div>
					{/* Map Container */}
					<div className="w-full h-full flex flex-col gap-2">
						<h2 className="text-lg font-bold">Current Location</h2>
						<MapContainer
							center={[data.attributes.latitude, data.attributes.longitude]}
							zoom={15}
							style={{ width: "100%", height: "100%" }}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={[data.attributes.latitude, data.attributes.longitude]}>
								<Popup>
									<div className="flex flex-col gap-1">
										<h3 className="text-sm font-bold">{data.attributes.label}</h3>
										<span className="text-xs text-gray-500">Current location</span>
									</div>
								</Popup>
							</Marker>
						</MapContainer>
					</div>
				</div>
			) : (
				<div className="modal-box flex flex-col gap-4 justify-center items-center">
					<Alert message="No vehicle data found" type="error" />
					{renderCloseButton()}
				</div>
			)}
			{renderCloseButton(true)}
		</dialog>
	);
}
