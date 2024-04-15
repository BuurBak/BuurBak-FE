import React, { useState } from "react";

function RangeSlider() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const min = 0;
  const max = 200;
  const [minThumb, setMinThumb] = useState(
    ((minPrice - min) / (max - min)) * 100
  );
  const [maxThumb, setMaxThumb] = useState(
    100 - ((maxPrice - min) / (max - min)) * 100
  );

  const minTrigger = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newMinPrice = parseInt(event.target.value);
    if (newMinPrice < min) newMinPrice = min;
    if (newMinPrice > maxPrice) newMinPrice = maxPrice;
    setMinPrice(newMinPrice);
    setMinThumb(((newMinPrice - min) / (max - min)) * 100);
  };

  const maxTrigger = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newMaxPrice = parseInt(event.target.value);
    if (newMaxPrice > max) newMaxPrice = max;
    if (newMaxPrice < minPrice) newMaxPrice = minPrice;
    setMaxPrice(newMaxPrice);
    setMaxThumb(100 - ((newMaxPrice - min) / (max - min)) * 100);
  };

  return (
    <div className="flex justify-center items-center">
      <div className=" max-w-xl w-full">
        <div>
          <input
            type="range"
            step="1"
            min={min}
            max={max}
            onChange={(event) => minTrigger(event)}
            value={minPrice}
            className="absolute z-20 h-2 w-full opacity-0 cursor-pointer"
          />

          <input
            type="range"
            step="1"
            min={min}
            max={max}
            onChange={(event) => maxTrigger(event)}
            value={maxPrice}
            className="absolute z-20 h-2 w-full opacity-0 cursor-pointer"
          />

          <div className="relative z-10 h-2">
            <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

            <div
              className="absolute z-20 top-0 bottom-0 rounded-md bg-orange-300"
              style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}
            ></div>

            <div
              className="absolute z-30 w-6 h-6 top-0 left-0 bg-orange-500 rounded-full -mt-2 -ml-1 cursor-pointer"
              style={{ left: `${minThumb}%` }}
            ></div>

            <div
              className="absolute z-30 w-6 h-6 top-0 right-0 bg-orange-500 rounded-full -mt-2 -mr-3 cursor-pointer"
              style={{ right: `${maxThumb}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center py-5">
          <div>
            <input
              type="number"
              min={min}
              max={maxPrice}
              onChange={(event) => minTrigger(event)}
              value={minPrice}
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
          <div>
            <input
              type="number"
              min={minPrice}
              max={max}
              onChange={(event) => maxTrigger(event)}
              value={maxPrice}
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
