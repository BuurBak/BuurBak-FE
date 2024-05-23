"use client";

import Button from "@/app/Components/Button";
import Checkmark from "@/app/Components/Checkmark";
import Footer from "@/app/Components/Footer";
import { TrailerList } from "@/app/Types/TrailerList";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { DateRangePicker } from "@nextui-org/date-picker";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  dateStart: Date;
  dateEnd: Date;
  time: string;
};

const page = ({ params }: { params: { AanbodId: string } }) => {
  const searchParams = useSearchParams();

  const [changeDate, setChangeDate] = useState<Boolean>(false);
  const [changeTime, setChangeTime] = useState<Boolean>(false);
  const [changeName, setChangeName] = useState<Boolean>(false);

  const [newDate, setNewDate] = useState({
    start: searchParams.get("dateStart"),
    end: searchParams.get("dateEnd"),
  });

  const [trailerOffer, setTrailerOffer] = useState<TrailerList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState({
    start: fromDate(new Date(newDate.start || ""), getLocalTimeZone()),
    end: fromDate(new Date(newDate.end || ""), getLocalTimeZone()),
  });
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>();

  const pickUpTime = [
    { start: "9:00", end: "10:00" },
    { start: "18:00", end: "19:00" },
  ];

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
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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
  }, [date]);

  const merche = (item: { start: string; end: string }) =>
    item.start + " - " + item.end;

  const time = searchParams.get("time");
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row w-dvw h-fit min-h-dvh">
        <div className="flex flex-col justify-center gap-10 flex-1 px-4 py-4">
          <h1 className="text-primary-100 text-h4">Reserveer uw aanhanger</h1>
          <div className="flex justify-between items-center">
            {newDate.start && newDate.end && (
              <div className="flex flex-col gap-1">
                <p className="text-h6">Datum van jou reservering</p>
                {!changeDate && (
                  <p className="text-normal">
                    {new Date(getValues("dateStart")).toLocaleDateString(
                      undefined,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(getValues("dateEnd")).toLocaleDateString(
                      undefined,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      }
                    )}
                  </p>
                )}
                {changeDate && (
                  <DateRangePicker
                    label=" "
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
              {!changeTime && <p className="text-normal">{time}</p>}
              {changeTime && (
                <Autocomplete
                  label=" "
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
                <p className="text-normal">Een naam</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                <p className="sm:w-8 text-h6">Mail:</p>
                <p className="text-normal">een mail</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-10 sm:items-center">
                <p className="sm:w-8 text-h6">Tel:</p>
                <p className="text-normal">123452345</p>
              </div>
            </div>
            <Button label="Aanpassen" type="secondary" />
          </div>
          <textarea
            placeholder="Bericht aan verhuurder"
            className="w-full h-20 p-2 border border-gray-100 resize-y"
          />
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center gap-2 z-10"
              onClick={() => setChecked(!checked)}
            >
              <Checkmark checked={checked} />
              <p className="">
                Ik accepteer de{" "}
                <span
                  className="z-30 text-primary-100"
                  onClick={() => alert("clicked voorwaarden")}
                >
                  algemene voorwaarden
                </span>{" "}
                en de privacy policy
              </p>
            </div>
            <Button label="Reserveer jouw aanhanger" styling="w-full" />
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
                  <p className="text-small">234</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-small">Registratie kosten</p>
                  <p className="text-small">234</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-small">Borg</p>
                  <p className="text-small">234</p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="text-normal">Totaal</p>
                <p className="text-normal">23423</p>
              </div>
              <p className="text-small text-gray-100">Incl. 13% btw</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
