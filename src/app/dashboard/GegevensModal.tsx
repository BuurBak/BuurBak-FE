import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/auth/Register";
import { GetUser } from "../Types/User";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { PencilLine } from "lucide-react";

export default function GegevensModal() {
  const [user, setUser] = useState<GetUser>();
  const [gegevens, setGegevens] = useState([
    { label: "Naam", value: "" },
    { label: "Telefoon", value: "" },
    { label: "E-mail", value: "" },
  ]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editableValue, setEditableValue] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setGegevens((prevGegevens) => [
        { label: "Naam", value: user.name },
        { label: "Telefoon", value: user.phone_number },
        { label: "E-mail", value: user.email },
      ]);
    }
  }, [user]);

  // useEffect(() => {
  //   const data: GetUser = {
  //     name: gegevens[0].value,
  //     phone_number: gegevens[1].value,
  //     email: gegevens[2].value,
  //     profile_picture: "",
  //   };
  //   updateUser(data);
  // }, [gegevens]);

  const handleEditClick = (index: number, value: string) => {
    setEditableIndex(index);
    setEditableValue(value);
  };

  const handleSave = (index: number) => {
    const updatedGegevens = [...gegevens];
    updatedGegevens[index].value = editableValue;
    setGegevens(updatedGegevens);
    setEditableIndex(null);
  };

  const save = () => {
    const data: GetUser = {
      name: gegevens[0].value,
      phone_number: gegevens[1].value,
      email: gegevens[2].value,
      profile_picture: "",
    };
    updateUser(data);
    console.log("poep", data);
  };

  return (
    <>
      <button onClick={onOpen}>Mijn gegevens</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Mijn Gegevens
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  {gegevens.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between mb-4"
                    >
                      <div className="max-w-[120px] w-full border-b-2 border-primary-100 mr-2">
                        {item.label}
                      </div>
                      <div className="max-w-[225px] w-full border-b-2 border-primary-100 mr-2">
                        {editableIndex === index ? (
                          <input
                            type="text"
                            value={editableValue}
                            onChange={(e) => setEditableValue(e.target.value)}
                            className="border-b-2 border-primary-100 w-full outline-none"
                          />
                        ) : (
                          item.value
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (editableIndex === index) {
                            handleSave(index);
                          } else {
                            handleEditClick(index, item.value);
                          }
                        }}
                        className="focus:outline-none"
                      >
                        <PencilLine className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={() => save()}>
                  Opslaan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
