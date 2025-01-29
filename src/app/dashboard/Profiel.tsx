"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  ChevronRight,
  CircleUserRound,
  DoorClosed,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import Button from "../Components/Button";
import { GetUser } from "../Types/User";
import { checkStripeConnection, linkToStripe } from "../api/Payment-controller";
import { hasToken } from "../api/auth/Cookies";
import { deleteUser, getUser, signOut } from "../api/auth/Register";
import GegevensModal from "./GegevensModal";
import TrailerModal from "./TrailerModal";

export default function Profiel() {
  const [user, setUser] = useState<GetUser>();
  const [stripe, setStripe] = useState<boolean>();
  const router = useRouter(); // Gebruik de router om te navigeren

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();

    const checkToken = async () => {
      if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
        router.push("/");
      }
    };
    checkToken();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(); // Roep de signOut-functie aan
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const connectStripe = async () => {
    const res = await linkToStripe();
    window.open(res?.url, "_blank");
  };

  useEffect(() => {
    const checkStripe = async () => {
      let res = await checkStripeConnection();
      setStripe(res?.ready_for_payments);
    };
    checkStripe();
  }, []);

  const handleDeleteAccout = async () => {
    deleteUser();
    onClose();
  };

  return (
    <>
      <div className="flex flex-col rounded-md">
        <div className="relative aspect-square">
          <CircleUserRound
            className="w-full h-auto text-secondary-100"
            strokeWidth={1}
          />
        </div>
        <p className="text-center text-2xl font-bold m-4">{user?.name}</p>
        {stripe ? (
          <p className="text-success-400 text-center bg-offWhite-100 p-3 rounded">
            Je account is verbonden met stripe
          </p>
        ) : (
          <p className="text-error-100 text-center bg-offWhite-100 p-3 rounded">
            Verbind jouw account met stripe
          </p>
        )}
      </div>
      <div className="flex flex-col mt-8">
        <div className="font-semibold flex-row inline-flex items-center">
          <GegevensModal />
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </div>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        <div className="font-semibold flex-row inline-flex items-center">
          <TrailerModal />
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </div>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        {!stripe && (
          <a
            className="font-semibold flex-row inline-flex items-center"
            onClick={() => connectStripe()}
          >
            Connect stripe
            <ChevronRight className="h-4 w-4 ml-2 align-middle" />
          </a>
        )}
        {!stripe && (
          <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        )}
        <a
          className="font-semibold flex-row inline-flex items-center"
          href="/wachtwoord_vergeten"
        >
          Wachtwoord veranderen
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </a>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        {/* Toevoegen van de Uitloggen knop */}
        <button
          onClick={handleSignOut}
          className="font-semibold flex-row inline-flex items-center text-red-600"
        >
          Uitloggen
          <DoorClosed className="h-4 w-4 ml-2 align-middle" />
        </button>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        {/* Toevoegen van de Uitloggen knop */}
        <button
          onClick={onOpen}
          className="font-semibold flex-row inline-flex items-center text-red-600"
        >
          Account verwijderen
          <Trash2 className="h-4 w-4 ml-2 align-middle" />
        </button>
      </div>
      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-error-100">
                Weet je het zeker dat je jouw account wilt verwijderen?
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-4">
                  <Button
                    label="Ja ik weet het zeker!"
                    onClick={handleDeleteAccout}
                    className="!bg-error-100"
                  />
                  <Button label="Nee verwijder niet" onClick={onClose} />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
