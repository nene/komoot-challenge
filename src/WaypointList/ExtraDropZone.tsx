import React from "react";
import "./ExtraDropZone.css";
import { useDropZone } from "./useDropZone";

export interface ExtraDropZoneProps {
  index: number;
  onMove: (oldIndex: number, newIndex: number) => void;
}

export const ExtraDropZone: React.FC<ExtraDropZoneProps> = ({ index, onMove }) => {
  const dropHandlers = useDropZone({ className: "ExtraDropZone-drop-target", index, onMove });

  return <li className="ExtraDropZone" {...dropHandlers} />;
};
