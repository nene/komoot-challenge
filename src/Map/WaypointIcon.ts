import * as Leaflet from "leaflet";
import "./WaypointIcon.css";

export const createWaypointIcon = (index: number, selected: boolean): Leaflet.DivIcon => {
  // TODO: Use classnames helper
  const className = ["WaypointIcon", selected ? "WaypointIcon--selected" : ""].join(" ");
  return Leaflet.divIcon({ html: `${index + 1}`, className, iconSize: [25, 25] });
};
