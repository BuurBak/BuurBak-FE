import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "/multiRangeSlider.css";

type MultiRangeSliderProps = {
  min: number;
  max: number;
  setMin: any;
  setMax: any;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  setMin,
  setMax,
}: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback((value: number) => {
    return Math.round(((value - min) / (max - min)) * 100);
  }, [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 5);
          setMinVal(value);
          setMin(value);
          minValRef.current = value;
        }}
        className={(minVal > max - 100 && "z-10") + " thumb thumb--left thumb--zindex-3"}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 5);
          setMaxVal(value);
          setMax(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setMin: PropTypes.any.isRequired,
  setMax: PropTypes.any.isRequired,
};

export default MultiRangeSlider;
