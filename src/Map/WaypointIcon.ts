import * as Leaflet from "leaflet";
import "./WaypointIcon.css";

export const createWaypointIcon = (index: number): Leaflet.DivIcon => {
  return Leaflet.divIcon({ html: `${index + 1}`, className: "WaypointIcon", iconSize: [25, 25] });
};
