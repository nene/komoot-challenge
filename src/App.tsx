import React from 'react';
import './App.css';
import { DownloadButton } from './DownloadButton';
import { List } from './List';

const Map: React.FC<{}> = () => {
  return <div className="Map" />;
}

export const App: React.FC<{}> = () => {
  return (
    <div className="App">
      <div className="App_sidebar">
        <h1 className="App_title">Route Builder</h1>
        <List />
        <DownloadButton />
      </div>
      <div className="App_map_area">
        <Map />
      </div>
    </div>
  );
}
