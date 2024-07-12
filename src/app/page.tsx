"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useEffect } from "react";
import { deleteToken, hasToken } from "./api/auth/Cookies";
import { refresh } from "./api/auth/Register";
import AanbodCategorieën from "./Components/AanbodCategorieën";
import AanbodPreview from "./Components/AanbodPreview";
import Button from "./Components/Button";
import Footer from "./Components/Footer";
import Highlights from "./Components/Highlights";
import Landing from "./Components/Landing";
import Register from "./Components/Register";

export default function Home() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const signOut = () => {
    deleteToken("access_token");
    deleteToken("refresh_token");
  };

  useEffect(() => {
    const checkToken = async () => {
      let token = await hasToken("access_token");

      if (token) {
        await refresh();
        onClose();
      }
    };

    checkToken();
  });

  return (
    <div>
      <Button label="Log in" buttonAction={onOpen} />
      <Button label="Log uit" buttonAction={signOut} />
      <Landing />
      <AanbodPreview />
      <Highlights />
      <AanbodCategorieën />
      <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Register />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Footer />
    </div>
  );
}
