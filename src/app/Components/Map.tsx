import { useEffect, useState } from "react";
import { getAllTrailers } from "../api/Trailer-controller";
import { TrailerData } from "../Types/Reservation";
import { GoogleMaps } from "./GoogleMaps";
import { GoogleMapsWrapper } from "./GoogleMapsWrapper";

export const LOCATIONS = [
  { lat: 52.1552, lng: 5.3872 },
  { lat: 52.1552, lng: 5.3872 },
];

const Map = () => {
  const [data, setData] = useState<TrailerData[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("https://pilot.buurbak.nl/api/v1/traileroffers/", { mode: "cors" })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.content);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   });

    const fetchData = async () => {
      try {
        const trailerData = await getAllTrailers();
        if (trailerData) {
          setData(trailerData);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const trailerLocations: readonly google.maps.LatLngLiteral[] = data.map(
    (obj) => ({
      lat: obj.location.latitude,
      lng: obj.location.longitude,
    })
  );

  const trailerPrices = data.map((obj) => obj.rental_price);
  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={trailerLocations} price={trailerPrices} />
    </GoogleMapsWrapper>
  );
};

export default Map;
