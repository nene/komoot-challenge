import React, { useEffect, useRef, useState } from "react";
import "./Map.css";
import * as Leaflet from "leaflet";
import { MapController } from "./MapController";

export interface MapProps {
  waypoints: Leaflet.LatLng[];
}

export const Map: React.FC<MapProps> = ({ waypoints }) => {
  const [map, setMap] = useState<MapController>();

  const mapEl = useRef<HTMLDivElement>(null);

  // When DOM available and map not initialized
  useEffect(() => {
    if (!map && mapEl.current) {
      setMap(new MapController(mapEl.current.id));
    }
  }, [mapEl, map, setMap]);

  // When map initialized and waypoints changed
  useEffect(() => {
    if (map) {
      map.updateWaypoints(waypoints);
    }
  }, [map, waypoints]);

  return <div className="Map" id="mapid" ref={mapEl} />;
};
