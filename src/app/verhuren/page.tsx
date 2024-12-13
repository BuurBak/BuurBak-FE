"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import FileUpload from "../Components/UploadFile";
import { PostTrailer } from "../Types/TrailerType";

const getDayAbbreviation = (day: keyof PostTrailer["availability"]) => {
  switch (day) {
    case "monday":
      return "Ma";
    case "tuesday":
      return "Di";
    case "wednesday":
      return "Wo";
    case "thursday":
      return "Do";
    case "friday":
      return "Vr";
    case "saturday":
      return "Za";
    case "sunday":
      return "Zo";
    default:
      return "";
  }
};

type DayState = {
  [key in
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday"]: boolean;
};

const Verhuren = () => {
  const form = useForm<PostTrailer>({
    defaultValues: {
      accessories: [],
      address: { city: "", house_number: "", postal_code: "", street_name: "" },
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      car_driving_license: "",
      description: "",
      dimensions: { height: 0, length: 0, width: 0 },
      images: [],
      location: { latitude: 0, longitude: 0 },
      rental_price: 0,
      title: "",
      trailer_type: "",
    },
  });
  const { register, handleSubmit, formState, setValue, watch, getValues } =
    form;
  const { errors } = formState;

  const [days, setDays] = useState<DayState>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const dagen: string[] = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
  const license: string[] = ["A", "B", "C"];
  const soortAanhanger: string[] = [
    "Open Aanhanger",
    "Gesloten Aanhanger",
    "Motorfiets Aanhanger",
    "Bagage Aanhanger",
    "Fietsen Aanhanger",
    "Overig",
  ];
  const accesoires: string[] = [
    "Disselslot",
    "Oprijplaten",
    "7 naar 13 polige adapter",
    "13 naar 7 polige adapter",
    "Afdek Zijl",
    "Afdek Net",
    "Pionnen",
    "Kruiwagen",
    "Lange Lading bord",
  ];

  const toggleDay = (day: keyof PostTrailer["availability"]) => {
    setValue(`availability.${day}`, !watch(`availability.${day}`));
  };

  const onSubmit = (data: PostTrailer) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-screen h-fit flex flex-col sm:flex-row pt-20 gap-5">
      <div className="w-2/3">
        <h1 className="text-center text-h3 font-bold">
          Maak jouw advertentie compleet
        </h1>
        <div className="flex flex-col mt-5 items-center ">
          <hr className="w-11/12 h-0.5 bg-black-200 " />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center pt-5 gap-5"
          noValidate
        >
          <div className="w-3/4 flex flex-col gap-5">
            <p className="font-bold">
              Kies de foto's die jouw aanhanger het beste representeren:
            </p>
            <FileUpload />
          </div>
          <div className="w-3/4">
            <p className="font-bold ">Kies je soort aanhanger:</p>
            <Autocomplete
              className="w-full buurbak-light border-primary-100 rounded border-1"
              placeholder="Soort..."
              aria-label="trailer_type"
              {...register("trailer_type")}
            >
              {soortAanhanger.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
                  aria-label={item}
                  className="buurbak-light "
                >
                  {item}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="w-3/4">
            <p className="font-bold">Geef een beschrijving voor de huurder:</p>
            <textarea
              id="message"
              className="flex flex-row mt-5 p-2.5 w-full h-32 rounded border-1 border-primary-100"
              placeholder="Typ een kleine beschrijving over je aanhanger..."
              aria-label="description"
              {...register("description")}
            />
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies de accesoires die je bij je aanhanger wilt verhuren:
            </p>
            <Autocomplete
              className="w-full buurbak-light border-primary-100 rounded border-1"
              placeholder="Accesoires..."
              aria-label="accessories"
              {...register("accessories")}
            >
              {accesoires.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
                  aria-label={item}
                  className="buurbak-light "
                >
                  {item}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies de locatie waar je je aanhanger vanaf verhuurd:
            </p>
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies het soort rijbewijs wat vereist is:
            </p>
            <Autocomplete
              className="w-full buurbak-light border-primary-100 rounded border-1"
              placeholder="Rijbewijs..."
              aria-label="car_driving_license"
              {...register("car_driving_license")}
            >
              {license.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
                  aria-label={item}
                  className="buurbak-light "
                >
                  {item}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="flex flex-col w-3/4 gap-5">
            <p className="font-bold">Vul de afmetingen van je aanhanger in:</p>
            <div className="flex flex-col gap-3 w-full">
              <InputField
                inputType="text"
                label="Vul de lengte van je aanhanger in "
                icon
                iconLeft
                type="number"
                iconName="L"
                outline
                className="w-full"
                {...register("dimensions.length", { valueAsNumber: true })}
              />
              <InputField
                inputType="text"
                label="Vul de breedte van je aanhanger in "
                icon
                iconLeft
                type="number"
                iconName="B"
                outline
                className="w-full"
                {...register("dimensions.width", { valueAsNumber: true })}
              />
              <InputField
                inputType="text"
                label="Vul de hoogte van je aanhanger in "
                icon
                iconLeft
                type="number"
                iconName="H"
                outline
                className="w-full"
                {...register("dimensions.height", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="flex flex-col w-3/4 gap-5">
            <p className="font-bold">
              Voor hoeveel € wil je je aanhanger verhuren:
            </p>
            <InputField
              inputType="text"
              label="Prijs... "
              icon
              iconLeft
              iconName="Euro"
              outline
              className="w-full"
              type="number"
              {...register("rental_price", { valueAsNumber: true })}
            />
          </div>
          <div className="flex flex-col gap-5 w-3/4">
            <p className="font-bold">
              Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
              ophaal:
            </p>
            <div className="flex flex-row gap-3 w-full">
              {(
                Object.keys(getValues().availability) as Array<
                  keyof PostTrailer["availability"]
                >
              ).map((day) => (
                <div
                  key={day}
                  aria-label={day}
                  className={`flex flex-col items-center justify-center rounded w-14 h-20 cursor-pointer ${
                    watch(`availability.${day}`)
                      ? "bg-primary-100 text-white"
                      : "bg-offWhite-100"
                  }`}
                  onClick={() => toggleDay(day)}
                >
                  <p className="font-bold">{getDayAbbreviation(day)}</p>
                  {watch(`availability.${day}`) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button label="Voeg jouw trailer toe" submit></Button>
        </form>
      </div>
      <div className="w-1/3 bg-offWhite-100 min-h-screen"></div>
    </div>
  );
};

export default Verhuren;
