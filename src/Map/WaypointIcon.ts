import * as Leaflet from "leaflet";
import { classNames } from "../classNames";
import "./WaypointIcon.css";

export const createWaypointIcon = (index: number, selected: boolean): Leaflet.DivIcon => {
  return Leaflet.divIcon({
    html: `${index + 1}`,
    className: classNames({ WaypointIcon: true, "WaypointIcon--selected": selected }),
    iconSize: [25, 25],
  });
};
