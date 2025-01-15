import { getTrailerAvalibility } from "@/app/api/Trailer-controller";
import { TrailerData } from "@/app/Types/Reservation";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { RangeCalendar, RangeValue } from "@nextui-org/calendar";
import { DateRangePicker } from "@nextui-org/date-picker";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";

type Inputs = {
  dateStart: Date;
  dateEnd: Date;
  time: string;
};

const Reserveren = ({ trailerOffer }: { trailerOffer: TrailerData }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const merche = (item: { start: string; end: string }) =>
    item.start + " - " + item.end;

  const [disabledRangesArray, setDisabledRanges] = useState<CalendarDate[][]>(
    []
  );
  const [collapsed, setCollapsed] = useState(false);
  const [date, setDate] = useState<RangeValue<CalendarDate> | null>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  });

  useEffect(() => {
    if (date) {
      setValue("dateStart", new Date(date.start.toString()), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("dateEnd", new Date(date.end.toString()), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    disabledRanges();
  }, [date]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const URLParams = (
      "time=" +
      data.time +
      "&" +
      ("dateStart=" + data.dateStart + "&") +
      ("dateEnd=" + data.dateEnd)
    ).toString();
    router.push(`/aanbod/${trailerOffer.uuid}/reserveren` + "?" + URLParams);
    setCollapsed(false);
  };

  const parseToCalendarDate = (dateString: string): CalendarDate => {
    const [year, month, day] = dateString.split("-").map(Number);

    if (
      !day ||
      !month ||
      !year ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12
    ) {
      throw new Error("Invalid date format");
    }

    return new CalendarDate(year, month, day);
  };

  const disabledRanges = async () => {
    const res: string[] = await getTrailerAvalibility(trailerOffer.uuid);

    const parsedRanges = res.map((item: string) => {
      const parsedDate = parseToCalendarDate(item);
      return [parsedDate, parsedDate];
    });

    setDisabledRanges(parsedRanges);
  };

  return (
    <>
      {collapsed && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black-100 opacity-70 z-30 sm:hidden"
          onClick={() => setCollapsed(false)}
        />
      )}

      <div
        className={`h-fit min-w-fit w-full sm:w-fit p-4 bg-offWhite-100 fixed bottom-0 sm:sticky sm:top-24 flex justify-between gap-4 ${
          collapsed && "flex-col"
        } z-40`}
      >
        {!collapsed && (
          <div className="flex flex-col justify-between sm:hidden ">
            <p>
              <span className="font-bold">€{trailerOffer.rental_price}</span>{" "}
              per dag
            </p>
            <p>
              {new Date(getValues("dateStart")).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}{" "}
              tot{" "}
              {new Date(getValues("dateEnd")).toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {(collapsed || window.innerWidth > 639) && (
            <div className="flex flex-col gap-4 w-full">
              <X
                onClick={() => setCollapsed(false)}
                className="self-end w-8 h-fit sm:hidden"
              />
              <RangeCalendar
                className="buurbak-light sm:hidden"
                value={date}
                onChange={setDate}
              />
              <DateRangePicker
                label="Datum"
                labelPlacement="outside"
                className="buurbak-light hidden sm:block"
                value={date}
                onChange={setDate}
                minValue={today(getLocalTimeZone())}
                isDateUnavailable={(date) =>
                  disabledRangesArray.some(
                    (interval) =>
                      date.compare(interval[0]) >= 0 &&
                      date.compare(interval[1]) <= 0
                  )
                }
              />

              {/* <Autocomplete
                label="ophaaltijd"
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
              </Autocomplete> */}
              <hr className="w-full h-1 bg-offWhite-100" />
              <div className="w-full flex justify-between">
                <p className="text-h6 text-primary-100">Totaal</p>
                <p className="text-h6 text-primary-100">
                  € {trailerOffer.rental_price}
                </p>
              </div>
            </div>
          )}
          {!collapsed && (
            <Button
              label="Kies jouw datum"
              styling={`min-w-fit ${collapsed && "w-full"} sm:hidden`}
              buttonAction={() => setCollapsed(!collapsed)}
            />
          )}
          {(collapsed || window.innerWidth > 639) && (
            <Button
              label="Reserveer nu"
              styling={`min-w-fit ${
                (collapsed || window.innerWidth > 639) && "w-full"
              }`}
              submit={true}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default Reserveren;
