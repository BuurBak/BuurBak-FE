// Profiel.tsx
import React from "react";
import Image from "next/image";
import profielfoto from "../../../public/img/verhuurfoto.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import GegevensModal from "./GegevensModal";

export default function Profiel() {
  return (
    <>
      <div className="flex flex-col ">
        <div className="relative aspect-square ">
          <Image
            src={profielfoto}
            alt="Trailer image 1"
            fill
            sizes="100% 100%"
            priority={true}
            className="sm:rounded-md object-cover"
          />
        </div>
        <p className="text-center text-2xl font-bold m-4">Naam achternaam</p>
      </div>
      <div className="flex flex-col mt-8">
        {/* Vervang de oude link door de modal */}
        <div className="font-semibold flex-row inline-flex items-center">
          <GegevensModal />
          <ChevronRightIcon className="h-4 w-4 ml-2 align-middle" />
        </div>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        <a className="font-semibold flex-row inline-flex items-center" href="">
          Mijn Trailers
          <ChevronRightIcon className="h-4 w-4 ml-2 align-middle" />
        </a>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
    </>
  );
}