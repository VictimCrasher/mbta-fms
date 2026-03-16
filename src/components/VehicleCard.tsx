import { OCCUPANCY_STATUS_LABELS, UNKNOWN_STATUS_LABEL, VEHICLE_STATUS_LABELS, type Vehicle } from "@/types/Vehicle";
import { UsersFourIcon, MapPinIcon, EyeIcon } from "@phosphor-icons/react";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
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

	const currentStatus = VEHICLE_STATUS_LABELS[vehicle.attributes.current_status] || UNKNOWN_STATUS_LABEL;
	const occupancyStatus = OCCUPANCY_STATUS_LABELS[vehicle.attributes.occupancy_status] || UNKNOWN_STATUS_LABEL;

	return (
		<div className="card bg-base-200 w-full h-auto min-h-[250px] flex flex-col gap-2 border-2 border-base-300 shadow-md">
			<div className="flex flex-col gap-1 p-4 border-b border-base-300 border-dashed">
				<h2 className="text-2xl font-bold text-accent">{vehicle.attributes.label}</h2>
				<span className={`text-xs ${currentStatus.backgroundColor} p-1 w-fit rounded-md`}>
					{currentStatus.label}
				</span>
			</div>
			<div className="flex flex-col gap-2 px-4 py-2">
				{renderItem(
					<UsersFourIcon size={24} weight="duotone" />,
					"Occupancy status",
					occupancyStatus.label,
					occupancyStatus.color,
				)}
				{renderItem(
					<MapPinIcon size={24} weight="duotone" />,
					"Location",
					`${vehicle.attributes.latitude.toFixed(6)}, ${vehicle.attributes.longitude.toFixed(6)}`,
				)}
			</div>
			<div className="flex flex-col text-xs text-gray-500 px-4">
				<strong>Last updated:</strong>
				<p>{`${new Date(vehicle.attributes.updated_at).toLocaleString()}`}</p>
			</div>
			<div className="flex flex-col gap-2 p-4 pt-2">
				<button className="btn btn-primary bg-(--color-tertiary) text-(--color-tertiary-content) hover:bg-(--color-tertiary-content) hover:text-(--color-tertiary) w-full flex items-center gap-2 justify-center">
					<EyeIcon size={16} weight="duotone" />
					<span>View details</span>
				</button>
			</div>
		</div>
	);
}
