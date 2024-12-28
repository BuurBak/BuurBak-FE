"use client";
import { Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";
import { getReservationsRequests } from "../api/Reservations-controller";

import { useEffect, useState } from "react";

// const reserveringen: any[] = [
//   {
//     imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
//     title: "Open aanhanger",
//     date: "01/01/2024",
//     location: "utrecht",
//     price: "50,00",
//     status: {
//       label: "In behandeling",
//       color: "text-primary-100",
//     },
//   },
//   {
//     imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
//     title: "Gesloten aanhanger",
//     date: "02/02/2024",
//     location: "utrecht",
//     price: "50,00",
//     status: {
//       label: "Voltooid",
//       color: "text-succes-100",
//     },
//   },
//   {
//     imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
//     title: "Kapotte aanhanger",
//     date: "03/03/2024",
//     location: "utrecht",
//     price: "50,00",
//     status: {
//       label: "Geweigerd",
//       color: "text-error-100",
//     },
//   },
//   {
//     imageSrc: "/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp",
//     title: "Kapotte aanhanger",
//     date: "03/03/2024",
//     location: "utrecht",
//     price: "50,00",
//     status: {
//       label: "Geweigerd",
//       color: "text-error-100",
//     },
//   },
// ];

export default function TrailerReserveringen() {
  const [reserveringen, setReserveringen] = useState<any[] | undefined>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getReservationsRequests();
        setReserveringen(data); // Zet de ontvangen data in de state
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);
  return (
    <div className="flex flex-col md:max-h-[700px] ">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold p-2">Trailer reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      <div className="overflow-y-auto">
        {reserveringen && reserveringen.length
          ? reserveringen.map((reservering, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-col mb-8 border-b-2 md:w-[550px]"
              >
                <div className="relative aspect-square md:w-60 w-full max-h-60 m-2">
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
                  <div className="font-semibold text-xl p-2">
                    {reservering.title}
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className=" flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center"
                        href=""
                      >
                        {reservering.date}
                        <Calendar className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </a>
                    </div>

                    <div className=" flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center text-md"
                        href=""
                      >
                        Bekijk aanhanger{" "}
                        <ChevronDown className="h-4 w-4 ml-2 align-middle" />
                      </a>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <button className="text-white border-1 rounded-xl md:p-2 p-1 bg-primary-100">
                        Contact gegevens
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="p-2 flex items-center justify-center">
                      <button className="text-white border-1 rounded-xl p-2 bg-succes-100">
                        Accepteren
                      </button>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <button className="text-white border-1 rounded-xl p-2 bg-error-100">
                        weigeren
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "U heeft momenteel geen openstaande reserveringen."}
      </div>
    </div>
  );
}
