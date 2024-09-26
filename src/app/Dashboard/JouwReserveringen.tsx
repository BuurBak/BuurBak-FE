import React from "react";
import Image from "next/image";
import { ChevronDownIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const reserveringen = [
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp", // Pas dit pad aan voor andere afbeeldingen
    title: "Open aanhanger",
    date: "01/01/2024",
    status: "In behandeling",
  },
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp", // Pas dit pad aan voor andere afbeeldingen
    title: "Open aanhanger",
    date: "01/01/2024",
    status: "In behandeling",
  },
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp", // Pas dit pad aan voor andere afbeeldingen
    title: "Open aanhanger",
    date: "01/01/2024",
    status: "In behandeling",
  },

  // Voeg meer objecten toe voor extra reserveringen
];

export default function JouwReserveringen() {
  return (
    <div className="flex flex-col md:h-[530px] overflow-y-auto">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Jouw reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      {reserveringen.map((reservering, index) => (
        <div key={index} className="flex flex-row mb-8 border-b-2">
          <div className="relative aspect-square w-60">
            <Image
              src={reservering.imageSrc}
              alt={`Trailer image ${index + 1}`}
              fill
              sizes="100% 100%"
              priority={true}
              className="sm:rounded-md object-cover w-40 h-40"
            />
          </div>
          <div className="w-full flex flex-col">
            <div className=" grid grid-cols-2">
              <div className=" flex items-center justify-center font-semibold text-xl">
                {reservering.title}
              </div>
              <div className="p-2 flex items-center justify-center">
                <a
                  href=""
                  className="text-primary-100 border-1 rounded-xl p-1 border-primary-200"
                >
                  contact gegevens
                </a>
              </div>
              <div className=" flex items-center justify-center">
                <a
                  className="font-semibold flex-row inline-flex items-center"
                  href=""
                >
                  {reservering.date}
                  <CalendarDaysIcon className="h-4 w-4 ml-2 align-middle" />
                </a>
              </div>
              <div className="p-2 flex items-center justify-center">
                <a
                  className="font-semibold flex-row inline-flex items-center"
                  href=""
                >
                  Bekijk aanhanger{" "}
                  <ChevronDownIcon className="h-4 w-4 ml-2 align-middle" />
                </a>
              </div>
            </div>
            <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
            <a
              href=""
              className="text-primary-100 border-1 rounded-xl p-1 border-primary-200 w-32 mx-auto my-auto"
            >
              {reservering.status}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
