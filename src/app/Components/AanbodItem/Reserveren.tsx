import { TrailerList } from "@/app/Types/TrailerList";
import { getLocalTimeZone, today } from "@internationalized/date";
import { RangeCalendar } from "@nextui-org/calendar";
import { useState } from "react";
import Button from "../Button";

const Reserveren = ({ trailerOffer }: { trailerOffer: TrailerList }) => {
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
            className="buurbak-light"
            aria-label="Date (Controlled)"
            value={value}
            onChange={setValue}
          />
          <div></div>
          <hr className="w-full h-1 bg-offWhite-100" />
          <div className="w-full flex justify-between">
            <p>Totaal</p>
            <p>{trailerOffer.price}</p>
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
