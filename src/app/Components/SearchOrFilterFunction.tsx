import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { getAllTrailers } from "../api/Trailer-controller";
import { TrailerData } from "../Types/Reservation";
import { TrailerType } from "../Types/TrailerType";
const DEFAULT_CENTER = {
  lat: 52.131401,
  lng: 5.42747,
};

// const [searchTerm, setSearchTerm] = useState("");
// const [filterDate, setFilterDate] = useState<Date>();
// const [filterType, setFilterType] = useState<TrailerType>();
// const [filterPrice, setFilterPrice] = useState<number>();
// const [filterDimensions, setFilterDimensions] = useState();

type SearchOrFilter = {
  searchTerm?: string;
  filterDate?: Dayjs | null;
  filterType?: TrailerType["name"];
  filterPrice?: number;
  filterDimensions?: any;
  filterWhere?: string;
};
const SearchOrFilter = ({
  searchTerm,
  filterDate,
  filterType,
  filterPrice,
  filterDimensions,
  filterWhere,
  ...props
}: SearchOrFilter) => {
  const [data, setData] = useState<TrailerData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [centerCoordinates, setCenterCoordinates] = useState(DEFAULT_CENTER);
  const [filteredTrailers, setFilteredTrailers] = useState<TrailerData[]>([]);

  // Berekent de afstand van de aanhangwagen vanaf jou locatie
  const haversineDistance = (coords1: any, coords2: any) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
    const dLon = (coords2.lng - coords1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coords1.lat * Math.PI) / 180) *
        Math.cos((coords2.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  useEffect(() => {
    //Nieuwe BE nog toevoegen
    // fetch("https://pilot.buurbak.nl/api/v1/traileroffers")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data.content);
    //     setLoading(false);
    //   });
    const fetchData = async () => {
      const trailerData = await getAllTrailers();
      if (trailerData) {
        setData(trailerData);
        setLoading(false);
      }
    };
    fetchData();
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
  }, []);

  const TrailerDistance = (nearbyLatitude: any, nearbyLongitude: any) => {
    if (
      centerCoordinates.lat !== DEFAULT_CENTER.lat ||
      centerCoordinates.lng !== DEFAULT_CENTER.lng
    ) {
      const distance = haversineDistance(
        { lat: nearbyLatitude, lng: nearbyLongitude },
        centerCoordinates
      );
      return distance;
    }
  };
  useEffect(() => {
    let filteredAndReordered = Array.isArray(data)
      ? [...data].filter((trailer) => {
          return (
            (!searchTerm ||
              trailer.address.city
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              trailer.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              trailer.trailer_type
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (!filterType ||
              filterType === "Alle" ||
              trailer.trailer_type === filterType) &&
            (!filterPrice || trailer.rental_price <= filterPrice) &&
            (!filterWhere ||
              trailer.address.city
                ?.toLowerCase()
                .includes(filterWhere.toLowerCase()))
          );
        })
      : [];

    if (
      centerCoordinates.lat !== DEFAULT_CENTER.lat ||
      centerCoordinates.lng !== DEFAULT_CENTER.lng
    ) {
      filteredAndReordered = filteredAndReordered.sort((a, b) => {
        const distanceA = haversineDistance(
          { lat: a.location.latitude, lng: a.location.longitude },
          centerCoordinates
        );
        const distanceB = haversineDistance(
          { lat: b.location.latitude, lng: b.location.longitude },
          centerCoordinates
        );
        return distanceA - distanceB;
      });
      filteredAndReordered.forEach((element) => {
        const distance =
          TrailerDistance(
            element.location.latitude,
            element.location.longitude
          ) || 0;
        Math.round(distance);
      });
    }

    setFilteredTrailers(filteredAndReordered);
  }, [
    data,
    searchTerm,
    filterType,
    filterWhere,
    filterDate,
    centerCoordinates,
  ]);

  return filteredTrailers;
};

export default SearchOrFilter;
