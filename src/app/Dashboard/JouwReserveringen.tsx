import React from "react";
import Image from "next/image";
import aanhanger from "../../../public/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp";

export default function JouwReserveringen() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Jouw reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      <div className="flex flex-row">
        <div className="relative aspect-square w-60">
          <Image
            src={aanhanger}
            alt="Trailer image 1"
            fill
            sizes="100% 100%"
            priority={true}
            className="sm:rounded-md object-cover w-40 h-40"
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              Open aanhanger
            </div>
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              <p className="text-primary-100 border-1">contact gegevens</p>
            </div>
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              Item 3
            </div>
            <div className="bg-gray-200 p-4 flex items-center justify-center">
              Item 4
            </div>
          </div>
          <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        </div>
      </div>
    </div>
  );
}
