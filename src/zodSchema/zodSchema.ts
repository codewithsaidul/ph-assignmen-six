import z from "zod";

export const registerZodSchema = z
  .object({
    name: z
      .string()
      .nonempty("email is required")
      .min(3, "Name must be at least 3 characters long"),
    email: z
      .string()
      .nonempty("email is required")
      .email({ message: "please provide valid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "Password must contain at least 1 lowercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "password must be at least 8 character long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
