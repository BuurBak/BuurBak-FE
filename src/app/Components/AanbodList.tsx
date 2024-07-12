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
import { useEffect, useState } from "react";
import { TrailerType } from "../Types/TrailerType";
import Button from "./Button";
import Card from "./Card";
import InputField from "./InputField";
import SearchOrFilter from "./SearchOrFilterFunction";
import { nl } from "date-fns/locale";

type FilterOption = {
  label: string;
  options: any;
  inputValue: any;
  setInputValue: any;
};

const AanbodList = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState("");
  const [inputValueType, setInputValueType] =
    useState<TrailerType["name"]>("Alle");
  const [inputValueWhere, setInputValueWhere] = useState("");
  const [inputValueWhen, setInputValueWhen] = useState<Dayjs | null>();
  const [names, setNames] = useState<string[]>();
  //TrailerArray is de lijst met getypte trailers objects
  const TrailerArray = SearchOrFilter({
    searchTerm: inputValueSearch,
    filterType: inputValueType,
    filterDate: inputValueWhen,
    filterWhere: inputValueWhere,
  });
  const TrailerTypes = [
    "Open aanhanger",
    "Gesloten aanhanger",
    "Motorfiets aanhanger",
    "Bagage aanhanger",
    "Fietsen aanhanger",
    "Overig",
  ];
  const TempPlaces = ["Putten", "Utrecht", "Tiel"];
  const [dateCleared, setdateCleared] = useState<boolean>(false);
  const outerTheme = useTheme();
  const [callData, setCallData] = useState<any[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function initService(): void {
      const displaySuggestions = function (
        predictions: google.maps.places.QueryAutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) {
        if (
          status != google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          console.log(status);
          return;
        }

        let namesReturn: string[] = [];

        predictions.forEach((prediction) => {
          namesReturn.push(prediction.description.toString());
        });

        setNames(namesReturn.map((item) => item.split(",")[0].trim()));
      };

      const service = new window.google.maps.places.AutocompleteService();

      service.getQueryPredictions(
        { input: inputValueWhere },
        displaySuggestions
      );
    }
    initService();
  }, [inputValueWhere]);

  useEffect(() => {
    if (dateCleared) {
      const timeout = setTimeout(() => {
        setdateCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [dateCleared]);

  const filterOptions: FilterOption[] = [
    {
      label: "Type",
      options: TrailerTypes,
      inputValue: inputValueType,
      setInputValue: setInputValueType,
    },
    {
      label: "Waar",
      options: names || TempPlaces,
      inputValue: inputValueWhere,
      setInputValue: setInputValueWhere,
    },
  ];

  const customTheme = (outerTheme: Theme) =>
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

              width: "300px",
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
        MuiInput: {
          styleOverrides: {
            root: {
              "&::before": {
                borderBottom: "2px solid var(--TextField-brandBorderColor)",
              },
              "&:hover:not(.Mui-disabled, .Mui-error):before": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderHoverColor)",
              },
              "&.Mui-focused:after": {
                borderBottom:
                  "2px solid var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
      },
    });

  return (
    <div className="flex flex-col h-full max-h-screen overflow-auto w-full p-2 bg-offWhite-100 gap-3">
      <div className="flex flex-col w-full h-fit gap-3">
        <div className="flex flex-row gap-3  w-full">
          <InputField
            className="w-full"
            label="Zoeken"
            inputType="text"
            icon={true}
            inputValue={inputValueSearch}
            setInputValue={setInputValueSearch}
          />
          <Button
            styling="border"
            label="Filter"
            icon={true}
            type="secondary"
            buttonAction={() => setShowFilters(!showFilters)}
          />
          <div id="results"></div>
        </div>
        {showFilters && (
          <div className="flex flex-row flex-wrap gap-3">
            <ThemeProvider theme={customTheme(outerTheme)}>
              {filterOptions?.map((item: FilterOption, index: number) => (
                <Autocomplete
                  disablePortal
                  id={index.toString()}
                  options={item.options}
                  key={index}
                  inputValue={item.inputValue}
                  onInputChange={(event, newValue) => {
                    item.setInputValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={item.label} />
                  )}
                />
              ))}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Wanneer"
                  value={inputValueWhen}
                  onChange={(newValue) => {
                    setInputValueWhen(newValue);
                  }}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => setdateCleared(true),
                    },
                  }}
                />
              </LocalizationProvider>
              <div id="test"></div>
            </ThemeProvider>
          </div>
        )}
      </div>
      <div className="w-full h-fit max-h-min overflow-auto flex flex-row flex-wrap gap-3">
        {TrailerArray != undefined && TrailerArray.length != 0
          ? TrailerArray?.map((item) => (
              <Card
                key={item.id}
                img={item.coverImage}
                title={item.name}
                location={item.cityAddress.city}
                price={item.price.toString()}
                link={"Aanbod/" + item.id}
                accesoires=""
                distance={item.distance}
                type="overview"
              />
            ))
          : "Geen aanhangers gevonden"}
      </div>
    </div>
  );
};

export default AanbodList;
