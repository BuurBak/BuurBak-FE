"use client";

import { ChevronRight, DoorClosed } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import profielfoto from "../../../public/img/verhuurfoto.png";
import { GetUser } from "../Types/User";
import { checkStripeConnection, linkToStripe } from "../api/Payment-controller";
import { getUser, signOut } from "../api/auth/Register";
import GegevensModal from "./GegevensModal";

export default function Profiel() {
  const [user, setUser] = useState<GetUser>();
  const router = useRouter(); // Gebruik de router om te navigeren

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(); // Roep de signOut-functie aan
      router.push("/"); // Navigeer naar de startpagina na uitloggen
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
      console.log("res", res?.ready_for_payments);
    };
    checkStripe();
  }, []);

  return (
    <>
      <div className="flex flex-col rounded-md">
        <div className="relative aspect-square">
          <Image
            src={profielfoto}
            alt="Trailer image 1"
            fill
            sizes="100% 100%"
            priority={true}
            className="sm:rounded-md object-cover"
          />
        </div>
        <p className="text-center text-2xl font-bold m-4">{user?.name}</p>
      </div>
      <div className="flex flex-col mt-8">
        <div className="font-semibold flex-row inline-flex items-center">
          <GegevensModal />
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </div>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        <a className="font-semibold flex-row inline-flex items-center" href="">
          Mijn Trailers
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </a>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        <a
          className="font-semibold flex-row inline-flex items-center"
          onClick={() => connectStripe()}
        >
          Connect stripe
          <ChevronRight className="h-4 w-4 ml-2 align-middle" />
        </a>
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
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
      </div>
    </>
  );
}
