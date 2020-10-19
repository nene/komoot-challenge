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

  useEffect(() => {
    if (!map && mapEl.current) {
      setMap(new MapController(mapEl.current.id, waypoints));
    }
  }, [mapEl, map, setMap, waypoints]);

  useEffect(() => {
    if (map) {
      map.updateWaypoints(waypoints);
    }
  }, [map, waypoints]);

  return <div className="Map" id="mapid" ref={mapEl} />;
};
