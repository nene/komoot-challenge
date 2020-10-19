import React, { useCallback } from "react";
import "./ExtraDropZone.css";

export interface ExtraDropZoneProps {
  index: number;
  onMove: (oldIndex: number, newIndex: number) => void;
}

export const ExtraDropZone: React.FC<ExtraDropZoneProps> = ({ index, onMove }) => {
  const handleDragEnter = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.classList.add("ExtraDropZone-drop-target");
  }, []);
  const handleDragExit = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.currentTarget.classList.remove("ExtraDropZone-drop-target");
  }, []);
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  }, []);
  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLIElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove("ExtraDropZone-drop-target");
      const oldIndex = Number(event.dataTransfer.getData("text/plain"));
      onMove(oldIndex, index);
    },
    [index, onMove],
  );

  return (
    <li
      className="ExtraDropZone"
      onDragEnter={handleDragEnter}
      onDragExit={handleDragExit}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};
