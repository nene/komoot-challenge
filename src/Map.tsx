import React, { useEffect } from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import * as Leaflet from "leaflet";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION: Leaflet.LatLngExpression = [58.3728214, 21.8631477];

export const Map: React.FC<{}> = () => {
  useEffect(() => {
    const mymap = Leaflet.map("mapid").setView(INITIAL_POSITION, 12);
    Leaflet.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "pk.eyJ1IjoicmVua3UiLCJhIjoiY2tnZmVzZGdtMHB6MDJzbmFoMmRzdms2eCJ9.lStxev2R9jj1QV-MvNRFtQ",
    }).addTo(mymap);

    const positions: Leaflet.LatLngExpression[] = [
      [58.372, 21.863],
      [58.379, 21.869],
      [58.386, 21.829],
    ];
    Leaflet.polyline(positions).addTo(mymap);

    const icon = Leaflet.icon({ iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [13, 40] });

    positions.forEach((pos) => {
      Leaflet.marker(pos, { icon }).addTo(mymap);
    });
  });

  return <div className="Map" id="mapid" />;
};
