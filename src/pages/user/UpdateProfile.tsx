import Loading from "@/components/loading/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const updateProfileSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "name must be contain at least 3 characters lont"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("please provide a valid email"),
  phoneNumber: z
    .string()
    .nonempty("Phone Number is required")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  address: z
    .string()
    .nonempty("Address is required")
    .max(200, "Address cannot exceed 200 characters."),
});

export default function UpdateProfile() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userProfile?.name,
      email: userProfile?.email,
      phoneNumber: userProfile?.phoneNumber,
      address: userProfile?.address,
    },
  });


  useEffect(() => {
    // userProfile এ ডেটা থাকলে
    if (userProfile) {
      // reset ফাংশন দিয়ে ফর্মের ভ্যালুগুলো সেট করে দিন
      form.reset({
        name: userProfile.name,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
        address: userProfile.address,
      });
    }
  }, [userProfile, form]);
  
  
  if (isLoading) return <Loading />

  const onSubmit = (values: z.infer<typeof updateProfileSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl text-foreground font-ride-title mb-10">
          Update Profile
        </h2>
      </div>
      <div className="max-w-2xl w-full px-4 mx-auto">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center">
            <h1 className="text-2xl text-foreground font-ride-title mt-7">
              Update Profile
            </h1>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="update-profile-form"
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
                          placeholder="Jhon Doe"
                          {...field}
                          value={field.value  || ""}
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
                          value={field.value  || ""}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>Email can not be updated</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+880 123456789"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 streat, Dhaka Bangladesh"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              variant="default"
              className="cursor-pointer"
              form="update-profile-form"
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
