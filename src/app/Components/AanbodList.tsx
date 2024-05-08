import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import InputField from "./InputField";
import SearchOrFilter from "./SearchOrFilterFunction";
import { TrailerType } from "../Types/TrailerType";
import { Autocomplete, TextField } from "@mui/material";

type FilterOption = {
  label: string;
  options: any;
  inputValue: any;
  setInputValue: any;
};

const AanbodList = () => {

  const [showFilters, setShowFilters] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState("");
  const [inputValueType, setInputValueType] = useState<TrailerType>({name: ""});
  const [inputValueWhere, setInputValueWhere] = useState("");
  const [inputValueWhen, setInputValueWhen] = useState<Date>();
  
  //TrailerArray is de lijst met getypte trailers objects
  const TrailerArray = SearchOrFilter({searchTerm: inputValueSearch, filterType: inputValueType, filterDate: inputValueWhen});
  const TrailerTypes = ["Open aanhanger", "Gesloten aanhanger", "Motorfiets aanhanger", "Bagage aanhanger", "Fietsen aanhanger", "Overig"]

  const filterOptions: FilterOption[] = [
    {
      label: "Type",
      options: TrailerTypes,
      inputValue: inputValueType.name,
      setInputValue: setInputValueType,
    },
    {
      label: "Waar",
      options: TrailerTypes,
      inputValue: inputValueWhere,
      setInputValue: setInputValueWhere,
    },
    {
      label: "Wanneer",
      options: TrailerTypes,
      inputValue: inputValueWhen,
      setInputValue: setInputValueWhen,
    },
  ];
  return (
    <div className="flex flex-col h-fit sm:h-full w-full p-2 bg-offWhite-100 gap-3">
      <div className="flex flex-col w-full h-fit gap-3">
        <div className="flex flex-row gap-3  w-full">
          <InputField
            className="w-full"
            label="Zoeken"
            type="text"
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
        </div>
        {showFilters && (
          <div className="flex flex-row flex-wrap gap-3">
            {filterOptions?.map((item: FilterOption, index: number) => (
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={item.options}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} value={item.inputValue} onChange={item.setInputValue} label={item.label} />}
            />
            ))}
          </div>
        )}
      </div>
      <div className="w-full h-fit flex flex-row flex-wrap gap-3">
        {TrailerArray?.map((item) => (
          <Card
            key={item.id}
            img={item.coverImage}
            title={item.name}
            location={item.cityAddress.city}
            price={item.price.toString()}
            link={item.id}
            accesoires=""
            distance={item.distance}
            type="overview"
          />
        ))}
      </div>
    </div>
  );
};

export default AanbodList;
