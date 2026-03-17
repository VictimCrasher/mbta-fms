export type RouteAttributes = {
	type: 0 | 1 | 2 | 3 | 4;
	text_color: string;
	sort_order: number;
	short_name: string;
	long_name: string;
	listed_route: boolean;
	fare_class: string;
	direction_names: string[];
	direction_destinations: string[];
	description: string;
	color: string;
};

export type Route = {
	id: string;
	type: string;
	attributes: RouteAttributes;
	links?: { self: string };
	relationships?: object;
};

export type RouteLinks = {
	first: string | null;
	last: string | null;
	prev: string | null;
	next: string | null;
};

export type RouteResponse = {
	data: Route[];
	links?: RouteLinks;
	jsonapi?: { version: string };
};

export const ROUTE_TYPE_LABELS = {
	0: "Light Rail",
	1: "Heavy Rail",
	2: "Commuter Rail",
	3: "Bus",
	4: "Ferry",
};