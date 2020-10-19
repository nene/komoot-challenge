import * as Leaflet from "leaflet";
import xml from "xml";

export const createGpx = (waypoints: Leaflet.LatLng[]): string => {
  return xml(
    {
      gpx: [
        {
          _attr: {
            version: "1.1",
            creator: "Route Builder",
            xmlns: "http://www.topografix.com/GPX/1/1",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
          },
        },
        { metadata: [{ name: "Hiking route" }] },
        { trk: [{ name: "Hiking route" }, { trkseg: waypoints.map(createTrackPoint) }] },
      ],
    },
    { declaration: true, indent: "  " },
  );
};

const createTrackPoint = (latlng: Leaflet.LatLng): xml.XmlObject => ({
  trkpt: [{ _attr: { lat: latlng.lat, lon: latlng.lng } }],
});
