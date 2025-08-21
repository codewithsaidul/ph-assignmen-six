import Loading from "@/components/loading/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import { useForm } from "react-hook-form";


export default function UpdateProfile() {
  const { data: userProfile, isLoading } = useGetUserProfileQuery(undefined);

  const form = useForm({
  })


  if (isLoading) return <Loading />;

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
            <div className="mt-10"></div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              size="lg"
              variant="default"
              className="cursor-pointer"
              asChild
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
