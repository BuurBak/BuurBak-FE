"use client";
import { Calendar, ChevronDown, EuroIcon, PinIcon } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cancelTrailer } from "../api/Reservations-controller";
import { getTrailers } from "../api/Trailer-controller";
import Button from "../Components/Button";
import { useToast } from "../hooks/use-toast";
import { CancelTrailer, TrailerData } from "../Types/Reservation";

export default function TrailerReserveringen() {
  const [reserveringen, setReserveringen] = useState<TrailerData[]>([]);
  const [cnlReason, setCnlReason] = useState<string>(
    "De eigenaar van de trailer heeft helaas deze reservering geweigerd"
  );

  const { toast } = useToast();

  const handleCancel = async () => {
    const cancelData: CancelTrailer = {
      reason: cnlReason,
      reservation_id: 0,
    };
    const res: any = await cancelTrailer(cancelData);
    if (res.status !== 200) {
      toast({
        title: "Er klopt iets niet!",
        description:
          "Er is helaas wat mis gegaan met het weigeren van deze trailer.",
        duration: 5000, // Show for 5 seconds
        variant: "error",
      });
    } else {
      toast({
        title: "Gelukt!",
        description: "De aanhanger is geannuleerd",
        duration: 5000, // Show for 5 seconds
      });
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getTrailers();
        if (data) {
          setReserveringen(data);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="flex flex-col md:max-h-[700px] ">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold p-2">Aanhanger reserveringen</p>
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
                      <p className="font-semibold flex-row inline-flex items-center">
                        {reservering.rental_price}
                        <EuroIcon className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="font-semibold flex-row inline-flex items-center">
                        {new Date(reservering.created_at).toLocaleDateString()}
                        <Calendar className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="font-semibold flex-row inline-flex items-center">
                        {reservering.address.city}
                        <PinIcon className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link
                        className="font-semibold flex-row inline-flex items-center text-md"
                        href={`/aanbod/${reservering.uuid}`}
                      >
                        Bekijk aanhanger
                        <ChevronDown className="h-4 w-4 ml-2 align-middle" />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="p-2 flex items-center justify-center w-full">
                    <Button
                      label="Weigeren"
                      styling="!bg-error-100 w-full"
                      buttonAction={handleCancel}
                    />
                  </div>
                </div>
              </div>
            ))
          : "Er zijn geen reserveringen beschikbaar."}
      </div>
    </div>
  );
}
