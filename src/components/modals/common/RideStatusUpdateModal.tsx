import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IRide } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface IRideStatusProps {
  ride: IRide;
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

const rideStatusSchema = z.object({
  rideStatus: z.string().nonempty("Status is required"),
});

export function RideStatusUpdateModal({
  ride,
  open,
  onChange,
}: IRideStatusProps) {
  const form = useForm<z.infer<typeof rideStatusSchema>>({
    resolver: zodResolver(rideStatusSchema),
    defaultValues: {
      rideStatus: ride.rideStatus,
    },
  });
  
  useEffect(() => {
    if (ride) {
      form.reset({
        rideStatus: ride.rideStatus
      })
    }
  }, [ride, form])
  
  const onSubmit = (values: z.infer<typeof rideStatusSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Ride Status</DialogTitle>
          <DialogDescription>
            Select a new status for this ride from the list below and click 'Save changes' to apply.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="ride-status-form"
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="rideStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ride Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a ride status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="requested">
                          Requested
                        </SelectItem>
                        <SelectItem value="cancelled">
                          Cancelled
                        </SelectItem>
                        <SelectItem value="rejected">
                          Rejected
                        </SelectItem>
                        <SelectItem value="accepted">
                          Accepted
                        </SelectItem>
                        <SelectItem value="picked_up">
                          Picked Up
                        </SelectItem>
                        <SelectItem value="in_transit">
                          In Transit
                        </SelectItem>
                        <SelectItem value="completed">
                          Completed
                        </SelectItem>

                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="ride-status-form" className="cursor-pointer">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
