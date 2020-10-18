import React from "react";
import { Icon } from "./Icon/Icon";
import "./List.css";

export const List: React.FC<{}> = () => {
  const waypoints = [1, 2, 3, 4];
  return (
    <ul className="List">
      {waypoints.map((wp) => (
        <li className="List_item" key={wp}>
          <Icon name="draggable" />
          <span>Waypoint {wp}</span>
          <Icon name="delete" />
        </li>
      ))}
    </ul>
  );
};
