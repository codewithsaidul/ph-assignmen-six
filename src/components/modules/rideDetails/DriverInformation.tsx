import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IDriver } from "@/types";
import { MessageCircle, Phone, Star, User } from "lucide-react";

export default function DriverInformation({ driver }: { driver: IDriver }) {


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Driver Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {driver ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-2">
                {driver?.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-semibold text-lg capitalize">
                {driver?.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.7</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <strong>Driver Id:</strong> {driver._id}
              </p>
              <p className="text-sm">
                <strong>License Number:</strong> {driver.licenseNumber}
              </p>
              <p className="text-sm">
                <strong>Vehicle Type:</strong> {driver.vehicleInfo.vehicleType}
              </p>
              <p className="text-sm">
                <strong>Vehicle:</strong> {driver.vehicleInfo.model}
              </p>
              <p className="text-sm">
                <strong>Plate:</strong> {driver.vehicleInfo.plate}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mt-5 text-xl font-ride-title">Driver not assigned</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
