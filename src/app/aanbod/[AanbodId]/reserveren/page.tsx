"use client";

import Button from "@/app/Components/Button";
import type { PostReservations, TrailerData } from "@/app/Types/Reservation";
import type { SupaUser } from "@/app/Types/User";
import { postReservations } from "@/app/api/Reservations-controller";
import { getTrailer } from "@/app/api/Trailer-controller";
import { useToast } from "@/app/hooks/use-toast";
import { getUserSupaBase } from "@/lib/authUtil";
import { hasToken } from "@/lib/cookieUtil";
import {
  type CalendarDate,
  fromDate,
  getLocalTimeZone,
  toCalendarDate,
} from "@internationalized/date";
import type { RangeValue } from "@heroui/calendar";
import { Checkbox } from "@heroui/checkbox";
import { DateRangePicker } from "@heroui/date-picker";
import { format, parseISO } from "date-fns";
import { nl } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  dateStart: string;
  dateEnd: string;
  time: string;
  message: string;
  terms: boolean;
};

const Page = ({ params }: { params: { AanbodId: string } }) => {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [changeDate, setChangeDate] = useState<boolean>(false);
  const [changeTime, setChangeTime] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [newDate, setNewDate] = useState({
    start: searchParams.get("dateStart"),
    end: searchParams.get("dateEnd"),
  });

  const [trailerOffer, setTrailerOffer] = useState<TrailerData>();
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

  const calcDate = (): number => {
    const d1 = new Date(watch("dateStart"));
    const d2 = new Date(watch("dateEnd"));

    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysDiff === 0 ? 1 : daysDiff + 1;
  };

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

  const onError = (fieldsErrors: any) => {
    for (const fieldName in fieldsErrors) {
      toast({
        title: `${
          !user
            ? "Je moet ingelogd zijn om een trailer te kunnen reserveren"
            : ""
        } ${!user && !terms ? "en" : ""}  ${
          !terms
            ? "Accepteer nog even de voorwaarden voordat wij je trailer kunnen reserveren"
            : ""
        }`,
        duration: 6000,
        variant: "error",
      });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    setIsSubmitting(true);
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
        setTimeout(() => {
          toast({
            title: "Dit duurd wat langer dan verwacht",
            description:
              "Wij zijn bezig met het klaar zetten van de betaal link zodra deze klaar is wordt hij automatisch geopend",
          });
        }, 2000);
        setIsSubmitting(false);
      } else {
        console.error(res.message);
        if (
          res.message ===
          "Another reservation is already scheduled at that time!"
        )
          toast({
            title: "Deze aanhanger is helaas al gerserveerd op deze dag",
            variant: "error",
          });
        if (
          res.message ===
          "Unauthorized: A valid JWT token is required to access this resource."
        )
          toast({
            title:
              "Log eerst in of maak een account aan om een trailer te reserveren",
            variant: "error",
          });
        else {
          toast({
            title: "Er is helaas iets mis gegaan probeer het later nog eens",
            variant: "error",
          });
        }
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              className="hidden sm:block"
              onClick={() => setChangeDate(!changeDate)}
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
              onClick={() => setChangeTime(!changeTime)}
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
                <Link
                  href={
                    "https://drive.google.com/file/d/1D9S05Qn7hC3bsEi_ElAqz8uX1s6Se5UZ/view"
                  }
                  target="_blank"
                  className="z-30 text-primary-100"
                >
                  algemene voorwaarden
                </Link>{" "}
                en de{" "}
                <Link
                  href={
                    "https://drive.google.com/file/d/12uOHI1prSnsfgaYo3nR8YhIy0UNVzukr/view"
                  }
                  target="_blank"
                  className="z-30 text-primary-100"
                >
                  privacy policy
                </Link>
              </p>
            </div>
            <Button
              label={
                isSubmitting
                  ? "Bezig met reserveren..."
                  : "Reserveer jouw aanhanger"
              }
              className="w-full"
              submit={true}
              disabled={user === undefined || !terms || isSubmitting}
            />
          </div>
        </div>
        <div className="flex flex-1 bg-offWhite-100">
          <div className="flex flex-col gap-3 h-fit w-full bg-white p-8 m-8 rounded-md sticky top-24">
            <div className="flex gap-2 w-full h-fit ">
              <div className="relative aspect-square h-32">
                {trailerOffer?.images[0] && (
                  <Image
                    src={trailerOffer?.images[0] || "/placeholder.svg"}
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
                  <p className="text-small">
                    €
                    {trailerOffer
                      ? (trailerOffer?.rental_price * calcDate()).toFixed(2)
                      : ""}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-small">services kosten</p>
                  {trailerOffer?.rental_price && (
                    <p className="text-small">
                      € {(trailerOffer?.rental_price * 0.1).toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-small">Huurder bescherming</p>
                  <p className="text-small">€ {(2).toFixed(2)}</p>
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
                    {(
                      trailerOffer?.rental_price * calcDate() +
                      trailerOffer?.rental_price * 0.1 +
                      2
                    ).toFixed(2)}
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
