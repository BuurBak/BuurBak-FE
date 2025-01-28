"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  cancelTrailer,
  getReservationsRequests,
} from "../api/Reservations-controller";
import Button from "../Components/Button";
import { useToast } from "../hooks/use-toast";
import { CancelTrailer, ResReservations } from "../Types/Reservation";

export default function JouwReserveringen() {
  const [reserveringen, setReserveringen] = useState<ResReservations[]>([]);
  const [cnlReason, setCnlReason] = useState<string>(
    "De eigenaar van de trailer heeft helaas deze reservering geweigerd"
  );

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { toast } = useToast();

  const handleCancel = async () => {
    const cancelData: CancelTrailer = {
      reason: cnlReason,
      reservation_id: reserveringen[0].id,
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
        const data = await getReservationsRequests();
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
        <p className="text-2xl font-semibold p-2">Jouw reserveringen</p>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
      </div>
      <div className="overflow-y-auto">
        {reserveringen && reserveringen.length
          ? reserveringen.map((reservering: ResReservations, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-col mb-8 border-b-2 md:w-[550px]"
              >
                <div className="relative aspect-square md:w-60 w-full max-h-60 m-2">
                  <Image
                    src={reservering.trailer.images[0]}
                    alt={`Trailer image ${index + 1}`}
                    fill
                    sizes="100% 100%"
                    priority={true}
                    className="sm:rounded-md object-cover w-40 h-40"
                  />
                </div>

                <div className="w-full flex flex-col">
                  <div className="font-semibold text-xl p-2">
                    <div className="flex justify-between">
                      <p>{reservering.trailer.title}</p>
                      <p
                        className={`font-semibold flex-row inline-flex items-center ${
                          reservering.reservation_status.enum !== "Confirmed" &&
                          "text-error-100"
                        }`}
                      >
                        {reservering.reservation_status.enum === "Confirmed"
                          ? "Gereserveerd"
                          : "Geannuleerd"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="flex items-center justify-center">
                      <p className="font-semibold flex-row inline-flex items-center">
                        {reservering.start_date}
                        <Calendar className="h-4 w-4 ml-2 align-middle text-primary-200" />
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Link
                        className="font-semibold flex-row inline-flex items-center text-md"
                        href={`/aanbod/${reservering.trailer.uuid}`}
                      >
                        Bekijk aanhanger
                        <ChevronDown className="h-4 w-4 ml-2 align-middle" />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-1 h-[0.5px] w-full bg-primary-200"></div>
                  <div className="p-2 flex items-center justify-center w-full gap-2">
                    <Button label="Contact gegevens" onClick={onOpen} />
                    <Button
                      label="Weigeren"
                      className="!bg-error-100"
                      onClick={handleCancel}
                    />
                  </div>
                </div>
                <Modal
                  isOpen={isOpen}
                  placement={"center"}
                  onOpenChange={onOpenChange}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Contact gegevens
                        </ModalHeader>
                        <ModalBody>
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                              <p>Naam:</p>
                              <p>{reservering.renter.name}</p>
                            </div>
                            <div className="flex gap-2">
                              <p>Telefoon nummer:</p>
                              <p>{reservering.renter.phone_number}</p>
                            </div>
                          </div>
                        </ModalBody>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            ))
          : "Er zijn geen reserveringen beschikbaar."}
      </div>
    </div>
  );
}
