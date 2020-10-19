import React from "react";
import { Icon } from "./Icon/Icon";
import "./List.css";

const DeleteButton: React.FC<{}> = () => (
  <button className="DeleteButton">
    <Icon name="delete" />
  </button>
);

export const List: React.FC<{}> = () => {
  const waypoints = [1, 2, 3, 4];
  return (
    <ul className="List">
      {waypoints.map((wp) => (
        <li className="List_item" key={wp}>
          <Icon name="draggable" className="List_item_grip" />
          <span>Waypoint {wp}</span>
          <DeleteButton />
        </li>
      ))}
    </ul>
  );
};
