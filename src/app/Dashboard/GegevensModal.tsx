"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { PencilIcon } from "@heroicons/react/24/outline"; // Vervang dit door de juiste import voor je icoon
import { useState } from "react"; // Importeer useState

// Voorbeeld gegevensarray
const initialGegevens = [
  { label: "Naam", value: "Bas van Ad" },
  { label: "Telefoon", value: "(31)718-90-13" },
  { label: "E-mail", value: "bas.van.ad@gmail.com" },
  { label: "Wachtwoord", value: "******" },
];

export default function GegevensModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [gegevens, setGegevens] = useState(initialGegevens);
  const [editableIndex, setEditableIndex] = useState<number | null>(null);
  const [editableValue, setEditableValue] = useState("");

  const handleEditClick = (index: number, value: string) => {
    setEditableIndex(index);
    setEditableValue(value);
  };

  const handleSave = (index: number) => {
    const updatedGegevens = [...gegevens];
    updatedGegevens[index].value = editableValue;
    setGegevens(updatedGegevens);
    setEditableIndex(null); // Sluit de bewerkingsmodus
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
                        className="focus:outline-none" // Verhindert extra styling
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={onClose}>
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
