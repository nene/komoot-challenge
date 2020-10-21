/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import * as Leaflet from "leaflet";
import "./DownloadButton.css";
import { createGpx } from "./gpx";

export const DownloadButton: React.FC<{ waypoints: Leaflet.LatLng[] }> = ({ waypoints }) => {
  return (
    <a href={createXmlDataUrl(createGpx(waypoints))} className="DownloadButton" target="_blank" download="route.gpx">
      Download your Route
    </a>
  );
};

const createXmlDataUrl = (data: string): string => URL.createObjectURL(new Blob([data], { type: "application/xml" }));
