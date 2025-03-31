"use client";
import LoginForm from "@/components/login-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm onSuccess={() => router.refresh()} />
      </CardContent>
      <CardFooter>
        Dont&apos;t have an account?
        <Link href="/register" className="pl-2 underline">
          Register here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
