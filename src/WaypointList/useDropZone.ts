import { useCallback } from "react";

export interface DropZoneCfg {
  className: string;
  index: number;
  onMove: (fromIndex: number, toIndex: number) => void;
}

// Custom hook to share the drop-zone logic between normal WaypointListItems and additional ExtraDropZone in the end
export const useDropZone = ({ className, index, onMove }: DropZoneCfg) => {
  return {
    onDragEnter: useCallback(
      (event: React.DragEvent<HTMLLIElement>) => {
        event.currentTarget.classList.add(className);
      },
      [className],
    ),
    onDragExit: useCallback(
      (event: React.DragEvent<HTMLLIElement>) => {
        event.currentTarget.classList.remove(className);
      },
      [className],
    ),
    onDragOver: useCallback((event: React.DragEvent<HTMLLIElement>) => {
      event.preventDefault();
    }, []),
    onDrop: useCallback(
      (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove(className);
        const oldIndex = Number(event.dataTransfer.getData("text/plain"));
        onMove(oldIndex, index);
      },
      [index, onMove, className],
    ),
  };
};
