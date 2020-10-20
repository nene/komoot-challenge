import "leaflet/dist/leaflet.css";
import * as Leaflet from "leaflet";
import { createWaypointIcon } from "./WaypointIcon";
import { updateAt } from "../immutable-utils";
import { equalLatLngArrays } from "./equalLatLngArrays";
import { createWaypointMarker } from "./WaypointMarker";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

export interface MapControllerEvents {
  onChange: (waypoints: Leaflet.LatLng[]) => void;
  onSelectedIndexChange: (index?: number) => void;
}

export class MapController {
  private map: Leaflet.Map;

  // Don't mutate this, it's exposed externally
  private waypoints: Leaflet.LatLng[];
  // Can be mutated, only used internally
  private markers: Leaflet.Marker[];

  private polyline: Leaflet.Polyline;
  private selectedIndex?: number;
  private events: MapControllerEvents;

  constructor(id: string, events: MapControllerEvents) {
    this.map = this.createMap(id);
    // Start with empty map (no markers and zero-length polyline)
    this.waypoints = [];
    this.polyline = this.createPolyline(this.waypoints);
    this.markers = this.createMarkers(this.waypoints);
    this.events = events;
  }

  private createMap(id: string): Leaflet.Map {
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

    map.on("click", this.appendWaypoint, this);

    return map;
  }

  private appendWaypoint({ latlng }: Leaflet.LeafletMouseEvent) {
    this.waypoints = [...this.waypoints, latlng];
    this.polyline.addLatLng(latlng);

    this.markers.push(this.createMarker(latlng, this.markers.length).addTo(this.map));

    this.events.onChange(this.waypoints);
  }

  private createPolyline(waypoints: Leaflet.LatLng[]): Leaflet.Polyline {
    return Leaflet.polyline(waypoints, { weight: 6 }).addTo(this.map);
  }

  private createMarkers(waypoints: Leaflet.LatLng[]): Leaflet.Marker[] {
    return waypoints.map(this.createMarker, this).map((marker) => marker.addTo(this.map));
  }

  private createMarker(latlng: Leaflet.LatLng, index: number) {
    return createWaypointMarker({
      index,
      latlng,
      icon: createWaypointIcon(index, index === this.selectedIndex),
      onDrag: this.updateWaypointAt.bind(this),
      onDragEnd: () => this.events.onChange(this.waypoints),
      onSelectedIndexChange: this.events.onSelectedIndexChange,
    });
  }

  private updateWaypointAt(index: number, latlng: Leaflet.LatLng) {
    // update without mutation
    this.waypoints = updateAt(index, latlng, this.waypoints);
    this.polyline.setLatLngs(this.waypoints);
  }

  public updateWaypoints(waypoints: Leaflet.LatLng[]) {
    // Avoid full update when no actual change
    if (equalLatLngArrays(this.waypoints, waypoints)) {
      return;
    }

    this.waypoints = waypoints;
    this.polyline.setLatLngs(this.waypoints);
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = this.createMarkers(this.waypoints);
  }

  public setSelected(index?: number) {
    if (this.selectedIndex !== undefined && this.markers[this.selectedIndex]) {
      this.markers[this.selectedIndex].setIcon(createWaypointIcon(this.selectedIndex, false));
    }
    if (index !== undefined) {
      this.markers[index].setIcon(createWaypointIcon(index, true));
    }
    this.selectedIndex = index;
  }
}
