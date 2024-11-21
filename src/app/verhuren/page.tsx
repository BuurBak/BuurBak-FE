import { ImageIcon, ImagesIcon } from "lucide-react";
import React from "react";

const verhuren = () => {
  return (
    <div className="w-full h-dvh flex flex-row pt-20 gap-5">
      <div className="w-2/3 h-full">
        <h1 className="text-center text-h3">Maak jouw advertentie compleet</h1>
        <hr className="w-3/4 h-1 bg-black-200" />
        <div className="flex flex-col items-center pt-5 gap-5">
          <p className="font-bold">
            Kies de foto's die jouw aanhanger het beste representeren:
          </p>
          <div className="w-1/2 flex flex-row justify-start items-start gap-5 rounded border-2 p-6">
            <ImagesIcon className="size-9" />
            <div className="flex flex-col">
              <p>Sleep je foto's hierheen</p>
              <p className="underline">Upload tenminste 4 foto's</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Kies je soort aanhanger:</p>
          </div>
          <div className="">
            <p className="font-bold">Geef een beschrijving voor de huurder:</p>
            <textarea
              id="message"
              rows="4"
              className="flex flex-row mt-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-orange-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-orange-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Typ een kleine beschrijving over je aanhanger..."
            ></textarea>
          </div>
          <div>
            <p className="font-bold">
              Kies de accesoires die je bij je aanhanger wilt verhuren:
            </p>
          </div>
          <div>
            <p className="font-bold">
              Kies de locatie waar je je aanhanger vanaf verhuurd:
            </p>
          </div>
          <div>
            <p className="font-bold">
              Kies het soort rijbewijs wat vereist is:
            </p>
          </div>
          <div>
            <p className="font-bold">Vul de afmetingen van je aanhanger in:</p>
          </div>
          <div>
            <p className="font-bold">
              Voor hoeveel € wil je je aanhanger verhuren:
            </p>
          </div>
          <div>
            <p className="font-bold">
              Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
              ophaal:
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full bg-offWhite-100"></div>
    </div>
  );
};

//TODO
// Kleur fixen oranje
// Meer tekst, tekst aan linkerkant flexbox
// sizes textboxes fixen
export default verhuren;
