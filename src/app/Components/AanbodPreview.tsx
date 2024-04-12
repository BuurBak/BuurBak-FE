import React, { useEffect, useState } from 'react';
import { TrailerList } from '../Types/TrailerList';
import Card from './Card';
import Button from './Button';

const AanbodPreview: React.FC = () => {
  const [data, setData] = useState<TrailerList[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pilot.buurbak.nl/api/v1/traileroffers/")
      .then((res) => res.json())
      .then((data) => {
          setData(data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='w-full px-10 py-4 flex flex-col bg-offWhite-100 justify-center items-center'>
      <div className='w-full justify-center md:justify-between items-center flex flex-row mb-4'><h2>Aanbod</h2><Button type='secondary' styling='hidden md:flex' label={'Bekijk ons hele aanbod'} /></div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
          <div className='flex flex-row w-full gap-4 justiry-start lg:justify-center overflow-hidden'>
              {data.slice(0, 5).map((item) => (
                <Card key={item.id} titel={item.name} type={'overview'} img={item.coverImage} link={''} location={item.cityAddress.city} price={item.price.toString()}/>
              ))}
            </div>
          )}
          </>
      )}
      <div className='w-full flex justify-center'><Button type='secondary' styling='flex md:hidden' label={'Bekijk ons hele aanbod'} /></div>
    </div>
  );
};

export default AanbodPreview;
