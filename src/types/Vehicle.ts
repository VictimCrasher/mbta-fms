export type RevenueStatus = "REVENUE" | "NON_REVENUE";
export type OccupancyStatus = "MANY_SEATS_AVAILABLE" | "FEW_SEATS_AVAILABLE" | "FULL" | "NO_DATA_AVAILABLE";
export type VehicleStatus = "INCOMING_AT" | "STOPPED_AT" | "IN_TRANSIT_TO";
export type DirectionId = 0 | 1;

export type IncludedData = {
	type: string;
	id: string;
	attributes: object;
};

export type Carriage = {
	occupancy_status: OccupancyStatus;
	occupancy_percentage: number;
	label: string;
};

export type VehicleLinks = {
	self: string;
	prev: string | null;
	next: string | null;
	last: string | null;
	first: string | null;
};

export type VehicleRelationship = {
	links?: {
		self: string;
		related: string;
	};
	data?: {
		id: string;
		type: string;
	};
};

export type VehicleRelationships = {
	trip: VehicleRelationship;
	stop: VehicleRelationship;
	route: VehicleRelationship;
};

export type Vehicle = {
	id: string;
	attributes: {
		updated_at: string;
		speed: number; // in m/s
		revenue_status: RevenueStatus;
		occupancy_status: OccupancyStatus;
		current_status: VehicleStatus;
		longitude: number;
		latitude: number;
		label: string;
		direction_id: DirectionId;
		carriages: Carriage[];
		bearing: number;
	};
	type: string;
	links: object;
	relationships: VehicleRelationships;
};

export type VehicleResponse = {
	data: Vehicle[];
	links: VehicleLinks;
	included: IncludedData[];
};

export type VehicleDetailResponse = {
	data: Vehicle;
	included: IncludedData[];
};

export type VehicleStatusLabel = {
	label: string;
	color: string;
	backgroundColor: string;
};

export const OCCUPANCY_STATUS_LABELS: Record<OccupancyStatus, VehicleStatusLabel> = {
	"MANY_SEATS_AVAILABLE": {
		label: "Many seats available",
		color: "text-green-500",
		backgroundColor: "bg-green-500",
	},
	"FEW_SEATS_AVAILABLE": {
		label: "Few seats available",
		color: "text-yellow-500",
		backgroundColor: "bg-yellow-500",
	},
	"FULL": {
		label: "Full",
		color: "text-red-500",
		backgroundColor: "bg-red-500",
	},
	"NO_DATA_AVAILABLE": {
		label: "No data available",
		color: "text-gray-500",
		backgroundColor: "bg-gray-500",
	},
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, VehicleStatusLabel> = {
	"INCOMING_AT": {
		label: "Arriving",
		color: "text-blue-300",
		backgroundColor: "bg-blue-300",
	},
	"STOPPED_AT": {
		label: "Standing at stop",
		color: "text-amber-500",
		backgroundColor: "bg-amber-500",
	},
	"IN_TRANSIT_TO": {
		label: "In Transit",
		color: "text-green-500",
		backgroundColor: "bg-green-500",
	},
};

export const REVENUE_STATUS_LABELS: Record<RevenueStatus, VehicleStatusLabel> = {
	"REVENUE": {
		label: "Accepting passengers",
		color: "text-green-500",
		backgroundColor: "bg-green-500",
	},
	"NON_REVENUE": {
		label: "Not accepting passengers",
		color: "text-red-500",
		backgroundColor: "bg-red-500",
	},
};

export const UNKNOWN_STATUS_LABEL: VehicleStatusLabel = {
	label: "Unknown",
	color: "text-gray-500",
	backgroundColor: "bg-gray-500",
};