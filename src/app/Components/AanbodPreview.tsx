import React, { useEffect, useState } from 'react'
import { TrailerList } from '../Types/TrailerList';

const [data, setData] = useState<TrailerList[]>([])
const [isLoading, setLoading] = useState(true) 
const [count, setCount] = useState(4) 

useEffect(() => {
  fetch("https://pilot.buurbak.nl/api/v1/traileroffers")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    });
}, []);

const AanbodPreview = () => {
  return (
    <div className='w-full p-4'>
        {data.length >= count ? 
        <div>

        </div> : 
        ""}
    </div>
  )
}

export default AanbodPreview