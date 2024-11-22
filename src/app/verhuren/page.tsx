import { ImageIcon, ImagesIcon } from "lucide-react";
import React from "react";
import InputField from "../Components/InputField";

const verhuren = () => {
  return (
    <div className="w-full h-fit flex flex-row pt-20 gap-5">
      <div className="w-2/3">
        <h1 className="text-center text-h3 font-bold">
          Maak jouw advertentie <br /> compleet
        </h1>
        <div className="flex flex-col mt-5 items-center">
          <hr className="w-11/12 h-1 bg-black-200 " />
        </div>
        <div className="flex flex-col items-center pt-5 gap-5">
          <div className="w-3/4 flex flex-col gap-5">
            <p className="font-bold">
              Kies de foto's die jouw aanhanger het beste representeren:
            </p>
            <div className="w-full flex flex-row items-start gap-5 rounded border-2 p-6 pl-10">
              <ImagesIcon className="size-9" />
              <div className="flex flex-col">
                <p>Sleep je foto's hierheen</p>
                <p className="underline">Upload tenminste 4 foto's</p>
              </div>
            </div>
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
                iconName="L"
                outline
                className="w-full"
              />
              <InputField
                inputType="text"
                label="Vul de breedte van je aanhanger in "
                icon
                iconLeft
                iconName="B"
                outline
                className="w-full"
              />
              <InputField
                inputType="text"
                label="Vul de hoogte van je aanhanger in "
                icon
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
            />
          </div>
          <div className="w-3/4">
            <p className="font-bold">
              Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
              ophaal:
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-offWhite-100"></div>
    </div>
  );
};

//TODO
// Kleur fixen oranje
// Meer tekst, tekst aan linkerkant flexbox
// sizes textboxes fixen
export default verhuren;
