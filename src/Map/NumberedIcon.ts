import * as Leaflet from "leaflet";
import { classNames } from "../classNames";
import "./NumberedIcon.css";

export const createNumberedIcon = (index: number, selected: boolean): Leaflet.DivIcon => {
  return Leaflet.divIcon({
    html: `${index + 1}`,
    className: classNames({ NumberedIcon: true, "NumberedIcon--selected": selected }),
    iconSize: [25, 25],
  });
};
