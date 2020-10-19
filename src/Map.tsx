import React, { useEffect } from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import * as Leaflet from "leaflet";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

const createMap = (id: string): Leaflet.Map => {
  const map = Leaflet.map(id).setView(INITIAL_POSITION, 12);
  Leaflet.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoicmVua3UiLCJhIjoiY2tnZmVzZGdtMHB6MDJzbmFoMmRzdms2eCJ9.lStxev2R9jj1QV-MvNRFtQ",
  }).addTo(map);
  return map;
};

export interface MapProps {
  waypoints: Leaflet.LatLng[];
}

export const Map: React.FC<MapProps> = ({ waypoints }) => {
  useEffect(() => {
    const mymap = createMap("mapid");

    const polyline = Leaflet.polyline(waypoints);
    polyline.addTo(mymap);

    const movePosition = (index: number, pos: Leaflet.LatLng) => {
      const latlngs = polyline.getLatLngs();
      latlngs[index] = pos;
      polyline.setLatLngs(latlngs);
    };

    const icon = Leaflet.icon({ iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [13, 40] });

    waypoints.forEach((pos, i) => {
      const marker = Leaflet.marker(pos, { icon, draggable: true });
      marker.on("move", () => movePosition(i, marker.getLatLng()));
      marker.addTo(mymap);
    });
  });

  return <div className="Map" id="mapid" />;
};
