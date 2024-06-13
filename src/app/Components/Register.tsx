import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Login } from "../Types/Register";
import { logIn } from "../api/auth/Register";
import Button from "./Button";
import InputField from "./InputField";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();

  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password) {
      let loginCredentials: Login = {
        username: email,
        password: password,
        deviceId: uuid(),
      };
      try {
        const data = await logIn(loginCredentials);
        setLoginData(data);
        setError(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }
  };

  return (
    <form className="w-full flex flex-col gap-4 pb-4" onSubmit={handleSubmit}>
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
          type={showPassword ? "text" : "passWord"}
          className="!w-full"
          label="Wachtwoord"
          inputType="text"
          outline={true}
          required={true}
          icon={true}
          iconClick={() => setShowPassword(!showPassword)}
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
      {loginData && <div>Success: {JSON.stringify(loginData)}</div>}
      {error && <div>Error: {error}</div>}
    </form>
  );
};

export default Register;
