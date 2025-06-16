"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerAccount, signIn } from "../../lib/authUtil";
import { hasToken } from "../../lib/cookieUtil";
import {
  RegisterUserParams,
  SignInCredentials,
  UserDetails,
} from "../Types/User";
import InputField from "./InputField";
import { HeroUIBasedButton } from "./HeroUIBasedButton";
import { ProfilePicture } from "../icons/ProfilePicture";

interface AuthenticationProps {
  user: UserDetails | undefined;
  onLogin: Function;
}

const Authentication: FC<AuthenticationProps> = ({ user, onLogin }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const form = useForm<RegisterUserParams>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      phone_number: "",
    },
  });
  const { register, handleSubmit, getValues } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const currentRoute = usePathname();

  const handleSignIn = async () => {
    const signInCredentials: SignInCredentials = {
      username: getValues("username"),
      password: getValues("password"),
    };
    const signedInUser = await signIn(signInCredentials);

    onLogin(signedInUser);
  };

  const handleRegisterUser = async () => {
    const registerUserParams: RegisterUserParams = {
      username: getValues("username"),
      password: getValues("password"),
      name: getValues("name"),
      phone_number: getValues("phone_number"),
    };
    await registerAccount(registerUserParams);
    setTimeout(function () {
      window.location.reload();
    }, 100);
  };

  const isReserverenPage = () => {
    const reserverenPattern = /^\/aanbod\/[^/]+\/reserveren$/;
    return reserverenPattern.test(currentRoute);
  };

  useEffect(() => {
    if (isReserverenPage()) {
      const signInRequired = async () => {
        if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
          onOpen();
        }
      };

      signInRequired();
    }

    if (currentRoute === "/verhuren") {
      const signInRequired = async () => {
        if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
          onOpen();
        }
      };

      signInRequired();
    }

    if (currentRoute === "/wachtwoord_vergeten") {
      onClose();
    }
  }, [currentRoute]);

  useEffect(() => {
    const checkSignIn = async () => {
      setShowSignIn(!!user);
    };

    checkSignIn();
  }, [user]);

  const getSignedIn = () => {
    return (
      // TODO: Do we want to show the username in navbar? */}
      <Link href="/dashboard">
        {ProfilePicture()}
      </Link>
    );
  };

  const getWachtwoordFormField = () => {
    return (
      <div>
        <label>Wachtwoord</label>
        <InputField
          type={showPassword ? "text" : "passWord"}
          className="!w-full"
          label="Wachtwoord"
          inputType="text"
          outline={true}
          required={true}
          icon={true}
          iconName={showPassword ? "Eye" : "EyeOff"}
          iconClick={() => setShowPassword(!showPassword)}
          {...register("password")}
        />
      </div>
    );
  };

  const getEmailFormField = () => {
    return (
      <div className="w-full">
        <label>Email</label>
        <InputField
          type="email"
          className="!w-full"
          // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          label="Email"
          inputType="text"
          outline={true}
          required={true}
          {...register("username")}
        />
      </div>
    );
  };

  const getRegisterForm = () => {
    return (
      <form
        className="w-full flex flex-col gap-4 pb-4"
        onSubmit={handleSubmit(handleRegisterUser)}
      >
        <div className="w-full">
          <label>Naam</label>
          <InputField
            type="text"
            // pattern="^(?:[A-Z]|[a-z])[a-z ]+(?: [A-Z]?[a-z ]*)*$"
            className="!w-full"
            label="Naam"
            inputType="text"
            outline={true}
            required={showRegisterForm}
            {...register("name")}
          />
        </div>
        {getEmailFormField()}
        <div className="w-full">
          <label>Telefoon nummer</label>
          <InputField
            type="tel"
            // pattern="^(06|00316|\+316|0031 6|\+31 6)(?:\s?)(?:[0-9]{2}\s?){4}$"
            className="!w-full"
            label="Telefoon nummer"
            inputType="text"
            outline={true}
            required={showRegisterForm}
            {...register("phone_number")}
          />
        </div>
        {getWachtwoordFormField()}
        <HeroUIBasedButton
          buttonVariant="primary"
          type="submit"
          onPress={onClose}
        >
          Registreer
        </HeroUIBasedButton>
        <p>
          Heb je al een account?{" "}
          <span
            className="text-primary-100"
            onClick={() => setShowRegisterForm(false)}
          >
            Inloggen
          </span>
        </p>
      </form>
    );
  };

  const getSignInForm = () => {
    return (
      <form
        className="w-full flex flex-col gap-4 pb-4"
        onSubmit={handleSubmit(handleSignIn)}
      >
        {getEmailFormField()}
        {getWachtwoordFormField()}
        <HeroUIBasedButton
          buttonVariant="primary"
          className=""
          type="submit"
          onPress={onClose}
        >
          Login
        </HeroUIBasedButton>
        <Link href={"/wachtwoord_vergeten"}>Wachtwoord vergeten?</Link>
        <p>
          Nog geen BuurBak account?{" "}
          <span
            className="text-primary-100 cursor-pointer"
            onClick={() => setShowRegisterForm(true)}
          >
            Registreren
          </span>
        </p>
      </form>
    );
  };

  const getSignIn = () => {
    return (
      <>
        {/* TODO: For some reason the login button doesn't work on first load of the Authentication component  */}
        <HeroUIBasedButton size="lg" buttonVariant="modalButton" onPress={onOpen}>Inloggen</HeroUIBasedButton>
        <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  {showRegisterForm ? getRegisterForm() : getSignInForm()}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  return showSignIn ? getSignedIn() : getSignIn();
};

export default Authentication;
