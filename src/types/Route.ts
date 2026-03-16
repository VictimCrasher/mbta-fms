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