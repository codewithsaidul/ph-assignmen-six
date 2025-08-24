import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/feature/auth/auth.api";
import { registerZodSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const [userRole, setRole] = useState<"rider" | "driver">("rider");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "rider",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      vehicleType: "",
      model: "",
      plate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerZodSchema>) => {
    const toastId = toast.loading("Registering...");
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: userRole,
      licenseNumber: values.licenseNumber,
      vehicleInfo: {
        vehicleType: values.vehicleType,
        model: values.model,
        plate: values.plate
      }
    };

    try {
      const res = await register(userData).unwrap();

      if (res.success && res.statusCode === 201) {
        toast.success(res.message, { id: toastId });
        navigate("/login");
      }
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });

    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="name"
                  placeholder="Jhone Doe"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john@example.com"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => setRole(value as "rider" | "driver")}
                  defaultValue={field.value}
                  className="flex flex-row"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="rider" />
                    </FormControl>
                    <FormLabel className="font-normal">Rider</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="driver" />
                    </FormControl>
                    <FormLabel className="font-normal">Driver</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ================ driver field ================= */}
        {userRole === "driver" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>License Number</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          placeholder="NS9765FG56"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Moto bike"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex flex-col sm:flex-row w-full sm:items-center gap-5">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Yamaha FZS v3"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="XYZ-34-Z-90"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
