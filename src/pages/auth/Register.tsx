import Logo from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/feature/auth/auth.api";
import { registerZodSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import type z from "zod";

export default function Register() {

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerZodSchema>) => {
    const toastId = toast.loading("Registering...");
    const userData = {
        name: values.name,
        email: values.email,
        password: values.password
    }


    try {
        const res = await register(userData).unwrap();

        if (res.success && res.statusCode === 201) {
            toast.success(res.message, { id: toastId});
            navigate("/login")
        }
    } catch (error: unknown) {
        const errorMessage =
          typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: unknown }).data === "object" &&
          (error as { data?: unknown }).data !== null &&
          "message" in (error as { data?: { message?: string } }).data!
            ? ((error as { data: { message: string } }).data.message)
            : "An error occurred";
        toast.error(errorMessage, { id: toastId })

        console.log(error)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={cn("flex flex-col gap-6 max-w-3xl mx-auto")}>
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Logo width="24" height="24" />
              <h2 className="text-2xl font-ride-title">Rydex</h2>
            </div>
            <CardTitle className="text-xl">Register your account</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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

                  <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                    Register
                  </Button>
                </form>
              </Form>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
