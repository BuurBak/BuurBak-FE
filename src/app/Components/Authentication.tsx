"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserDetails, SignInCredentials, RegisterUserParams } from "../Types/User";
import { signIn, registerAccount } from "../../lib/authUtil";
import InputField from "./InputField";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { usePathname } from "next/navigation";
import { hasToken } from "../../lib/cookieUtil";
import { NextUIBasedButton } from "./NextUIBasedButton";
import { ProfilePicture } from "../icons/ProfilePicture";

const Authentication = () => {
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
  const [user, setUser] = useState<UserDetails>();

  const currentRoute = usePathname();

  const handleSignIn = async () => {
    const signInCredentials: SignInCredentials = {
      username: getValues("username"),
      password: getValues("password"),
    };

    setUser(await signIn(signInCredentials));
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
      // TODO: This doesn't align properly with it's neighbours right now. Should be fixed.
      <div className="w-full flex flex-col items-center py-2 md:my-0 md:ml-6">
        <Link href="/dashboard">
          {ProfilePicture()}
        </Link>
        {/* TODO: Do we want to show the username in navbar? */}
        {/* <p className="w-fit text-2xl font-semibold mt-4 mb-12">
          {user?.name}
        </p> */}
      </div>
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
        <NextUIBasedButton buttonVariant="primary" type="submit" onPress={onClose}>Registreer</NextUIBasedButton>
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
        <NextUIBasedButton buttonVariant="primary" className="" type="submit" onPress={onClose}>Login</NextUIBasedButton>
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
        <a className="py-4 md:my-0 md:ml-8 text-secondary-100" onClick={onOpen}>Inloggen</a>
        <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange} >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  {
                    showRegisterForm ?
                      getRegisterForm() :
                      getSignInForm()
                  }
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal >
      </>
    );
  };

  return (
    showSignIn ?
      getSignedIn() :
      getSignIn()
  );
};

export default Authentication;
