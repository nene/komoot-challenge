import React, { useCallback } from "react";
import * as Leaflet from "leaflet";
import { deleteAt, moveIndex } from "../immutable-utils";
import "./WaypointList.css";
import { WaypointListItem } from "./WaypointListItem";
import { ExtraDropZone } from "./ExtraDropZone";

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

  const onMove = useCallback(
    (oldIndex: number, newIndex: number) => {
      onChange(moveIndex(oldIndex, newIndex, waypoints));
    },
    [waypoints, onChange],
  );

  return (
    <ul className="WaypointList">
      {waypoints.map((wp, i) => (
        <WaypointListItem key={i} index={i} onDelete={onDelete} onMove={onMove} />
      ))}
      <ExtraDropZone index={waypoints.length} onMove={onMove} />
    </ul>
  );
};
