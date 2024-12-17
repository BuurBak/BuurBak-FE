"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Login } from "../Types/User";
import { logIn, registerAccount } from "../api/auth/Register";
import Button from "./Button";
import InputField from "./InputField";

const Register = () => {
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
  const [hasAccount, setHasAccount] = useState(false);

  const onSubmit = async (data: Login) => {
    if (!hasAccount) {
      let loginCredentials: Login = {
        username: getValues("username"),
        password: getValues("password"),
      };
      await logIn(loginCredentials);
    } else {
      let registerCredentials: Login = {
        username: getValues("username"),
        password: getValues("password"),
        name: getValues("name"),
        phoneNumber: getValues("phoneNumber"),
      };
      await registerAccount(registerCredentials);
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-4 pb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {hasAccount && (
        <div className="w-full">
          <label>Naam</label>
          <InputField
            type="text"
            // pattern="^(?:[A-Z]|[a-z])[a-z ]+(?: [A-Z]?[a-z ]*)*$"
            className="!w-full"
            label="Naam"
            inputType="text"
            outline={true}
            required={hasAccount}
            {...register("name")}
          />
        </div>
      )}
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
      {hasAccount && (
        <div className="w-full">
          <label>Telefoon nummer</label>
          <InputField
            type="tel"
            // pattern="^(06|00316|\+316|0031 6|\+31 6)(?:\s?)(?:[0-9]{2}\s?){4}$"
            className="!w-full"
            label="Telefoon nummer"
            inputType="text"
            outline={true}
            required={hasAccount}
            {...register("phoneNumber")}
          />
        </div>
      )}
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
      <Button label={hasAccount ? "Registreer" : "Log in"} submit={true} />
      {!hasAccount && (
        <p>
          Nog geen BuurBak account?{" "}
          <span
            className="text-primary-100 cursor-pointer"
            onClick={() => setHasAccount(true)}
          >
            Registreren
          </span>
        </p>
      )}
      {hasAccount && (
        <p>
          Heb je al een account?{" "}
          <span
            className="text-primary-100"
            onClick={() => setHasAccount(false)}
          >
            Inloggen
          </span>
        </p>
      )}
    </form>
  );
};

export default Register;
