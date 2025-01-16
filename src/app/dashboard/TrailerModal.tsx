import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { EuroIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteTrailer, getTrailers } from "../api/Trailer-controller";
import Button from "../Components/Button";
import { useToast } from "../hooks/use-toast";
import { TrailerData } from "../Types/Reservation";

export default function TrailerModal() {
  const [trailers, setTrailers] = useState<TrailerData[]>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { toast } = useToast();

  useEffect(() => {
    const getAllAccountTrailers = async () => {
      const res = await getTrailers();
      if (res) {
        setTrailers(res);
      }
    };

    getAllAccountTrailers();
  }, []);

  const handleDelete = async (uuid: string) => {
    const res = await deleteTrailer(uuid);
    if (res.message === "Success!") {
      toast({
        title: "Het is gelukt!",
        description: "Je trailer is succesvol verwijderd",
        duration: 5000, // Show for 5 seconds
      });
      onClose();
    } else {
      toast({
        title: "Er klopt iets niet!",
        description:
          "Er is helaas wat mis gegaan met het verwijderen van deze aanhanger.",
        duration: 5000, // Show for 5 seconds
        variant: "error",
      });
    }
  };

  return (
    <>
      <button onClick={onOpen}>Mijn aanhangers</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-fit">
        <ModalContent className="w-full">
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1 w-full">
                Mijn aanhangers
              </ModalHeader>
              <ModalBody className="w-full">
                <div className="flex flex-col gap-4 m-5 mt-0 w-full">
                  {trailers?.map((item, index) => {
                    return (
                      <div
                        key={item.uuid}
                        className="flex gap-5 p-2 h-[20dvh] w-full"
                      >
                        <div className="relative aspect-square w-auto h-full m-2">
                          <Image
                            src={item.images[0]}
                            alt={`Trailer image ${index + 1}`}
                            fill
                            sizes="100% 100%"
                            priority={true}
                            className="sm:rounded-md object-cover w-40 h-40"
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-fit">
                          <p className="font-semibold text-h5">{item.title}</p>
                          <div className="flex gap-1">
                            <p>{item.rental_price}</p>
                            <EuroIcon className="text-primary-100" />
                          </div>
                          <p>{item.address.city}</p>
                        </div>
                        <Button
                          label="X"
                          styling="!bg-error-100"
                          buttonAction={() => handleDelete(item.uuid)}
                        />
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
