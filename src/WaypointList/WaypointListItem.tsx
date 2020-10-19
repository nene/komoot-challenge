import React, { useCallback } from "react";
import { Icon } from "../Icon/Icon";
import "./WaypointListItem.css";
import { DeleteButton } from "./DeleteButton";
import { useDropZone } from "./useDropZone";

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
  const dropHandlers = useDropZone({ className: "WaypointListItem--target", index, onMove });

  return (
    <li className="WaypointListItem" draggable onDragStart={handleDragStart} {...dropHandlers}>
      <Icon name="draggable" className="WaypointListItem_grip" />
      <span>Waypoint {index + 1}</span>
      <DeleteButton onClick={handleDelete} />
    </li>
  );
};
