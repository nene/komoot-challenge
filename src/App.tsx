import React from "react";
import "./App.css";
import * as Leaflet from "leaflet";
import { DownloadButton } from "./DownloadButton";
import { WaypointList } from "./WaypointList";
import { Map } from "./Map";

const waypoints: Leaflet.LatLng[] = [
  new Leaflet.LatLng(58.372, 21.863),
  new Leaflet.LatLng(58.379, 21.869),
  new Leaflet.LatLng(58.386, 21.829),
];

export const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <div className="App_sidebar">
        <h1 className="App_title">Route Builder</h1>
        <WaypointList waypoints={waypoints} />
        <DownloadButton />
      </div>
      <div className="App_map_area">
        <Map waypoints={waypoints} />
      </div>
    </div>
  );
};
