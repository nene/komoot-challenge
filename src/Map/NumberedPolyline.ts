import * as Leaflet from "leaflet";
import { updateAt } from "../immutable-utils";
import { equalLatLngArrays } from "./equalLatLngArrays";
import { createNumberedIcon } from "./NumberedIcon";
import { createNumberedMarker } from "./NumberedMarker";

export interface NumberedPolylineEvents {
  onChange: (waypoints: Leaflet.LatLng[]) => void;
  onSelectedIndexChange: (index?: number) => void;
}

/**
 * A Polyline with numbered markers on all corners.
 * Also supports selecting a marker at index.
 *
 * For simplicity it gets added to map by calling the constructor.
 * A more thorough implementation should support addTo() method.
 */
export class NumberedPolyline {
  private map: Leaflet.Map;

  // Don't mutate this, it's exposed externally through onChange() event
  private latlngs: Leaflet.LatLng[];
  // Can be mutated, only used internally
  private markers: Leaflet.Marker[];

  private polyline: Leaflet.Polyline;
  private selectedIndex?: number;
  private events: NumberedPolylineEvents;

  constructor(map: Leaflet.Map, events: NumberedPolylineEvents) {
    this.map = map;
    this.latlngs = [];
    this.polyline = this.createPolyline(this.latlngs);
    this.markers = this.createMarkers(this.latlngs);
    this.events = events;
  }

  public addLatLng(latlng: Leaflet.LatLng) {
    this.latlngs = [...this.latlngs, latlng];
    this.polyline.addLatLng(latlng);

    this.markers.push(this.createMarker(latlng, this.markers.length).addTo(this.map));

    this.events.onChange(this.latlngs);
  }

  private createPolyline(latlngs: Leaflet.LatLng[]): Leaflet.Polyline {
    return Leaflet.polyline(latlngs, { weight: 6 }).addTo(this.map);
  }

  private createMarkers(latlngs: Leaflet.LatLng[]): Leaflet.Marker[] {
    return latlngs.map(this.createMarker, this).map((marker) => marker.addTo(this.map));
  }

  private createMarker(latlng: Leaflet.LatLng, index: number) {
    return createNumberedMarker({
      index,
      latlng,
      icon: createNumberedIcon(index, index === this.selectedIndex),
      onDrag: this.updatePolylineAt.bind(this),
      onDragEnd: () => this.events.onChange(this.latlngs),
      onSelectedIndexChange: this.events.onSelectedIndexChange,
    });
  }

  private updatePolylineAt(index: number, latlng: Leaflet.LatLng) {
    this.latlngs = updateAt(index, latlng, this.latlngs);
    this.polyline.setLatLngs(this.latlngs);
  }

  public setLatLngs(latlngs: Leaflet.LatLng[]) {
    // Avoid full update when no actual change
    if (equalLatLngArrays(this.latlngs, latlngs)) {
      return;
    }

    this.latlngs = latlngs;
    this.polyline.setLatLngs(this.latlngs);
    this.markers.forEach((marker) => marker.removeFrom(this.map));
    this.markers = this.createMarkers(this.latlngs);
  }

  public setSelected(index?: number) {
    if (this.selectedIndex !== undefined && this.markers[this.selectedIndex]) {
      this.markers[this.selectedIndex].setIcon(createNumberedIcon(this.selectedIndex, false));
    }
    if (index !== undefined) {
      this.markers[index].setIcon(createNumberedIcon(index, true));
    }
    this.selectedIndex = index;
  }
}
