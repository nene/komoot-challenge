import React from "react";
import * as Leaflet from "leaflet";
import { Icon } from "./Icon/Icon";
import "./WaypointList.css";

const DeleteButton: React.FC<{}> = () => (
  <button className="DeleteButton">
    <Icon name="delete" />
  </button>
);

const WaypointListItem: React.FC<{ nr: number }> = ({ nr }) => (
  <li className="WaypointListItem">
    <Icon name="draggable" className="WaypointListItem_grip" />
    <span>Waypoint {nr}</span>
    <DeleteButton />
  </li>
);

export interface WaypointListProps {
  waypoints: Leaflet.LatLng[];
}

export const WaypointList: React.FC<WaypointListProps> = ({ waypoints }) => {
  return (
    <ul className="WaypointList">
      {waypoints.map((wp, i) => (
        <WaypointListItem key={i} nr={i + 1} />
      ))}
    </ul>
  );
};
