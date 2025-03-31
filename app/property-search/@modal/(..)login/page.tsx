"use client";
import LoginForm from "@/components/login-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onLoginSuccess } from "./actions";

const LoginModal = () => {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            You must be logged in to favorite a property
          </DialogDescription>
        </DialogHeader>
        <LoginForm
          onSuccess={async () => {
            await onLoginSuccess();
            router.back();
          }}
        />
        <DialogFooter className="block">
          Dont&apos;t have an account?
          <Link href="/register" className="pl-2 underline">
            Register here
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
