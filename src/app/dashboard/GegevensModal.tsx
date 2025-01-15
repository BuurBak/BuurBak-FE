import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUser, updateUser } from "../api/auth/Register";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import { GetUser } from "../Types/User";

type Info = {
  name: string;
  phone_number: string;
  email: string;
  profile_picture: string;
};

export default function GegevensModal() {
  const [user, setUser] = useState<GetUser>();
  const form = useForm<Info>({
    defaultValues: {
      name: user?.name,
      phone_number: user?.phone_number,
      email: user?.email,
      profile_picture: user?.profile_picture,
    },
  });
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
    control,
  } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const [gegevens, setGegevens] = useState<(keyof Info)[]>([
    "name",
    "email",
    "phone_number",
  ] as const);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editableValue, setEditableValue] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const onSubmit = (data: Info) => {
    console.log(data);
    const updateInfo = async () => {
      await updateUser(data);
    };

    updateInfo();
  };

  return (
    <>
      <button onClick={onOpen}>Mijn gegevens</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Mijn Gegevens
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  {gegevens.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <InputField
                        inputType={"text"}
                        label={
                          item === "name"
                            ? "Naam"
                            : item === "email"
                            ? "Email"
                            : item === "phone_number"
                            ? "Telefoonnummer"
                            : ""
                        }
                        type={
                          item === "name"
                            ? "text"
                            : item === "email"
                            ? "email"
                            : item === "phone_number"
                            ? "tel"
                            : ""
                        }
                        outline
                        className="w-full"
                        {...register(`${item}`, {
                          required:
                            item === "name"
                              ? "Vul een nieuwe naam in"
                              : item === "email"
                              ? "Vul een correct email adres in"
                              : item === "phone_number"
                              ? "Voeg een geldig telefoonnummer in"
                              : "",
                        })}
                      />
                      <p className="text-error-100">{errors[item]?.message}</p>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  label="Opslaan"
                  submit
                  buttonAction={isSubmitSuccessful && onClose()}
                  disabled={isSubmitting || isSubmitSuccessful}
                />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
