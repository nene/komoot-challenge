import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import * as Leaflet from "leaflet";
import { MapController } from "./MapController";

export interface MapProps {
  waypoints: Leaflet.LatLng[];
  selectedIndex?: number;
  onChange: (waypoints: Leaflet.LatLng[]) => void;
}

export const Map: React.FC<MapProps> = ({ waypoints, selectedIndex, onChange }) => {
  const [map, setMap] = useState<MapController>();

  const mapEl = useRef<HTMLDivElement>(null);

  // When DOM available and map not initialized
  useEffect(() => {
    if (!map && mapEl.current) {
      setMap(new MapController(mapEl.current.id, { onChange }));
    }
  }, [mapEl, map, setMap, onChange]);

  // When map initialized and waypoints changed
  useEffect(() => {
    if (map) {
      map.updateWaypoints(waypoints);
    }
  }, [map, waypoints]);

  // When map initialized and selection changed
  useEffect(() => {
    if (map) {
      map.setSelected(selectedIndex);
    }
  }, [map, selectedIndex]);

  return <div className="Map" id="mapid" ref={mapEl} />;
};
