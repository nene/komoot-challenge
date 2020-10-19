import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import * as Leaflet from "leaflet";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

const icon = Leaflet.icon({ iconUrl, shadowUrl, iconSize: [25, 41], iconAnchor: [13, 40] });

interface MapControllerOptions {
  onChange: (waypoints: Leaflet.LatLng[]) => void;
}

export class MapController {
  private map: Leaflet.Map;
  private waypoints: Leaflet.LatLng[];
  private polyline: Leaflet.Polyline;
  private markers: Leaflet.Marker[];
  private onChange: (waypoints: Leaflet.LatLng[]) => void;

  constructor(id: string, opts: MapControllerOptions) {
    this.map = this.createMap(id);
    // Start with empty map (no markers and zero-length polyline)
    this.waypoints = [];
    this.polyline = this.createPolyline(this.waypoints);
    this.markers = this.createMarkers(this.waypoints);
    this.onChange = opts.onChange;
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
    this.waypoints.push(latlng);
    this.polyline.addLatLng(latlng);

    const marker = this.createMarker(latlng, this.markers.length);
    marker.addTo(this.map);
    this.markers.push(marker);

    this.onChange(this.waypoints);
  }

  private createPolyline(waypoints: Leaflet.LatLng[]): Leaflet.Polyline {
    const polyline = Leaflet.polyline(waypoints);
    polyline.addTo(this.map);
    return polyline;
  }

  private createMarkers(waypoints: Leaflet.LatLng[]): Leaflet.Marker[] {
    const markers: Leaflet.Marker[] = waypoints.map(this.createMarker, this);

    markers.forEach((marker) => marker.addTo(this.map));

    return markers;
  }

  private createMarker(latlng: Leaflet.LatLng, index: number) {
    const marker = Leaflet.marker(latlng, { icon, draggable: true });
    marker.on("move", () => this.updatePolyline(index, marker.getLatLng()));
    return marker;
  }

  private updatePolyline(index: number, latlng: Leaflet.LatLng) {
    this.waypoints[index] = latlng;
    this.polyline.setLatLngs(this.waypoints);
  }

  public updateWaypoints(waypoints: Leaflet.LatLng[]) {
    this.waypoints = [...waypoints];
    this.polyline.setLatLngs(this.waypoints);
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = this.createMarkers(this.waypoints);
  }
}
