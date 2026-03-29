export interface RouteData {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  link: string;
  coordinates: [number, number]; // [lat, lng] for 2GIS API initialization
}
