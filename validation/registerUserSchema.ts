import { z } from "zod";

export const registerUserFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(3, "Name must be at least 3 characters long"),
    password: z.string().refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value);
      },
      {
        message:
          "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });
