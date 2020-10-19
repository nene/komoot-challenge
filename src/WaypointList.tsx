import React, { useCallback } from "react";
import * as Leaflet from "leaflet";
import { Icon } from "./Icon/Icon";
import { deleteAt } from "./immutable-utils";
import "./WaypointList.css";

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="DeleteButton" onClick={onClick}>
    <Icon name="delete" />
  </button>
);

const WaypointListItem: React.FC<{ index: number; onDelete: (index: number) => void }> = ({ index, onDelete }) => {
  const handleDelete = useCallback(() => onDelete(index), [index, onDelete]);

  return (
    <li className="WaypointListItem">
      <Icon name="draggable" className="WaypointListItem_grip" />
      <span>Waypoint {index + 1}</span>
      <DeleteButton onClick={handleDelete} />
    </li>
  );
};

export interface WaypointListProps {
  waypoints: Leaflet.LatLng[];
  onChange: (waypoints: Leaflet.LatLng[]) => void;
}

export const WaypointList: React.FC<WaypointListProps> = ({ waypoints, onChange }) => {
  const onDelete = useCallback(
    (index: number) => {
      onChange(deleteAt(index, waypoints));
    },
    [waypoints, onChange],
  );

  return (
    <ul className="WaypointList">
      {waypoints.map((wp, i) => (
        <WaypointListItem key={i} index={i} onDelete={onDelete} />
      ))}
    </ul>
  );
};
