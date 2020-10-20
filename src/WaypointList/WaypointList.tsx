import React, { useCallback } from "react";
import * as Leaflet from "leaflet";
import { deleteAt, moveIndex } from "../immutable-utils";
import "./WaypointList.css";
import { WaypointListItem } from "./WaypointListItem";
import { ExtraDropZone } from "./ExtraDropZone";

export interface WaypointListProps {
  waypoints: Leaflet.LatLng[];
  selectedIndex?: number;
  onChange: (waypoints: Leaflet.LatLng[]) => void;
  onSelectedIndexChange: (index?: number) => void;
}

export const WaypointList: React.FC<WaypointListProps> = ({
  waypoints,
  selectedIndex,
  onChange,
  onSelectedIndexChange,
}) => {
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
        <WaypointListItem
          key={i}
          index={i}
          onDelete={onDelete}
          onMove={onMove}
          selected={i === selectedIndex}
          onSelectedIndexChange={onSelectedIndexChange}
        />
      ))}
      <ExtraDropZone index={waypoints.length} onMove={onMove} />
    </ul>
  );
};
