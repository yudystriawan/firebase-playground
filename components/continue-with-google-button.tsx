"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ContinueWithGoogleButton = () => {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.refresh();
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
