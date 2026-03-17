import type { RevenueStatus } from "./Vehicle";

export type TripAttributes = {
	bikes_allowed: 0 | 1 | 2;
	wheelchair_accessible: 0 | 1 | 2;
	revenue_status: RevenueStatus;
	direction_id: number;
	block_id: string;
	headsign: string;
	name: string;
};

export type Trip = {
	id: string;
	type: string;
	attributes: TripAttributes;
	links?: { self: string };
	relationships?: { route?: { data: { id: string; type: string } } };
};

export type TripLinks = {
	first: string | null;
	last: string | null;
	prev: string | null;
	next: string | null;
};

export type TripResponse = {
	data: Trip[];
	links?: TripLinks;
	jsonapi?: { version: string };
};

export const WHEELCHAIR_ACCESSIBLE_LABELS = {
  0: {
    label: "No information available",
    color: "text-gray-500",
    backgroundColor: "bg-gray-500",
  },
  1: {
    label: "Wheelchair accessible",
    color: "text-green-500",
    backgroundColor: "bg-green-500",
  },
  2: {
    label: "Not wheelchair accessible",
    color: "text-red-500",
    backgroundColor: "bg-red-500",
  },
};

export const BIKES_ALLOWED_LABELS = {
  0: {
    label: "No information available",
    color: "text-gray-500",
    backgroundColor: "bg-gray-500",
  },
  1: {
    label: "Bikes allowed",
    color: "text-green-500",
    backgroundColor: "bg-green-500",
  },
  2: {
    label: "No bikes allowed",
    color: "text-red-500",
    backgroundColor: "bg-red-500",
  },
};
