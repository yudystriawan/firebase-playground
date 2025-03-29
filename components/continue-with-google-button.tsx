"use client";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "./ui/button";

const ContinueWithGoogleButton = () => {
  return (
    <Button
      onClick={() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      }}
    >
      Continue with Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
