import React, { useEffect, useState } from 'react'
import { GoogleMapsWrapper } from './GoogleMapsWrapper'
import { GoogleMaps } from './GoogleMaps'
import { TrailerList } from '../Types/TrailerList';

export const LOCATIONS = [
  { lat: 48.8566, lng: 2.3522 },
  { lat: 47.1533, lng: 2.9123 },
];

const Map = () => {
const [data, setData] = useState<TrailerList[]>([])
const [isLoading, setLoading] = useState(true)

useEffect(() => {
  fetch("https://pilot.buurbak.nl/api/v1/traileroffers/", { mode: 'cors' })
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

const trailerLocations: readonly google.maps.LatLngLiteral[] = data.map(obj => ({
  lat: obj.nearbyLatitude,
  lng: obj.nearbyLongitude
}));

const trailerPrices = data.map((obj) => obj.price)
  return (
    <GoogleMapsWrapper>
      <GoogleMaps locations={trailerLocations} price={trailerPrices}/>
    </GoogleMapsWrapper>
  )
}

export default Map