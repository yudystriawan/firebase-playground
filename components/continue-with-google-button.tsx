"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ContinueWithGoogleButton = () => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch (error) {
          // Handle error (e.g., show a toast notification)
        }
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
