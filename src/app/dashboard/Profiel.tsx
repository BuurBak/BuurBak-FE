"use client";

import { ChevronRight, DoorClosed } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
import {
  getSignedInUserOrUndefined,
  signOut,
  updateUser,
} from "../../lib/authUtil";
import Button from "../Components/Button";
import { HeroUIBasedButton } from "../Components/HeroUIBasedButton";
import Icon from "../Components/Icon";
import { UserDetails } from "../Types/User";
import { checkStripeConnection, linkToStripe } from "../api/Payment-controller";
import { ProfilePicture } from "../icons/ProfilePicture";
import AccountVerwijderenModal from "./AccountVerwijderenModal";
import GegevensModal from "./GegevensModal";
import TrailerModal from "./TrailerModal";

export default function Profiel() {
  const [user, setUser] = useState<UserDetails>();
  const [stripe, setStripe] = useState<boolean>();
  const router = useRouter();

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

    // const checkToken = async () => {
    //   if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
    //     router.push("/");
    //   }
    // };
    // checkToken();
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
    const res = await linkToStripe("/dashboard");
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
      </div>
      <div className="flex flex-col mt-8">
        {stripe ? (
          <div className="bg-offWhite-100 p-3 rounded flex gap-4">
            <Icon name="CheckCheck" className="text-success-500" />
            <p>Stripe verbonden</p>
          </div>
        ) : (
          <Button label="Verbind met stripe" onClick={() => connectStripe()} />
        )}
        <GegevensModal user={user} onSubmit={onSubmit} />
        <TrailerModal />
        <div>
          <HeroUIBasedButton
            buttonVariant="profile"
            onPress={() => router.push("/wachtwoord_vergeten")}
          >
            Wachtwoord veranderen
            <ChevronRight className="w-4" />
          </HeroUIBasedButton>
        </div>
        <div>
          <HeroUIBasedButton
            className="text-red-600"
            buttonVariant="profile"
            onPress={handleSignOut}
          >
            Uitloggen
            <DoorClosed className="w-4" />
          </HeroUIBasedButton>
        </div>

        <AccountVerwijderenModal />
      </div>
    </>
  );
}
