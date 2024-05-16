import { TrailerList } from "@/app/Types/TrailerList";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { RangeCalendar } from "@nextui-org/calendar";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useState } from "react";
import Button from "../Button";

const Reserveren = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
  const pickUpTime = [
    { start: "9:00", end: "10:00" },
    { start: "18:00", end: "19:00" },
  ];

  const merche = (item: { start: string; end: string }) =>
    item.start + " - " + item.end;

  const [collapsed, isCollapesed] = useState(true);
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  return (
    <div
      className={`h-fit min-w-fit w-full sm:w-fit p-4 bg-offWhite-100 fixed bottom-0 sm:sticky sm:top-5 flex justify-between gap-4 ${collapsed && "flex-col"}`}
    >
      {!collapsed && (
        <div className="flex flex-col justify-between sm:hidden ">
          <p>
            <span className="font-bold">€{trailerOffer.price}</span> per dag
          </p>
          <p>{value.start.toString()}</p>
        </div>
      )}
      {collapsed && (
        <div className="flex flex-col gap-4 w-full">
          <RangeCalendar
            className="buurbak-light sm:hidden"
            aria-label="Date (Controlled)"
            value={value}
            onChange={setValue}
          />
          <DateRangePicker
            label="Datum"
            labelPlacement="outside"
            className="buurbak-light hidden sm:block"
          />
          <Autocomplete
            label="Op haal tijd"
            className="w-full buurbak-light"
            labelPlacement="outside"
            placeholder=" "
            defaultItems={pickUpTime}
          >
            {pickUpTime.map((item, index) => (
              <AutocompleteItem
                key={index}
                value={merche(item)}
                className="buurbak-light"
              >
                {merche(item)}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <hr className="w-full h-1 bg-offWhite-100" />
          <div className="w-full flex justify-between">
            <p className="text-h6 text-primary-100">Totaal</p>
            <p className="text-h6 text-primary-100">{trailerOffer.price}</p>
          </div>
        </div>
      )}
      <Button
        label="Reserveer nu"
        styling={`min-w-fit ${collapsed && "w-full"}`}
        buttonAction={() => isCollapesed(!collapsed)}
      />
    </div>
  );
};

export default Reserveren;
