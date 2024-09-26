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

// Voorbeeld gegevensarray
const gegevens = [
  { label: "Naam", value: "Bas van Ad" },
  { label: "Telefoon", value: "(31)718-90-13" },
  { label: "E-mail", value: "bas.van.ad@gmail.com" },
  { label: "Wachtwoord", value: "******" },
  // Voeg hier meer gegevens toe als dat nodig is
];

export default function GegevensModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                      className="flex flex-row justify-between mb-8"
                    >
                      <div className="max-w-[120px] w-full border-b-2 border-primary-100 mr-2">
                        {item.label}
                      </div>
                      <div className="max-w-[225px] w-full border-b-2 border-primary-100 mr-2">
                        {item.value}
                      </div>
                      <button>
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onClick={onClose}>
                  Sluiten
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
