"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Login } from "../Types/User";
import { logIn, registerAccount } from "../../lib/authUtil";
import InputField from "./InputField";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { usePathname } from "next/navigation";
import { hasToken } from "../../lib/cookieUtil";
import { Button } from "@nextui-org/button";

const Authentication = () => {
  const form = useForm<Login>({
    defaultValues: {
      name: "",
      password: "",
      phoneNumber: undefined,
      username: "",
    },
  });
  const { register, handleSubmit, getValues } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const onSubmit = async (__data: Login) => {
    if (!showRegisterForm) {
      const loginCredentials: Login = {
        username: getValues("username"),
        password: getValues("password"),
      };

      await logIn(loginCredentials);
    } else {
      const registerCredentials: Login = {
        username: getValues("username"),
        password: getValues("password"),
        name: getValues("name"),
        phoneNumber: getValues("phoneNumber"),
      };
      await registerAccount(registerCredentials);
      setTimeout(function () {
        window.location.reload();
      }, 100);
    }
  };

  const currentRoute = usePathname();

  const isReserverenPage = () => {
    const reserverenPattern = /^\/aanbod\/[^/]+\/reserveren$/;
    return reserverenPattern.test(currentRoute);
  };

  useEffect(() => {
    if (isReserverenPage()) {
      const loginRequired = async () => {
        if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
          onOpen();
        }
      };

      loginRequired();
    }

    if (currentRoute === "/verhuren") {
      const loginRequired = async () => {
        if (!(await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token"))) {
          onOpen();
        }
      };

      loginRequired();
    }

    if (currentRoute === "/wachtwoord_vergeten") {
      onClose();
    }
  }, [currentRoute]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("phoneNumber")}
          />
        </div>
        {getWachtwoordFormField()}
        <Button label={"Registreer"} submit={true} onPress={onClose} />
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

  const getLoginForm = () => {
    return (
      <form
        className="w-full flex flex-col gap-4 pb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {getEmailFormField()}
        {getWachtwoordFormField()}
        <Button label={"Login"} submit={true} onPress={onClose} />
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

  return (
    <div>
      {/* TODO: For some reason the login button doesn't work on first load of the Authentication component  */}
      < Button onPress={onOpen}>Inloggen</Button>
      < Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                {showRegisterForm && getRegisterForm()}
                {!showRegisterForm && getLoginForm()}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal >
    </div>
  );
};

export default Authentication;
