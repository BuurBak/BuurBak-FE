import { ImageIcon, ImagesIcon } from "lucide-react";
import React from "react";

const verhuren = () => {
  return (
    <div className="w-full h-dvh flex flex-row pt-20">
      <div className="w-2/3 h-full">
        <h1 className="text-center">Maak jouw advertentie compleet</h1>
        <hr className="w-full h-1 bg-black-200" />

        <div className="flex flex-row items-center justify-start gap-6 rounded border-2 mt-5 p-6">
          <ImagesIcon className="size-9" />
          <div className="flex flex-col">
            <p>Sleep je foto's hierheen</p>
            <p className="underline">Upload tenminste 4 foto's</p>
          </div>
        </div>
      </div>

      <div className="w-1/3 h-full bg-offWhite-100"></div>
    </div>
  );
};

export default verhuren;
