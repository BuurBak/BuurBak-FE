import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/modal";
import { Trash2 } from "lucide-react";
import { HeroUIBasedButton } from "../Components/HeroUIBasedButton";
import { deleteUser } from "@/lib/authUtil";

export default function AccountVerwijderenModal() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const handleDeleteAccout = async () => {
        deleteUser();
        onClose();
    };

    return (
        <>
            <div>
                <HeroUIBasedButton buttonVariant="profile" className="text-red-600" onPress={onOpen}>Account verwijderen<Trash2 className="w-4" /></HeroUIBasedButton>
            </div>
            <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Weet je het zeker dat je jouw account wilt verwijderen?
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex gap-4">
                                    <HeroUIBasedButton buttonVariant="primary" onPress={handleDeleteAccout} className="!bg-error-100">Ja ik weet het zeker!</HeroUIBasedButton>
                                    <HeroUIBasedButton buttonVariant="secondary" onPress={onClose} >Nee verwijder niet</HeroUIBasedButton>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};