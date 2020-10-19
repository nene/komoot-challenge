import React from "react";
import "./App.css";
import { DownloadButton } from "./DownloadButton";
import { WaypointList } from "./WaypointList";
import { Map } from "./Map";

export const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <div className="App_sidebar">
        <h1 className="App_title">Route Builder</h1>
        <WaypointList />
        <DownloadButton />
      </div>
      <div className="App_map_area">
        <Map />
      </div>
    </div>
  );
};
