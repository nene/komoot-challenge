import React, { useState } from "react";
import "./App.css";
import * as Leaflet from "leaflet";
import { DownloadButton } from "./DownloadButton";
import { WaypointList } from "./WaypointList/WaypointList";
import { Map } from "./Map/Map";

const initialWaypoints: Leaflet.LatLng[] = [
  new Leaflet.LatLng(58.372, 21.863),
  new Leaflet.LatLng(58.379, 21.869),
  new Leaflet.LatLng(58.386, 21.829),
];

export const App: React.FC<{}> = () => {
  const [waypoints, setWaypoints] = useState(initialWaypoints);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

  return (
    <div className="App">
      <div className="App__sidebar">
        <h1 className="App__title">Route Builder</h1>
        <div className="App__list">
          <WaypointList waypoints={waypoints} onChange={setWaypoints} onSelectedIndexChange={setSelectedIndex} />
        </div>
        <DownloadButton waypoints={waypoints} />
      </div>
      <div className="App__mapArea">
        <Map waypoints={waypoints} selectedIndex={selectedIndex} onChange={setWaypoints} />
      </div>
    </div>
  );
};
