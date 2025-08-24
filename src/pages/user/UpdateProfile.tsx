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
import {
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/feature/user/user.api";
import { updateProfileSchema } from "@/zodSchema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import z from "zod";



export default function UpdateProfile() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);
  const [updateUserInfo, { isLoading: updateProfileLoading }] =
    useUpdateUserInfoMutation();
  const navigate = useNavigate();

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



  if (isLoading) return <Loading />;


  // Handle Update Profile
  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const toastId = toast.loading("Updating...");

    const userData = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address
    }


    try {
      const res = await updateUserInfo({
        userId: userProfile?._id,
        userData: userData,
      }).unwrap();

      if (res.success && res.statusCode === 200) {
        toast.success(res.message, { id: toastId });
        navigate("/dashboard/profile")
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
    <div>
      <div>
        <h2 className="text-3xl text-foreground font-ride-title mb-10">
          Update Profile
        </h2>
      </div>
      <div className="max-w-2xl w-full mx-auto">
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
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Email can not be updated
                      </FormDescription>
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
              disabled={updateProfileLoading}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
