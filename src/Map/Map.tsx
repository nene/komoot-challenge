import React, { useEffect, useState } from "react";
import "./Map.css";
import * as Leaflet from "leaflet";
import { WaypointMap } from "./WaypointMap";

export interface MapProps {
  waypoints: Leaflet.LatLng[];
}

export const Map: React.FC<MapProps> = ({ waypoints }) => {
  const [map, setMap] = useState<WaypointMap>();

  useEffect(() => {
    if (!map) {
      setMap(new WaypointMap("mapid", waypoints));
    }
  }, [map, setMap, waypoints]);

  useEffect(() => {
    if (map) {
      map.updateWaypoints(waypoints);
    }
  }, [map, waypoints]);

  return <div className="Map" id="mapid" />;
};
