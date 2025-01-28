"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../hooks/use-toast";

export default function ErrorToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const errorMessage = searchParams.get("error");

    if (errorMessage) {
      // Decode the URL-encoded message
      const decodedMessage = decodeURIComponent(errorMessage);

      toast({
        title: "Er is iets mis!",
        description: decodedMessage,
        duration: 5000, // Show for 5 seconds
        variant: "error",
      });
    }
  }, [searchParams, toast]);

  // This component doesn't render anything visible
  return null;
}
