import React from "react";
import "./Icon.css";

export const Icon: React.FC<{ name: "draggable" | "delete"; className?: string }> = ({ name, className = "" }) => {
  return <span className={"icon-" + name + " " + className} />;
};
