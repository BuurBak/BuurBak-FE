import React from "react";
import Image from "next/image";
import { ChevronDownIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const reserveringen = [
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
    title: "Open aanhanger",
    date: "01/01/2024",
    status: {
      label: "In behandeling", // Status benaming
      color: "bg-primary-100", // Status kleur
    },
  },
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
    title: "Gesloten aanhanger",
    date: "02/02/2024",
    status: {
      label: "Voltooid",
      color: "bg-succes-100",
    },
  },
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
    title: "Kapotte aanhanger",
    date: "03/03/2024",
    status: {
      label: "Geweigerd",
      color: "bg-error-100",
    },
  },
  {
    imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
    title: "Kapotte aanhanger",
    date: "03/03/2024",
    status: {
      label: "Geweigerd",
      color: "bg-error-100",
    },
  },
];

export default function JouwReserveringen() {
  return (
    <div className="flex flex-col md:max-h-[700px] ">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold p-2">Jouw reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      <div className="overflow-y-auto">
        {reserveringen.map((reservering, index) => (
          <div
            key={index}
            className="flex flex-row mb-8 border-b-2 md:w-[550px]"
          >
            <div className="relative aspect-square w-60 m-2">
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
              <div className=" md:grid grid-cols-2">
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
              <div
                className={`text-white rounded-xl p-2  w-32 m-2 mx-auto md:my-auto text-center ${reservering.status.color}`}
              >
                {reservering.status.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
