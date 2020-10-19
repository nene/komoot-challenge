import React from "react";
import { Icon } from "./Icon/Icon";
import "./List.css";

const DeleteButton: React.FC<{}> = () => (
  <button className="DeleteButton">
    <Icon name="delete" />
  </button>
);

const Waypoint: React.FC<{ nr: number }> = ({ nr }) => (
  <li className="Waypoint">
    <Icon name="draggable" className="Waypoint_grip" />
    <span>Waypoint {nr}</span>
    <DeleteButton />
  </li>
);

export const List: React.FC<{}> = () => {
  const waypoints = [1, 2, 3, 4];
  return (
    <ul className="List">
      {waypoints.map((wp) => (
        <Waypoint key={wp} nr={wp} />
      ))}
    </ul>
  );
};
