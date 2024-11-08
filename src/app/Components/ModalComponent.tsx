"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ReactNode } from "react";
import Button from "./Button";

type Placement =
  | "auto"
  | "top"
  | "bottom"
  | "center"
  | "top-center"
  | "bottom-center";

type ModalOptions = {
  children: ReactNode;
  placement: Placement;
  title?: string;
  closeButton?: string;
  openButton?: string;
};

const ModalComponent = ({
  children,
  title,
  closeButton,
  openButton,
  placement,
}: ModalOptions) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              {title && (
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
              )}
              <ModalBody>{children}</ModalBody>
              {closeButton && openButton && (
                <ModalFooter>
                  {closeButton && (
                    <Button label={closeButton} buttonAction={onClose} />
                  )}
                  {openButton && (
                    <Button label={openButton} buttonAction={onClose} />
                  )}
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
