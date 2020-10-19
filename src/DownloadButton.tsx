import React, { useCallback } from "react";
import * as Leaflet from "leaflet";
import "./DownloadButton.css";
import { createGpx } from "./gpx";

export const DownloadButton: React.FC<{ waypoints: Leaflet.LatLng[] }> = ({ waypoints }) => {
  const handleClick = useCallback(() => {
    console.log(createGpx(waypoints));
  }, [waypoints]);

  return (
    <button className="DownloadButton" onClick={handleClick}>
      Download your Route
    </button>
  );
};
