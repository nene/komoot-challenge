import "leaflet/dist/leaflet.css";
import * as Leaflet from "leaflet";
import { createWaypointIcon } from "./WaypointIcon";
import { updateAt } from "../immutable-utils";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

interface MapControllerOptions {
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
  private onChange: (waypoints: Leaflet.LatLng[]) => void;
  private onSelectedIndexChange: (index?: number) => void;

  constructor(id: string, opts: MapControllerOptions) {
    this.map = this.createMap(id);
    // Start with empty map (no markers and zero-length polyline)
    this.waypoints = [];
    this.polyline = this.createPolyline(this.waypoints);
    this.markers = this.createMarkers(this.waypoints);
    this.onChange = opts.onChange;
    this.onSelectedIndexChange = opts.onSelectedIndexChange;
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

    const marker = this.createMarker(latlng, this.markers.length);
    marker.addTo(this.map);
    this.markers.push(marker);

    this.onChange(this.waypoints);
  }

  private createPolyline(waypoints: Leaflet.LatLng[]): Leaflet.Polyline {
    const polyline = Leaflet.polyline(waypoints, { weight: 6 });
    polyline.addTo(this.map);
    return polyline;
  }

  private createMarkers(waypoints: Leaflet.LatLng[]): Leaflet.Marker[] {
    const markers: Leaflet.Marker[] = waypoints.map(this.createMarker, this);

    markers.forEach((marker) => marker.addTo(this.map));

    return markers;
  }

  private createMarker(latlng: Leaflet.LatLng, index: number) {
    const marker = Leaflet.marker(latlng, {
      icon: createWaypointIcon(index, index === this.selectedIndex),
      draggable: true,
    });

    // While moving the marker, keep polyline and waypoints array in sync
    // At the end of moving, fire onChange event.
    marker.on("move", () => this.updateWaypointAt(index, marker.getLatLng()));
    marker.on("moveend", () => this.onChange(this.waypoints));

    marker.on("mouseover", () => this.onSelectedIndexChange(index));
    marker.on("mouseout", () => this.onSelectedIndexChange(undefined));
    return marker;
  }

  private updateWaypointAt(index: number, latlng: Leaflet.LatLng) {
    // update without mutation
    this.waypoints = updateAt(index, latlng, this.waypoints);
    this.polyline.setLatLngs(this.waypoints);
  }

  public updateWaypoints(waypoints: Leaflet.LatLng[]) {
    // Avoid full update when no actual change
    if (this.isEqualLatLngs(this.waypoints, waypoints)) {
      return;
    }

    this.waypoints = waypoints;
    this.polyline.setLatLngs(this.waypoints);
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = this.createMarkers(this.waypoints);
  }

  private isEqualLatLngs(xs: Leaflet.LatLng[], ys: Leaflet.LatLng[]): boolean {
    return xs.length === ys.length && xs.every((x, i) => x.equals(ys[i]));
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
