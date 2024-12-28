"use client";

import Button from "@/app/Components/Button";
import { PostReservations, TrailerData } from "@/app/Types/Reservation";
import { SupaUser } from "@/app/Types/User";
import { postReservations } from "@/app/api/Reservations-controller";
import { getTrailer } from "@/app/api/Trailer-controller";
import { hasToken } from "@/app/api/auth/Cookies";
import { getUserSupaBase } from "@/app/api/auth/Register";
import {
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  toCalendarDate,
} from "@internationalized/date";
import { RangeValue } from "@nextui-org/calendar";
import { Checkbox } from "@nextui-org/checkbox";
import { DateRangePicker } from "@nextui-org/date-picker";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  dateStart: string;
  dateEnd: string;
  time: string;
  message: string;
  terms: boolean;
};

const Page = ({ params }: { params: { AanbodId: string } }) => {
  const searchParams = useSearchParams();

  const [changeDate, setChangeDate] = useState<Boolean>(false);
  const [changeTime, setChangeTime] = useState<Boolean>(false);

  const [newDate, setNewDate] = useState({
    start: searchParams.get("dateStart"),
    end: searchParams.get("dateEnd"),
  });

  const [trailerOffer, setTrailerOffer] = useState<TrailerData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [reqLoading, setReqLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState<RangeValue<CalendarDate> | null>({
    start: toCalendarDate(
      fromDate(new Date(newDate.start || ""), getLocalTimeZone())
    ),
    end: toCalendarDate(
      fromDate(new Date(newDate.end || ""), getLocalTimeZone())
    ),
  });
  const [user, setUser] = useState<SupaUser>();
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<Inputs>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrailer(params.AanbodId);
        setTrailerOffer(data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();

    const account = async () => {
      if (await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token")) {
        const data = await getUserSupaBase();
        setUser(data.data.user);
      } else {
        console.error(user);
      }
    };

    account();
  }, []);

  useEffect(() => {
    if (date) {
      setValue("dateStart", date.start.toString(), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      setValue("dateEnd", date.end.toString(), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [date]);

  const formatDate = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  const terms = watch("terms");

  const onSubmit: SubmitHandler<Inputs> = async () => {
    if (trailerOffer && user) {
      const startDate = new Date(getValues("dateStart"));
      const endDate = new Date(getValues("dateEnd"));

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const data: PostReservations = {
        trailer_uuid: trailerOffer.uuid,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        message: getValues("message"),
        pick_up_time: "14:30:00",
      };
      const res = await postReservations(data);
      if (res.session) {
        window.open(res.session, "_blank");
      } else {
        console.error(res.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col-reverse sm:flex-row w-dvw h-fit min-h-dvh mt-[88px]">
        <div className="flex flex-col justify-center gap-10 flex-1 px-4 py-4">
          <h1 className="text-primary-100 text-h4">Reserveer uw aanhanger</h1>
          <div className="flex justify-between items-center">
            {newDate.start && newDate.end && (
              <div className="flex flex-col gap-1">
                <p className="text-h6">Datum van jou reservering</p>
                {!changeDate && (
                  <p className="text-normal">
                    {getValues("dateStart") &&
                      getValues("dateEnd") &&
                      `${format(
                        parseISO(getValues("dateStart")),
                        "d MMMM yyyy",
                        {
                          locale: nl,
                        }
                      )} 
                    tot 
                    ${format(parseISO(getValues("dateEnd")), "d MMMM yyyy", {
                      locale: nl,
                    })}`}
                  </p>
                )}
                {changeDate && (
                  <DateRangePicker
                    aria-label="datum prikker"
                    labelPlacement="outside"
                    className="buurbak-light hidden sm:block"
                    value={date}
                    onChange={setDate}
                  />
                )}
              </div>
            )}
            <Button
              label="Aanpassen"
              type="secondary"
              buttonAction={() => setChangeDate(!changeDate)}
            />
          </div>
          {/* <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-h6">Ophaaltijd</p>
              {!changeTime && (
                <p className="text-normal">{getValues("time")}</p>
              )}
              {changeTime && (
                <Autocomplete
                  aria-label="ophaaltijd"
                  className="w-full buurbak-light"
                  labelPlacement="outside"
                  placeholder=" "
                  defaultInputValue={getValues("time")}
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
              )}
            </div>
            <Button
              label="Aanpassen"
              type="secondary"
              buttonAction={() => setChangeTime(!changeTime)}
            />
          </div> */}
          {user ? (
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                  <p className="sm:w-8 text-h6">Naam:</p>
                  <p className="text-normal">{user?.user_metadata.name}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                  <p className="sm:w-8 text-h6">Mail:</p>
                  <p className="text-normal">{user?.email}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                  <p className="sm:w-8 text-h6">Tel:</p>
                  <p className="text-normal">
                    {user?.user_metadata.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <textarea
            placeholder="Bericht aan verhuurder"
            className="w-full h-20 p-2 border border-gray-100 resize-y"
            {...register("message")}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 z-10">
              <Checkbox
                className="buurbak-light"
                {...register("terms", {
                  required: true,
                })}
              />
              <p className="">
                Ik accepteer de{" "}
                <span className="z-30 text-primary-100">
                  algemene voorwaarden
                </span>{" "}
                en de{" "}
                <span className="z-30 text-primary-100">privacy policy</span>
              </p>
            </div>
            <Button
              label="Reserveer jouw aanhanger"
              styling="w-full"
              submit={true}
              disabled={user === undefined || !terms}
            />
          </div>
        </div>
        <div className="flex flex-1 bg-offWhite-100">
          <div className="flex flex-col gap-3 h-fit w-full bg-white p-8 m-8 rounded-md sticky top-24">
            <div className="flex gap-2 w-full h-fit ">
              <div className="relative aspect-square h-32">
                {trailerOffer?.images[0] && (
                  <Image
                    src={trailerOffer?.images[0]}
                    alt="Trailer image 1"
                    fill
                    sizes="100% 100%"
                    priority={true}
                    className="sm:rounded-md object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-primary-100 text-h5">
                  {trailerOffer?.trailer_type}
                </p>
                <p className="text-normal">{trailerOffer?.address.city}</p>
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-4 w-full h-fit">
              <p className="text-normal">Prijsinformatie</p>
              <div className="flex flex-col gap-2 w-full h-fit">
                <div className="flex justify-between">
                  <p className="text-small">Aanhanger</p>
                  <p className="text-small">€ {trailerOffer?.rental_price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-small">services kosten</p>
                  {trailerOffer?.rental_price && (
                    <p className="text-small">
                      € {trailerOffer?.rental_price * 0.1}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-small">Huurder bescherming</p>
                  <p className="text-small">€ 2</p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="text-normal">Totaal</p>
                {trailerOffer?.rental_price && (
                  <p className="text-normal">
                    €{" "}
                    {trailerOffer?.rental_price +
                      trailerOffer?.rental_price * 0.1 +
                      2}
                  </p>
                )}
              </div>
              {/* <p className="text-small text-gray-100">Incl. 13% btw</p> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
