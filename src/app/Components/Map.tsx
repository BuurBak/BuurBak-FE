import { useEffect, useState } from "react";
import { TrailerList } from "../Types/TrailerList";
import { GoogleMaps } from "./GoogleMaps";
import { GoogleMapsWrapper } from "./GoogleMapsWrapper";

export const LOCATIONS = [
  { lat: 52.1552, lng: 5.3872 },
  { lat: 52.1552, lng: 5.3872 },
];

const Map = () => {
  const [data, setData] = useState<TrailerList[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pilot.buurbak.nl/api/v1/traileroffers/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setData(data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const trailerLocations: readonly google.maps.LatLngLiteral[] = data.map(
    (obj) => ({
      lat: obj.nearbyLatitude,
      lng: obj.nearbyLongitude,
    })
  );

  const trailerPrices = data.map((obj) => obj.price);
  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={trailerLocations} price={trailerPrices} />
    </GoogleMapsWrapper>
  );
};

export default Map;
