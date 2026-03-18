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
	BicycleIcon,
	BracketsSquareIcon,
	BusIcon,
	FlagCheckeredIcon,
	HashIcon,
	MapPinIcon,
	MoneyIcon,
	ShuffleAngularIcon,
	TrafficSignIcon,
	UsersFourIcon,
	WheelchairIcon,
} from "@phosphor-icons/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { BIKES_ALLOWED_LABELS, WHEELCHAIR_ACCESSIBLE_LABELS, type TripAttributes } from "@/types/Trip";
import Header from "./Header";
import { ROUTE_TYPE_LABELS, type RouteAttributes } from "@/types/Route";
import moment from "moment";

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
					<span className="text-sm text-gray-500">Loading vehicle data...</span>
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

	const routeData = included.find((item: IncludedData) => item.type === "route")?.attributes as RouteAttributes;
	const tripData = included.find((item: IncludedData) => item.type === "trip")?.attributes as TripAttributes;

	const bikesAllowed = tripData
		? BIKES_ALLOWED_LABELS[tripData.bikes_allowed] || BIKES_ALLOWED_LABELS[0]
		: BIKES_ALLOWED_LABELS[0];
	const wheelchairAccessible = tripData
		? WHEELCHAIR_ACCESSIBLE_LABELS[tripData.wheelchair_accessible] || WHEELCHAIR_ACCESSIBLE_LABELS[0]
		: WHEELCHAIR_ACCESSIBLE_LABELS[0];

	const currentStatus = VEHICLE_STATUS_LABELS[data.attributes.current_status] || UNKNOWN_STATUS_LABEL;
	const occupancyStatus = OCCUPANCY_STATUS_LABELS[data.attributes.occupancy_status] || UNKNOWN_STATUS_LABEL;
	const revenueStatus = REVENUE_STATUS_LABELS[data.attributes.revenue] || UNKNOWN_STATUS_LABEL;

	const routeType = ROUTE_TYPE_LABELS[routeData.type] || "Unknown";
	const directionDestinations = (routeData.direction_destinations || []).filter((d) => d);

	const updatedAt = new Date(data.attributes.updated_at);
	const fromNow = moment(updatedAt).fromNow();

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
							<div className="flex flex-col text-xs text-gray-500">
								<strong>Last updated:&nbsp;</strong>
								<div className="flex flex-row items-center gap-1">
									<p>{`${moment(updatedAt).format("MMM D, YYYY h:mm:ss A")}`}</p>
									<p>{`(${fromNow})`}</p>
								</div>
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
								routeData.long_name || "Unknown",
							)}
							{renderItem(<HashIcon size={24} />, "Route Short Name", routeData.short_name || "Unknown")}
							{renderItem(<TrafficSignIcon size={24} />, "Route Type", routeType)}
							{renderItem(
								<ArticleIcon size={24} weight="duotone" />,
								"Description",
								routeData.description || "No description available",
							)}
							{directionDestinations.length > 0
								? renderItem(
										<FlagCheckeredIcon size={24} weight="duotone" />,
										"Directions",
										directionDestinations.join(" → "),
									)
								: null}

							{/* Trip Information */}
							<Header name="Trip Information" withBorder />
							{renderItem(
								<BusIcon size={24} weight="duotone" />,
								"Trip name",
								tripData?.name || "Unknown",
							)}
							{renderItem(
								<BracketsSquareIcon size={24} weight="duotone" />,
								"Headsign",
								tripData?.headsign || "Unknown",
							)}
							{renderItem(
								<BicycleIcon size={24} weight="duotone" />,
								"Bikes allowed?",
								bikesAllowed.label,
								bikesAllowed.color,
							)}
							{renderItem(
								<WheelchairIcon size={24} weight="duotone" />,
								"Wheelchair accessible?",
								wheelchairAccessible.label,
								wheelchairAccessible.color,
							)}
						</div>

						<div className="mt-auto flex flex-row items-center gap-2">
							<button
								className="btn btn-primary text-(--color-primary-content)"
								onClick={refetch}
								disabled={isLoading}
							>
								<ArrowClockwiseIcon size={16} />
								<span>{isLoading ? "Refreshing..." : "Refresh"}</span>
							</button>
							{renderCloseButton()}
						</div>
					</div>
					{/* Map Container */}
					<div className="w-full min-h-[50dvh] md:min-h-0 md:h-full flex flex-col gap-2">
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
