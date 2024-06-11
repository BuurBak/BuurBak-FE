import { useState } from "react";
import { v4 as uuid } from "uuid";
import Button from "./Button";
import InputField from "./InputField";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
      <Button label="Sign in" submit={true} />
      <p>
        Nog geen BuurBak account?{" "}
        <span
          className="text-primary-100"
          onClick={() => console.log("Registeren")}
        >
          Registreren
        </span>
      </p>
    </form>
  );
};

export default Register;
