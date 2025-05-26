"use client";
import { ChangeEvent, useState } from "react";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import { resetPassword } from "../../lib/authUtil";

const WachtwoordVeranderen = () => {
  const [pass, setPass] = useState<string>();
  const [secPass, setSecPass] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pass === secPass && pass && secPass) {
      await resetPassword(pass);
    }
  };

  return (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <form
        className="p-5 border-1 border-gray-100 rounded flex flex-col gap-5 w-[90vw] md:w-[35vw]"
        onSubmit={handleSubmit}
      >
        <h3>Verander wachtwoord</h3>
        <p></p>
        <InputField
          label="Nieuw wachtwoord"
          inputType="text"
          outline
          className="w-full"
          type="password"
          value={pass}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPass(e.target.value)
          }
          required
        />
        <InputField
          label="Herhaal nieuw wachtwoord"
          inputType="text"
          outline
          className="w-full"
          type="password"
          value={secPass}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSecPass(e.target.value)
          }
          required
        />
        <Button label="Verstuur" submit type="primary" />
      </form>
    </div>
  );
};

export default WachtwoordVeranderen;
