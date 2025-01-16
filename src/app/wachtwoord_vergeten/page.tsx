"use client";
import { ChangeEvent, useState } from "react";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import { forgotPassword } from "../api/auth/Register";

const Page = () => {
  const [mail, setMail] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const test = async () => {
      if (mail) {
        const forgot = await forgotPassword(mail);
      }
    };

    test();
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <form
        className="p-5 border-1 border-gray-100 rounded flex flex-col gap-5 w-[90vw] md:w-[35vw]"
        onSubmit={handleSubmit}
      >
        <h3>Wachtwoord vergeten</h3>
        <p>
          Vergeten is menselijk. Wat is je e-mailadres? Dan zenden we je binnen
          enkele minuten een linkje om een nieuw wachtwoord in te stellen.
        </p>
        <InputField
          label="Email addres"
          inputType="text"
          outline
          className="w-full"
          type="email"
          value={mail}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMail(e.target.value)
          }
          required
        />
        <a className="cursor-pointer text-secondary-100" href="/">
          Terug naar inloggen
        </a>
        <Button label="Verstuur" submit type="primary" />
      </form>
    </div>
  );
};

export default Page;
