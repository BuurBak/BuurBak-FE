import { TrailerList } from "@/app/Types/TrailerList";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { RangeCalendar } from "@nextui-org/calendar";
import { DateRangePicker } from "@nextui-org/date-picker";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";

type Inputs = {
  date: any;
  time: string;
};

const Reserveren = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const pickUpTime = [
    { start: "9:00", end: "10:00" },
    { start: "18:00", end: "19:00" },
  ];

  const merche = (item: { start: string; end: string }) =>
    item.start + " - " + item.end;

  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      {collapsed && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black-100 opacity-70 z-30 sm:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}

      <div
        className={`h-fit min-w-fit w-full sm:w-fit p-4 bg-offWhite-100 fixed bottom-0 sm:sticky sm:top-5 flex justify-between gap-4 ${collapsed && "flex-col"} z-40`}
      >
        {!collapsed && (
          <div className="flex flex-col justify-between sm:hidden ">
            <p>
              <span className="font-bold">€{trailerOffer.price}</span> per dag
            </p>
            <p>{value.start.toString()}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {collapsed ||
            (window.innerWidth > 639 && (
              <div className="flex flex-col gap-4 w-full">
                <RangeCalendar
                  className="buurbak-light sm:hidden"
                  {...register("date")}
                  value={value}
                  onChange={setValue}
                />
                <DateRangePicker
                  label="Datum"
                  labelPlacement="outside"
                  className="buurbak-light hidden sm:block"
                  {...register("date", {
                    setValueAs: (v) => v.toString(),
                  })}
                  value={value}
                  onChange={setValue}
                />

                <Autocomplete
                  label="Op haal tijd"
                  className="w-full buurbak-light"
                  labelPlacement="outside"
                  placeholder=" "
                  defaultItems={pickUpTime}
                  {...register("time", { required: true })}
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
                  <p className="text-h6 text-primary-100">
                    €{trailerOffer.price}
                  </p>
                </div>
              </div>
            ))}
          {!collapsed && (
            <Button
              label="Kies jouw datum"
              styling={`min-w-fit ${collapsed && "w-full"} sm:hidden`}
              buttonAction={() => setCollapsed(!collapsed)}
            />
          )}
          {collapsed ||
            (window.innerWidth > 639 && (
              <Button
                label="Reserveer nu"
                styling={`min-w-fit ${collapsed || (window.innerWidth > 639 && "w-full")}`}
                // buttonAction={() => setCollapsed(!collapsed)}
                submit={true}
              />
            ))}
        </form>
      </div>
    </>
  );
};

export default Reserveren;
