import * as Leaflet from "leaflet";

export const equalLatLngArrays = (xs: Leaflet.LatLng[], ys: Leaflet.LatLng[]): boolean => {
  return xs.length === ys.length && xs.every((x, i) => x.equals(ys[i]));
};
