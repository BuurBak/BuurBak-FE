"use client";

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
        <h1 className="text-center text-h3 font-bold">
          Maak jouw advertentie compleet
        </h1>
        <div className="flex flex-col mt-5 items-center ">
          <hr className="w-11/12 h-0.5 bg-black-200 " />
        </div>
        <div className="flex flex-col items-center pt-5 gap-5">
          <div className="w-3/4 flex flex-col gap-5">
            <p className="font-bold">
              Kies de foto's die jouw aanhanger het beste representeren:
            </p>
            <FileUpload />
          </div>
          <div className="w-3/4">
            <p className="font-bold ">Kies je soort aanhanger:</p>
          </div>
          <div className="w-3/4">
            <p className="font-bold">Geef een beschrijving voor de huurder:</p>
            <textarea
              id="message"
              className="flex flex-row mt-5 p-2.5 w-full h-32 rounded border-2 border-primary-100"
              placeholder="Typ een kleine beschrijving over je aanhanger..."
            />
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies de accesoires die je bij je aanhanger wilt verhuren:
            </p>
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
      <div className="w-1/3 bg-offWhite-100 min-h-screen"></div>
    </div>
  );
};

export default Verhuren;
