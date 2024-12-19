"use client";
import { Calendar, ChevronDown, EuroIcon, PinIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTrailers } from "../api/Trailer-controller";
import { TrailerData } from "../Types/Reservation";

export default function JouwReserveringen() {
  const [reserveringen, setReserveringen] = useState<TrailerData[] | undefined>(
    []
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getTrailers();
        setReserveringen(data);
        console.log("Jouw", data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="flex flex-col md:max-h-[700px] ">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold p-2">Jouw reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      <div className="overflow-y-auto">
        {reserveringen && reserveringen.length
          ? reserveringen.map((reservering: TrailerData, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-col mb-8 border-b-2 md:w-[550px]"
              >
                <div className="relative aspect-square md:w-60 w-full max-h-60 m-2">
                  <Image
                    src={reservering.images?.[0] || "/img/placeholder.jpg"}
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
                    <div className="flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center"
                        href=""
                      >
                        €{reservering.rental_price}
                        <EuroIcon className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center"
                        href=""
                      >
                        {new Date(reservering.created_at).toLocaleDateString()}
                        <Calendar className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center"
                        href=""
                      >
                        {reservering.address.city}
                        <PinIcon className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </a>
                    </div>
                    <div className="flex items-center justify-center">
                      <a
                        className="font-semibold flex-row inline-flex items-center text-md"
                        href=""
                      >
                        Bekijk aanhanger
                        <ChevronDown className="h-4 w-4 ml-2 align-middle" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="p-2 flex items-center justify-center">
                      <button className="text-white border-1 rounded-xl p-2 bg-primary-100">
                        Contact gegevens
                      </button>
                    </div>
                    {/* <div
                      className={`rounded-xl p-2 w-32 m-2 mx-auto md:my-auto text-center ${reservering.status?.color || "text-gray-500"}`}
                    >
                      {reservering.status?.label || "Status onbekend"}
                    </div> */}
                  </div>
                </div>
              </div>
            ))
          : "Er zijn geen reserveringen beschikbaar."}
      </div>
    </div>
  );
}
