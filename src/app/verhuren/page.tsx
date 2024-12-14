"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Check, X } from "lucide-react";
import { useState } from "react";
import InputField from "../Components/InputField";
import FileUpload from "../Components/UploadFile";

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

  const toggleDay = (day: keyof DayState) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const getDayAbbreviation = (day: string) => {
    return day.slice(0, 2).charAt(0).toUpperCase() + day.slice(0, 2).charAt(1);
  };

  return (
    <div className="w-full min-h-screen h-fit flex flex-col sm:flex-row pt-20 gap-5">
      <div className="w-2/3">
        <h1 className="text-center text-h3 font-bold mt-2">
          Maak jouw advertentie compleet
        </h1>
        <div className="flex flex-col mt-5 items-center gap-5">
          <hr className="w-11/12 h-0.5 bg-black-200 " />
        </div>
        <div className="flex flex-col items-center pt-5 gap-5">
          <div className="w-3/4 flex flex-col gap-5">
            <p className="font-bold">
              Kies de foto's die jouw aanhanger het beste representeren:
            </p>
            <FileUpload />
          </div>
          <div className="w-3/4 ">
            <p className="font-bold">Kies je soort aanhanger:</p>
            <Autocomplete
              className="w-full buurbak-light mt-5 border-primary-100 rounded border-1"
              placeholder="Soort..."
            >
              {soortAanhanger.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
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
            />
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies de accesoires die je bij je aanhanger wilt verhuren:
            </p>
            <Autocomplete
              className="w-full buurbak-light mt-5 border-primary-100 rounded border-1"
              placeholder="Accesoires..."
            >
              {accesoires.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
                  className="buurbak-light "
                >
                  {item}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
          <div className="w-3/4 gap-5">
            <p className="font-bold">
              Kies de locatie waar je je aanhanger vanaf verhuurd:
            </p>
          </div>
          <div className="w-3/4 gap-5">
            <p className="font-bold">
              Kies het soort rijbewijs wat vereist is:
            </p>
            <Autocomplete
              className="w-full buurbak-light mt-5 border-primary-100 rounded border-1"
              placeholder="Rijbewijs..."
            >
              {license.map((item, index) => (
                <AutocompleteItem
                  key={index}
                  value={item}
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
              />
              <InputField
                inputType="text"
                label="Vul de breedte van je aanhanger in "
                icon
                type="number"
                iconLeft
                iconName="B"
                outline
                className="w-full"
              />
              <InputField
                inputType="text"
                label="Vul de hoogte van je aanhanger in "
                icon
                type="number"
                iconLeft
                iconName="H"
                outline
                className="w-full"
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
            />
          </div>
          <div className="flex flex-col gap-5 w-3/4">
            <p className="font-bold">
              Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
              ophaal:
            </p>
            <div className="flex flex-row gap-3 w-full">
              {(Object.entries(days) as [keyof DayState, boolean][]).map(
                ([day, isSelected]) => (
                  <div
                    key={day}
                    className={`flex flex-col items-center justify-center rounded w-14 h-20 cursor-pointer ${
                      isSelected
                        ? "bg-primary-100 text-white"
                        : "bg-offWhite-100"
                    }`}
                    onClick={() => toggleDay(day)}
                  >
                    <p className="font-bold">{getDayAbbreviation(day)}</p>
                    {isSelected ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3 bg-offWhite-100 min-h-screen p-5">
        <div className="flex flex-row gap-1">
          <img
            src="/img/verhuurfoto.png"
            alt="Verhuurde Aanhanger"
            className="w-2/4 h-auto rounded-lg"
          />
          <div className="w-2/4 flex flex-col gap-1">
            <div className=" w-2/4 flex flex-row gap-1">
              <img
                src="/img/verhuurfoto.png"
                alt="Verhuurde Aanhanger"
                className="w-full h-auto rounded-lg"
              />{" "}
              <img
                src="/img/verhuurfoto.png"
                alt="Verhuurde Aanhanger"
                className="w-full h-auto rounded-lg"
              />{" "}
            </div>
            <div className="w-2/4 flex flex-row gap-1">
              <img
                src="/img/verhuurfoto.png"
                alt="Verhuurde Aanhanger"
                className="w-full h-auto rounded-lg"
              />{" "}
              <img
                src="/img/verhuurfoto.png"
                alt="Verhuurde Aanhanger"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h6 className="flex flex-row text-primary-100 font-bold">
            Gesloten Aanhanger
          </h6>
          <p className="text-gray-100">Omschrijving:</p>
        </div>
        <div className="flex flex-col p-2 gap-3 items-center">
          <hr className="w-full h-0.5 bg-black-100 "></hr>
          <h4 className="font-bold">Locatie</h4>
          <h6>Hilversum</h6>
          <h4 className="font-bold">Prijs</h4>
          <h6>€100 per dag</h6>
          <hr className="w-full h-0.5 bg-black-100 "></hr>
        </div>
        <div className="flex mt-2 justify-center">
          <h4 className="font-bold">Details</h4>
        </div>
        <div className="flex flex-col justify-start"></div>
        <p className="font-bold mt-5">Benodigd Rijbewijs</p>
        <div className="flex flex-row">
          <p className="bg-gray-100 mt-3">Rijbewijs</p>
          <p className="mt-3 bg-gray-100 pl-20">B</p>
        </div>
      </div>
    </div>
  );
};

export default Verhuren;
