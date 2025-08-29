import z from "zod";

export const registerZodSchema = z
  .object({
    name: z
      .string("Name must be a string")
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    role: z.enum(["rider", "driver"]),
    email: z
      .string("Email must be a string")
      .nonempty("email is required")
      .email({ message: "please provide valid email address" }),
    password: z
      .string("Password must be a string")
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
      .string("Confirm Password must be a string")
      .min(8, { error: "password must be at least 8 character long" }),
    licenseNumber: z
      .string()
      .min(6, "License number must be at least 6 characters")
      .max(20, "License number must be at most 20 characters")
      .optional(),
    vehicleType: z.string().min(1, "Vehicle type is required").optional(),
    model: z.string().min(1, "Model is required").optional(),
    plate: z
      .string()
      .min(8, "Plate number must be at least 8 characters")
      .max(30, "Plate number must be at most 30 characters").optional(),
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

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string("Old Password must be a string")
      .nonempty("Old Password is required")
      .min(8, "Old Password must be contain at least 8 characters long"),
    newPassword: z
      .string()
      .nonempty({ message: "New Password is required" })
      .min(8, { message: "New Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "New Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[a-z])/, {
        message: "New Password must contain at least 1 lowercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "New Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        message: "New Password must contain at least 1 number.",
      }),
    confirmNewPassword: z
      .string("Confirm New Password must be a string")
      .min(
        8,
        "Confirm New Password must be contain at least 8 characters long"
      ),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New Password do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New Password cannot be the same as the old one",
    path: ["newPassword"],
  });
