"use server";

import { auth } from "@/firebase/server";
import { registerUserFormSchema } from "@/validation/registerUserSchema";

export const registerUser = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}) => {
  const validation = registerUserFormSchema.safeParse(data);

  if (!validation.success) {
    return {
      message: validation.error.issues[0]?.message ?? "Invalid data",
      status: 400,
    };
  }

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    return {
      message: "User registered successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Error register user:", error);
    return {
      message: "Could not register user",
      status: 500,
    };
  }
};
