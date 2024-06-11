import { useState } from "react";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import InputField from "./InputField";

const Register = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();

  const handleSubmit = () => {
    let data = {
      username: email,
      password: password,
      deviceId: uuid(),
    };
    console.log(data);
  };

  return (
    <form
      className="w-full flex flex-col gap-4 pb-4"
      onSubmit={() => handleSubmit()}
    >
      {hasAccount && (
        <div className="w-full">
          <label>Naam</label>
          <InputField
            setInputValue={setName}
            type="text"
            className="!w-full"
            label="Naam"
            inputType="text"
            outline={true}
            required={hasAccount}
          />
        </div>
      )}
      <div className="w-full">
        <label>Email</label>
        <InputField
          setInputValue={setEmail}
          type="email"
          className="!w-full"
          label="Email"
          inputType="text"
          outline={true}
          required={true}
        />
      </div>
      {hasAccount && (
        <div className="w-full">
          <label>Telefoon nummer</label>
          <InputField
            setInputValue={setMobile}
            type="number"
            className="!w-full"
            label="Telefoon nummer"
            inputType="text"
            outline={true}
            required={hasAccount}
          />
        </div>
      )}
      <div>
        <label>Wachtwoord</label>
        <InputField
          setInputValue={setPassword}
          type="password"
          className="!w-full"
          label="Wachtwoord"
          inputType="text"
          outline={true}
          required={true}
        />
      </div>
      <Button label={hasAccount ? "Registreer" : "Log in"} submit={true} />
      {!hasAccount && (
        <p>
          Nog geen BuurBak account?{" "}
          <span
            className="text-primary-100"
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
