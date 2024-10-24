"use client";
// als icon library is gekozen nog optie voor veschillende icons toevoegen.
import { HTMLInputTypeAttribute } from "react";
import Icon, { IconName } from "./Icon";
import MultiRangeSlider from "./MultiRangeSlider";

type InputFieldType = {
  label: string;
  outline?: boolean;
  type?: HTMLInputTypeAttribute;
  inputType: "text" | "star" | "rangeSlider" | "dropdown";
  icon?: boolean;
  iconName?: IconName;
  rangeMin?: number;
  rangeMax?: number;
  setRangeValueMin?: any;
  setRangeValueMax?: any;
  inputValue?: any;
  setInputValue?: any;
  filled?: boolean;
  required?: boolean;
  pattern?: string;
  iconClick?: () => void;
  className?: string;
};

const InputField = ({
  label,
  inputType,
  outline,
  icon,
  type,
  rangeMin,
  rangeMax,
  setRangeValueMin,
  setRangeValueMax,
  inputValue,
  setInputValue,
  filled,
  required,
  iconClick,
  iconName,
  pattern,
  className,
  ...props
}: InputFieldType) => {
  const changeTextInputValue = (event: { target: { value: any } }) => {
    if (setInputValue != null || undefined) {
      if (event.target && event.target.value !== undefined) {
        setInputValue(event.target.value);
      }
    } else {
      if (event.target && event.target.value !== undefined) {
        inputValue = event.target.value;
      }
    }
  };

  const changeRatingValue = (value: number) => {
    if (setInputValue != null || undefined) {
      setInputValue(value === inputValue ? 0 : value);
    } else {
      inputValue = value === inputValue ? 0 : value;
    }
  };

  return (
    <div
      className={(className !== undefined ? className : "") + " relative w-fit"}
    >
      {inputType === "text" && (
        <input
          type={type}
          value={inputValue}
          onChange={changeTextInputValue}
          className={
            (outline
              ? "outline-0 border border-primary-100"
              : "outline-0 border border-offWhite-100") +
            " h-12 focus:outline-0 px-3 rounded w-full"
          }
          placeholder={label}
          pattern={pattern}
          {...props}
          required={required}
        ></input>
      )}
      {inputType === "text" && icon && (
        <div
          className={
            (filled
              ? "right-0 top-0 p-2 bg-primary-100 rounded-r"
              : "right-2 top-2") + " absolute"
          }
          onClick={iconClick}
        >
          <Icon
            name={iconName || "Search"}
            className={(filled ? "text-white" : "") + " h-8 w-8"}
          />
        </div>
      )}

      {inputType === "star" &&
        [...Array(5)].map((_, index) => {
          const value = index + 1;
          return (
            <label key={index} className="text-4xl cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={value === inputValue}
                onChange={() => changeRatingValue(value)}
                className="hidden"
              />
              <span
                className={
                  value <= (inputValue || 0)
                    ? "text-primary-100"
                    : "text-gray-100"
                }
              >
                {value <= (inputValue || 0) ? "★" : "☆"}
              </span>
            </label>
          );
        })}
      {/* MultiRangeSlider staat apart omdat dit ander teveel code werd voor in dit component */}
      {inputType === "rangeSlider" && (
        <div className="w-60 h-10">
          <MultiRangeSlider
            min={rangeMin === undefined ? 0 : rangeMin}
            max={rangeMax === undefined ? 200 : rangeMax}
            setMin={setRangeValueMin}
            setMax={setRangeValueMax}
          />
        </div>
      )}

      {inputType === "dropdown" && <div></div>}
    </div>
  );
};

export default InputField;
