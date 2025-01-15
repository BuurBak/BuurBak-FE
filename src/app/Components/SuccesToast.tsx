"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../hooks/use-toast";

export default function SuccessToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const successMessage = searchParams.get("success");

    if (successMessage) {
      // Decode the URL-encoded message
      const decodedMessage = decodeURIComponent(successMessage);

      toast({
        title: "Gelukt!",
        description: decodedMessage,
        duration: 5000, // Show for 5 seconds
      });
    }
  }, [searchParams, toast]);

  // This component doesn't render anything visible
  return null;
}
