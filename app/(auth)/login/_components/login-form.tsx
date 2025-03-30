"use client";

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { passwordValidation } from "@/validation/registerUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: passwordValidation,
});

const LoginForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await auth?.loginWithEmailAndPassword(data.email, data.password);
      toast.success("Login successful!");
      router.push("/");
    } catch (error: FirebaseError | any) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential") {
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Login</Button>
        <div>
          Forgotten your password?{" "}
          <Link href="/forgot-password" className="pl-2 underline">
            Reset it here.
          </Link>
        </div>
        <div className="text-center pb-5 ">or</div>
      </form>
      <ContinueWithGoogleButton />
    </Form>
  );
};

export default LoginForm;
