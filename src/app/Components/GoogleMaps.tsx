import { useEffect, useRef, useState } from "react";
import { addClusterMarkers } from "./MapsMarkerCluster";

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 9;

export const GoogleMaps = ({
  locations,
  className,
  price,
  zoomOnLocation,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  className?: string;
  price: Array<number>;
  zoomOnLocation?: { lat: number; lng: number };
}) => {
  const [centerCoordinates, setCenterCoordinates] = useState(DEFAULT_CENTER);

  useEffect(() => {
    setCenterCoordinates(zoomOnLocation || DEFAULT_CENTER);
  }, [zoomOnLocation]);

  if (navigator.geolocation && zoomOnLocation === undefined) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  function success(position: {
    coords: { latitude: number; longitude: number };
  }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCenterCoordinates({ lat: latitude, lng: longitude });
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: centerCoordinates,
        zoom: DEFAULT_ZOOM,
        mapId: "DEMO_MAP_ID",
      });

      // Displays cluster markers on map when called
      addClusterMarkers({ locations, map, price });
    }
  }, [ref, locations]);

  return <div ref={ref} className="h-full w-full" />;
};


// export default class GoogleMap {
//   private map: google.maps.Map | undefined;

//   constructor() {
//       this.initMap();
//   }

//   private initMap() {
//       // Dynamically load the Google Maps API script
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//       script.defer = true;
//       script.async = true;

//       // Callback function to initialize the map once the script is loaded
//       script.onload = () => {
//           this.map = new google.maps.Map(document.createElement('map'), {
//               center: { lat: -34.397, lng: 150.644 },
//               zoom: 8
//           });
//           document.body.appendChild(this.map.getDiv());
//       };

//       // Add the script to the document
//       document.head.appendChild(script);
//   }
// }

// // Instantiate the GoogleMap class
// new GoogleMap();