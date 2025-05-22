import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../Components/InputField";
import { UserDetails } from "../Types/User";
import { NextUIBasedButton } from "../Components/NextUIBasedButton";
import { ChevronRight } from "lucide-react";

interface GegevensModalProps {
  user: UserDetails | undefined;
  onSubmit: (updatedUser: UserDetails) => Promise<void>;
}

export default function GegevensModal({ user, onSubmit }: GegevensModalProps) {
  const form = useForm<UserDetails>();

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('phone_number', user.phone_number);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState,
  } = form;
  const { errors } = formState;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="left-side-box-shadow">
        <NextUIBasedButton buttonVariant="profile" onPress={onOpen}>Wijzig gegevens<ChevronRight className="w-4" /></NextUIBasedButton>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose: () => void) => (
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Mijn Gegevens
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-between">
                      <InputField
                        inputType={"text"}
                        label="Naam"
                        type="text"
                        outline
                        className="w-full"
                        {...register(`name`, {
                          required: "Vul een nieuwe naam in"
                        })}
                      />
                      <p className="text-error-100">{errors.name?.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-between">
                      <InputField
                        inputType={"text"}
                        label="Telefoonnummer"
                        type="tel"
                        outline
                        className="w-full"
                        {...register(`phone_number`, {
                          required: "Voer een geldig telefoonnummer in"
                        })}
                      />
                      <p className="text-error-100">{errors.phone_number?.message}</p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <NextUIBasedButton buttonVariant="primary" type="submit" onPress={onClose}>Opslaan</NextUIBasedButton>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
      {/* <div className="mt-1 h-[0.5px] mb-8 w-full bg-primary-200"></div> */}
    </>
  );
}
