import React from "react";
import { Icon } from "../Icon/Icon";
import "./DeleteButton.css";

export const DeleteButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="DeleteButton" onClick={onClick}>
    <Icon name="delete" />
  </button>
);
