"use client";

import { Autocomplete, TextField } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { customTheme } from "../Components/AanbodList";

type FilterOption = {
  label: string;
  options: any;
  inputValue: any;
  setInputValue: any;
};

type PropType = {
  outputValue: string;
};

const LocationInput = ({ outputValue }: PropType) => {
  const outerTheme = useTheme();
  const [names, setNames] = useState<string[]>();
  const [inputValueWhere, setInputValueWhere] = useState("");

  useEffect(() => {
    outputValue = inputValueWhere;
  }, [inputValueWhere]);

  const filterOptions: FilterOption[] = [
    {
      label: "Waar",
      options: names,
      inputValue: inputValueWhere,
      setInputValue: setInputValueWhere,
    },
  ];
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      {filterOptions?.map((item: FilterOption, index: number) => (
        <Autocomplete
          className="flex-1"
          disablePortal
          id={index.toString()}
          options={item.options}
          key={index}
          inputValue={item.inputValue}
          onInputChange={(event, newValue) => {
            item.setInputValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} label={item.label} />}
        />
      ))}
    </ThemeProvider>
  );
};

export default LocationInput;
