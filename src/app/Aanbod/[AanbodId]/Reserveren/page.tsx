"use client";

import Button from "@/app/Components/Button";
import Footer from "@/app/Components/Footer";
import { TrailerList } from "@/app/Types/TrailerList";
import { getToken } from "@/app/api/auth/Cookies";
import {
  fromDate,
  getLocalTimeZone,
  toCalendarDate,
} from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
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

type User = {
  id: string;
  name: string;
  email: string;
  roles: [
    {
      name: string;
    },
  ];
  iban: any;
  number: string;
  address: {
    id: string;
    city: string;
    number: string;
    street_name: string;
    postal_code: string;
  };
  profilePicture: any;
  date_of_birth: any;
};

const Page = ({ params }: { params: { AanbodId: string } }) => {
  const searchParams = useSearchParams();

  const [changeDate, setChangeDate] = useState<Boolean>(false);
  const [changeTime, setChangeTime] = useState<Boolean>(false);

  const [newDate, setNewDate] = useState({
    start: searchParams.get("dateStart"),
    end: searchParams.get("dateEnd"),
  });

  const [trailerOffer, setTrailerOffer] = useState<TrailerList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [reqLoading, setReqLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState({
    start: toCalendarDate(
      fromDate(new Date(newDate.start || ""), getLocalTimeZone())
    ),
    end: toCalendarDate(
      fromDate(new Date(newDate.end || ""), getLocalTimeZone())
    ),
  });
  const [user, setUser] = useState<User>();
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const pickUpTime = [
    { start: "9:00", end: "10:00" },
    { start: "18:00", end: "19:00" },
  ];

  const time = searchParams.get("time");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pilot.buurbak.nl/api/v1/traileroffers/${params.AanbodId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: TrailerList = await response.json();
        setTrailerOffer(data);
        if (time) {
          setValue("time", time);
        }
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    const account = async () => {
      try {
        const res = await fetch(
          "https://pilot.buurbak.nl/api/v1/customers/self",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + (await getToken("access_token")),
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const result: User = await res.json();
        setUser(result);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      } finally {
        setReqLoading(false);
      }
    };

    account();
  }, []);

  useEffect(() => {
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
  }, [date]);

  const merche = (item: { start: string; end: string }) =>
    item.start + " - " + item.end;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("test:", new Date(getValues("dateStart")).toISOString());
    setReqLoading(true);
    const reserve = async () => {
      try {
        const res = await fetch(
          "https://pilot.buurbak.nl/api/v1/reservations",
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + (await getToken("access_token")),
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              trailerId: trailerOffer?.id,
              startTime: new Date(getValues("dateStart")).toISOString(),
              endTime: new Date(getValues("dateEnd")).toISOString(),
              message: getValues("message"),
              name: user?.name,
              email: user?.email,
              number: user?.number,
            }),
          }
        );

        const result = await res.json();
        alert(result.message);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      } finally {
        setReqLoading(false);
      }
    };

    reserve();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col-reverse sm:flex-row w-dvw h-fit min-h-dvh">
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-h6">Op haal tijd</p>
              {!changeTime && (
                <p className="text-normal">{getValues("time")}</p>
              )}
              {changeTime && (
                <Autocomplete
                  aria-label="op haal tijd"
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
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                <p className="sm:w-8 text-h6">Naam:</p>
                <p className="text-normal">{user?.name}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                <p className="sm:w-8 text-h6">Mail:</p>
                <p className="text-normal">{user?.email}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                <p className="sm:w-8 text-h6">Tel:</p>
                <p className="text-normal">{user?.number}</p>
              </div>
            </div>
          </div>
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
            />
          </div>
        </div>
        <div className="flex flex-1 bg-offWhite-100">
          <div className="flex flex-col gap-3 h-fit w-full bg-white p-8 m-8 rounded-md sticky top-8">
            <div className="flex gap-2 w-full h-fit ">
              <div className="relative aspect-square h-32">
                {trailerOffer?.coverImage && (
                  <Image
                    src={trailerOffer?.coverImage}
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
                  {trailerOffer?.trailerType.name}
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
                  <p className="text-small">€ {trailerOffer?.price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-small">services kosten</p>
                  {trailerOffer?.price && (
                    <p className="text-small">€ {trailerOffer?.price * 0.1}</p>
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
                {trailerOffer?.price && (
                  <p className="text-normal">
                    € {trailerOffer?.price + trailerOffer?.price * 0.1 + 2}
                  </p>
                )}
              </div>
              {/* <p className="text-small text-gray-100">Incl. 13% btw</p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </form>
  );
};

export default Page;
