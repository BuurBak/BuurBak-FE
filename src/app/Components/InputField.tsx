"use client";

import React, { forwardRef } from "react";
import Icon, { IconName } from "./Icon";
import MultiRangeSlider from "./MultiRangeSlider";

type InputFieldType = {
  label: string;
  outline?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  inputType: "text" | "star" | "rangeSlider" | "dropdown";
  icon?: boolean;
  iconName?: IconName | "L" | "B" | "H";
  rangeMin?: number;
  rangeMax?: number;
  setRangeValueMin?: (value: number) => void;
  setRangeValueMax?: (value: number) => void;
  filled?: boolean;
  required?: boolean;
  pattern?: string;
  iconClick?: () => void;
  className?: string;
  iconLeft?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, InputFieldType>(
  (
    {
      label,
      inputType,
      outline,
      icon,
      type = "text",
      rangeMin = 0,
      rangeMax = 200,
      setRangeValueMin,
      setRangeValueMax,
      filled,
      required,
      iconClick,
      iconName,
      pattern,
      className = "",
      iconLeft,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative w-fit ${className}`}>
        {inputType === "text" && (
          <div className="relative">
            <input
              ref={ref}
              type={type}
              {...props}
              className={`
              h-12 rounded w-full focus:outline-none
              ${iconLeft ? "pl-12 pr-3" : "px-3"}
              ${
                outline
                  ? "border border-primary-100"
                  : "border border-offWhite-100"
              }
            `}
              placeholder={label}
              pattern={pattern}
              required={required}
            />
            {icon && (
              <div
                className={`
                absolute ${filled ? "bg-primary-100 rounded-r" : ""}
                ${iconLeft ? "left-0 top-0 p-2" : "right-2 top-2"}
              `}
                onClick={iconClick}
              >
                {iconName === "L" || iconName === "B" || iconName === "H" ? (
                  <p className="h-8 w-8 text-[1.5rem] text-center">
                    {iconName}
                  </p>
                ) : (
                  <Icon
                    name={iconName || "Search"}
                    className={`h-8 w-8 ${filled ? "text-white" : ""}`}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {inputType === "rangeSlider" && (
          <div className="w-60 h-10">
            <MultiRangeSlider
              min={rangeMin}
              max={rangeMax}
              setMin={setRangeValueMin}
              setMax={setRangeValueMax}
            />
          </div>
        )}

        {inputType === "dropdown" && <div>Dropdown not implemented</div>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
