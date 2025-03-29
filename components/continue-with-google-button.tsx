"use client";

import { useAuth } from "@/context/auth";
import { Button } from "./ui/button";

const ContinueWithGoogleButton = () => {
  const auth = useAuth();

  return (
    <Button
      onClick={() => {
        auth?.loginWithGoogle();
      }}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
