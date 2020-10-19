import React, { useCallback } from "react";
import * as Leaflet from "leaflet";
import { Icon } from "./Icon/Icon";
import { deleteAt, moveIndex } from "./immutable-utils";
import "./WaypointList.css";

const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="DeleteButton" onClick={onClick}>
    <Icon name="delete" />
  </button>
);

export interface WaypointListItemProps {
  index: number;
  onDelete: (index: number) => void;
  onMove: (oldIndex: number, newIndex: number) => void;
}

const WaypointListItem: React.FC<WaypointListItemProps> = ({ index, onDelete, onMove }) => {
  const handleDelete = useCallback(() => onDelete(index), [index, onDelete]);
  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("text/plain", String(index));
    },
    [index],
  );
  const handleDragEnter = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.classList.add("WaypointListItem-drop-target");
  }, []);
  const handleDragExit = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.classList.remove("WaypointListItem-drop-target");
  }, []);
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove("WaypointListItem-drop-target");
      const newIndex = Number(event.dataTransfer.getData("text/plain"));
      onMove(index, newIndex);
    },
    [index, onMove],
  );

  return (
    <li
      className="WaypointListItem"
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragExit={handleDragExit}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
    </ul>
  );
};
