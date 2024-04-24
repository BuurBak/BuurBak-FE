import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import SearchOrFilter from "./SearchOrFilterFunction";

type FilterOption = {
  label: string;
  inputValue: any;
  setInputValue: any;
};

const AanbodList = () => {
  //TrailerArray is de lijst met getypte trailers objects
  const TrailerArray = SearchOrFilter();

  const [showFilters, setShowFilters] = useState(false);
  const [inputValueSearch, setInputValueSearch] = useState("");
  const [inputValueType, setInputValueType] = useState("");
  const [inputValueWhere, setInputValueWhere] = useState("");
  const [inputValueWhen, setInputValueWhen] = useState("");

  const filterOptions: FilterOption[] = [
    {
      label: "Type",
      inputValue: inputValueType,
      setInputValue: setInputValueType,
    },
    {
      label: "Waar",
      inputValue: inputValueWhere,
      setInputValue: setInputValueWhere,
    },
    {
      label: "Wanneer",
      inputValue: inputValueWhen,
      setInputValue: setInputValueWhen,
    },
  ];
  return (
    <div className="flex flex-col min-h-dvh w-full p-2 bg-offWhite-100">
      <div className="flex flex-col w-full h-full gap-3">
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
              <InputField
                key={index}
                filled
                icon
                inputValue={item.inputValue}
                setInputValue={item.setInputValue}
                label={item.label}
                outline
                type="text"
                className="flex-1 min-w-fit"
              />
            ))}
          </div>
        )}
      </div>
      <div>test</div>
    </div>
  );
};

export default AanbodList;
