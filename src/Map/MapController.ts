import "leaflet/dist/leaflet.css";
import * as Leaflet from "leaflet";
import { createMapBoxTileLayer } from "./MapBoxTileLayer";
import { NumberedPolyline, NumberedPolylineEvents } from "./NumberedPolyline";

// Have a hike at Vilsandi nature reserve
const INITIAL_POSITION = new Leaflet.LatLng(58.3728214, 21.8631477);

export class MapController {
  private map: Leaflet.Map;

  private polyline: NumberedPolyline;

  constructor(id: string, events: NumberedPolylineEvents) {
    this.map = Leaflet.map(id).setView(INITIAL_POSITION, 12);

    createMapBoxTileLayer().addTo(this.map);

    this.polyline = new NumberedPolyline(this.map, events);

    this.map.on("click", ({ latlng }: Leaflet.LeafletMouseEvent) => this.polyline.addLatLng(latlng));
  }

  public updateWaypoints(waypoints: Leaflet.LatLng[]) {
    this.polyline.setLatLngs(waypoints);
  }

  public setSelectedWaypoint(index?: number) {
    this.polyline.setSelected(index);
  }
}
