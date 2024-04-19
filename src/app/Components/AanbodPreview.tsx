"use client"

import React, { useEffect, useState } from 'react';
import { TrailerList } from '../Types/TrailerList';
import Card from './Card';
import Button from './Button';
const DEFAULT_CENTER = {
  lat: 52.131401,
  lng: 5.42747,
};

const AanbodPreview: React.FC = () => {
  const [data, setData] = useState<TrailerList[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [centerCoordinates, setCenterCoordinates] = useState(DEFAULT_CENTER)

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
    return Math.round(distance);
  };

  useEffect(() => {
    fetch("https://pilot.buurbak.nl/api/v1/traileroffers/", { mode: 'cors'})
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

  const TrailerDistance = (nearbyLatitude: any, nearbyLongitude: any) => {
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
      return undefined;
    }
    if(centerCoordinates.lat !== DEFAULT_CENTER.lat ||
      centerCoordinates.lng !== DEFAULT_CENTER.lng){
        const distance = haversineDistance(
          { lat: nearbyLatitude, lng: nearbyLongitude },
          centerCoordinates
        );
        return distance;
      }
  }

  return (
    <div className='w-full sm:px-20 py-4 flex flex-col bg-offWhite-100 justify-center items-center'>
        <div className='w-full justify-center md:justify-between items-center flex flex-row mb-4'><h3 className='font-bold'>Aanbod</h3><Button type='secondary' styling='hidden md:flex' label={'Bekijk ons hele aanbod'} /></div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.length === 0 ? (
              <p>No data available</p>
            ) : (
              <div className='flex flex-row flex-wrap md:flex-nowrap w-full gap-4 justify-center lg:justify-between overflow-hidden'>
                {data.slice(0, 5).map((item) => (
                  <Card key={item.id} title={item.name} type={'overview'} img={item.coverImage} link={''} location={item.cityAddress.city} price={item.price.toString()} distance={TrailerDistance(item.nearbyLatitude, item.nearbyLongitude)}/>
                ))}
              </div>
            )}
          </>
        )}
      <div className='w-full flex justify-center mt-4'><Button type='secondary' styling='flex md:hidden' label={'Bekijk ons hele aanbod'} /></div>

    </div>
  );
};

export default AanbodPreview;
