"use client";

import { useDisclosure } from "@nextui-org/modal";
import { ChevronRight, DoorClosed, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import {
  getSignedInUserOrUndefined,
  signOut,
  updateUser,
} from "../../lib/authUtil";
import { hasToken } from "../../lib/cookieUtil";
import { NextUIBasedButton } from "../Components/NextUIBasedButton";
import { UserDetails } from "../Types/User";
import { checkStripeConnection, linkToStripe } from "../api/Payment-controller";
import { ProfilePicture } from "../icons/ProfilePicture";
import AccountVerwijderenModal from "./AccountVerwijderenModal";
import GegevensModal from "./GegevensModal";
import TrailerModal from "./TrailerModal";

export default function Profiel() {
  const [user, setUser] = useState<UserDetails>();
  const [stripe, setStripe] = useState<boolean>();
  const router = useRouter(); // Gebruik de router om te navigeren

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (updatedUser: UserDetails) => {
    await updateUser(updatedUser);
    setUser(updatedUser);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getSignedInUserOrUndefined();
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
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const connectStripe = async () => {
    const res = await linkToStripe(window.location.origin);
    window.open(res?.url, "_blank");
  };

  useEffect(() => {
    const checkStripe = async () => {
      let res = await checkStripeConnection();
      setStripe(res?.ready_for_payments);
    };
    checkStripe();
  }, []);

  return (
    <>
      <div className="flex flex-col rounded-md items-center">
        {ProfilePicture(200)}
        <p className="text-center text-2xl font-bold m-4">{user?.name}</p>
        {stripe ? (
          <p className="text-success-400 text-center bg-offWhite-100 p-3 rounded">
            Je account is verbonden met stripe
          </p>
        ) : (
          <p className="text-error-100 text-center bg-offWhite-100 p-3 rounded">
            Je account is nog niet verbonden met stripe
          </p>
        )}
      </div>
      <div className="flex flex-col mt-8">
        <GegevensModal user={user} onSubmit={onSubmit} />
        <TrailerModal />
        <div>
          <NextUIBasedButton
            buttonVariant="profile"
            onPress={() => router.push("/wachtwoord_vergeten")}
          >
            Wachtwoord veranderen
            <ChevronRight className="w-4" />
          </NextUIBasedButton>
        </div>
        <div>
          <NextUIBasedButton
            className="text-red-600"
            buttonVariant="profile"
            onPress={handleSignOut}
          >
            Uitloggen
            <DoorClosed className="w-4" />
          </NextUIBasedButton>
        </div>
        <AccountVerwijderenModal />
        <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div>
        {/*         Volgens Luuk niet meer nodig omdat er anders stripe twee keer op de pagina komt
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
           */}

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
    </>
  );
}
