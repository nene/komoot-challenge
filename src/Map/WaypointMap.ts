import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import * as Leaflet from "leaflet";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

export class WaypointMap {
  private map: Leaflet.Map;
  private waypoints: Leaflet.LatLng[];
  private polyline: Leaflet.Polyline;
  private markers: Leaflet.Marker[];

  constructor(id: string, waypoints: Leaflet.LatLng[]) {
    this.waypoints = [...waypoints];
    this.map = this.createMap(id);
    this.polyline = this.createPolyline(this.waypoints);
    this.markers = this.createMarkers(this.waypoints);
  }

  createMap(id: string): Leaflet.Map {
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
  }

  private createPolyline(waypoints: Leaflet.LatLng[]): Leaflet.Polyline {
    const polyline = Leaflet.polyline(waypoints);
    polyline.addTo(this.map);
    return polyline;
  }

  private createMarkers(waypoints: Leaflet.LatLng[]): Leaflet.Marker[] {
    const icon = Leaflet.icon({ iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [13, 40] });

    const markers: Leaflet.Marker[] = [];
    waypoints.forEach((pos, i) => {
      const marker = Leaflet.marker(pos, { icon, draggable: true });
      marker.on("move", () => this.updatePolyline(i, marker.getLatLng()));
      marker.addTo(this.map);
      markers.push(marker);
    });
    return markers;
  }

  private updatePolyline(index: number, pos: Leaflet.LatLng) {
    this.waypoints[index] = pos;
    this.polyline.setLatLngs(this.waypoints);
  }

  public updateWaypoints(waypoints: Leaflet.LatLng[]) {
    this.waypoints = [...waypoints];
    this.polyline.setLatLngs(this.waypoints);
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = this.createMarkers(this.waypoints);
  }
}
