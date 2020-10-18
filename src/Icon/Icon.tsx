import React from "react";
import "./Icon.css";

export const Icon: React.FC<{ name: "draggable" | "delete" }> = ({ name }) => {
  return <span className={"icon-" + name} />;
};
