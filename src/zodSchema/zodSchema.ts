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

export const updateProfileSchema = z.object({
  name: z
    .string("Name must be a string")
    .nonempty("Name is required")
    .min(3, "name must be contain at least 3 characters lont"),
  email: z
    .string("Email must be a string")
    .nonempty("Email is required")
    .email("please provide a valid email"),
  phoneNumber: z
    .string("Phone Number must be a string")
    .nonempty("Phone Number is required")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  address: z
    .string("Address must be a string")
    .nonempty("Address is required")
    .max(200, "Address cannot exceed 200 characters."),
});
