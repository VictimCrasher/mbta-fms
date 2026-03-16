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
