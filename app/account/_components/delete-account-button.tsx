"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { removeToken } from "@/context/actions";
import { useAuth } from "@/context/auth";
import { FirebaseError } from "firebase/app";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserFavorites } from "../actions";

const DeleteAccountButton = () => {
  const auth = useAuth();

  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");

  const onDelete = async (): Promise<void> => {
    if (auth?.currentUser?.email) {
      setIsDeleting(true);

      try {
        await reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(auth.currentUser.email, password)
        );

        await deleteUserFavorites();
        await deleteUser(auth.currentUser);
        await removeToken();

        toast.success("Account deleted successfully.");
      } catch (error: FirebaseError | any) {
        console.error("Error deleting account:", error);

        let errorMessage = "An error occurred while deleting your account.";

        if (error.code === "auth/invalid-credential") {
          errorMessage = "Invalid credentials. Please check your password.";
        }

        toast.error(errorMessage);
      }
      setPassword("");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <div className="mt-4">
                <Label>Enter current password to continue</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={onDelete}>
            {isDeleting ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountButton;
