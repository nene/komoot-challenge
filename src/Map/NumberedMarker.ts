import * as Leaflet from "leaflet";

export interface NumberedMarkerConfig {
  latlng: Leaflet.LatLng;
  index: number;
  icon: Leaflet.Icon | Leaflet.DivIcon;
  onDrag: (index: number, latlng: Leaflet.LatLng) => void;
  onDragEnd: () => void;
  onSelectedIndexChange: (index?: number) => void;
}

export const createNumberedMarker = ({
  latlng,
  index,
  icon,
  onDrag,
  onDragEnd,
  onSelectedIndexChange,
}: NumberedMarkerConfig): Leaflet.Marker => {
  const marker = Leaflet.marker(latlng, {
    icon,
    draggable: true,
  });

  let activelyDragging = false;

  // While moving the marker, keep polyline and waypoints array in sync,
  // At the end of moving, fire onChange event.
  marker.on("dragstart", () => {
    activelyDragging = true;
  });
  marker.on("drag", () => {
    onDrag(index, marker.getLatLng());
  });
  marker.on("dragend", () => {
    onDragEnd();
    activelyDragging = false;
  });

  // Only fire selection change events when we aren't actively dragging.
  // Otherwise the selection change will trigger icon change,
  // which will result in cancelling of the drag.
  marker.on("mouseover", () => {
    if (!activelyDragging) {
      onSelectedIndexChange(index);
    }
  });
  marker.on("mouseout", () => {
    if (!activelyDragging) {
      onSelectedIndexChange(undefined);
    }
  });
  return marker;
};
