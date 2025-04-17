import { Autocomplete, TextField, outlinedInputClasses } from "@mui/material";
import {
  Theme,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import { TrailerType } from "../Types/TrailerType";
import Button from "./Button";
import Card from "./Card";
import InputField from "./InputField";
import SearchOrFilter from "./SearchOrFilterFunction";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";

type FilterOption = {
  label: string;
  options: any;
  inputValue: any;
  setInputValue: any;
};

function valuetext(value: number) {
  return `${value}`;
}
export const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#EE7B46",
            "--TextField-brandBorderHoverColor": "#EE7B46",
            "--TextField-brandBorderFocusedColor": "#EE7B46",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            minWidth: "150px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            color: "#EE7B46",
          },
          thumb: {
            color: "#EE7B46",
          },
          track: {
            color: "#EE7B46",
          },
          rail: {
            color: "#ddd",
          },
        },
      },
    },
  });

const AanbodList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState<string>("");
  const [selectedWhere, setSelectedWhere] = useState("");
  const [selectedWhen, setSelectedWhen] = useState<Dayjs | null>(null);
  const outerTheme = useTheme();
  const [value, setValue] = React.useState<number[]>([0, 100]);
  type TrailerTypeName = typeof TrailerTypes[number];
  const [selectedType, setSelectedType] = useState<TrailerTypeName>("Alle");

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

  const TrailerTypes = [
  "Open aanhanger",
  "Gesloten aanhanger",
  "Motorfiets aanhanger",
  "Bagage aanhanger",
  "Fietsen aanhanger",
  "Overig",
  "Alle"
] as const;

  const TrailerArray = SearchOrFilter({
    searchTerm: inputValueSearch,
    filterType: selectedType,
    filterDate: selectedWhen,
    filterWhere: selectedWhere,
    filterPriceRange: value as [number, number],
  });

  return (
    <div className="flex flex-col h-full max-h-screen overflow-auto w-full p-2 bg-offWhite-100 gap-3">
      <div className="flex flex-col w-full h-fit gap-3">
        <div className="flex flex-row gap-3 w-full">
          <InputField
            className="w-full"
            label="Zoeken"
            inputType="text"
            icon={true}
            value={inputValueSearch}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInputValueSearch(event.target.value)
            }
          />
          <Button
            className="border"
            label="Filter"
            icon={true}
            IconName="Filter"
            type="secondary"
            onClick={() => setShowFilters(!showFilters)}
          />
        </div>
        {showFilters && (
          <div className="flex flex-row flex-wrap gap-3">
            <ThemeProvider theme={customTheme(outerTheme)}>
              <Autocomplete
                className="flex-1"
                disablePortal
                id="filter-type"
                options={TrailerTypes}
                inputValue={selectedType}
                onInputChange={(event, newValue) => {
                  if (TrailerTypes.includes(newValue as TrailerTypeName)) {
                    setSelectedType(newValue as TrailerTypeName);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
              <Box
                sx={{
                  width: 170,
                  padding: "0 15px",
                  border: "1px solid #EE7B46",
                  borderRadius: "3px",
                }}
              >
                <Slider
                  className="flex-1"
                  getAriaLabel={() => "Price range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
                <div className="">
                  €{value[0]} - {value[1]} per dag
                </div>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="flex-1"
                  label="Wanneer"
                  value={selectedWhen}
                  onChange={(newValue) => setSelectedWhen(newValue)}
                />
              </LocalizationProvider>
              <Button
                label="Apply Filters"
                type="primary"
                onClick={() => {
                  setShowFilters(false); // Close filter UI after applying
                }}
              />
            </ThemeProvider>
          </div>
        )}
      </div>
      <div className="w-full h-fit max-h-min overflow-auto flex flex-row justify-center md:justify-start flex-wrap gap-3">
        {TrailerArray?.length
          ? TrailerArray.map((item) => (
              <Card
                key={item.uuid}
                img={item.images[0]}
                title={item.trailer_type}
                location={item.address.city}
                price={item.rental_price.toString()}
                href={"aanbod/" + item.uuid}
                accessoires=""
                distance={2}
                type="overview"
              />
            ))
          : "Geen aanhangers gevonden"}
      </div>
    </div>
  );
};

export default AanbodList;
