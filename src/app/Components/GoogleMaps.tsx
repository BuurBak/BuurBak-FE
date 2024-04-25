import React, { useEffect, useRef, useState } from "react";
import { addSingleMarkers } from "./MapsMarker";
import { addClusterMarkers } from "./MapsMarkerCluster";

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 9;

export const GoogleMaps = ({
  locations,
  className,
  price,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  className?: string;
  price: Array<number>;
}) => {
  
  const [centerCoordinates, setCenterCoordinates] = useState(DEFAULT_CENTER)
  if (navigator.geolocation) {
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
      addClusterMarkers({ locations, map, price});
    }
  }, [ref, locations]);

  return (
    <div
      ref={ref}
      className="h-full w-full"
    />
  );
};