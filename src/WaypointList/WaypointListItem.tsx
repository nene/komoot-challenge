import React, { useCallback } from "react";
import { Icon } from "../Icon/Icon";
import "./WaypointListItem.css";
import { DeleteButton } from "./DeleteButton";

export interface WaypointListItemProps {
  index: number;
  onDelete: (index: number) => void;
  onMove: (oldIndex: number, newIndex: number) => void;
}

export const WaypointListItem: React.FC<WaypointListItemProps> = ({ index, onDelete, onMove }) => {
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
      const oldIndex = Number(event.dataTransfer.getData("text/plain"));
      onMove(oldIndex, index);
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
