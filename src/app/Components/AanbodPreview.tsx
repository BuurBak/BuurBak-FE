"use client"

import React, { useEffect, useState } from 'react';
import { TrailerList } from '../Types/TrailerList';
import Card from './Card';
import Button from './Button';


const AanbodPreview: React.FC = () => {
  const [data, setData] = useState<TrailerList[]>([]);
  const [isLoading, setLoading] = useState(true);

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
              <div className='flex flex-row flex-wrap sm:flex-nowrap w-full gap-4 justify-center lg:justify-between overflow-hidden'>
                {data.slice(0, 5).map((item) => (
                  <Card key={item.id} title={item.name} type={'overview'} img={item.coverImage} link={''} location={item.cityAddress.city} price={item.price.toString()} />
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
