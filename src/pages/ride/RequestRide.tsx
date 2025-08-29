import RideRequestForm from "@/components/modules/ride/RideRequestForm";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

export default function RequestRide() {
  return (
    <div className="lg:px-6">
      <div>
        <h1 className="text-3xl font-ride-title">Request a new Ride</h1>
        {/* <RideRequestForm /> */}
      </div>

      <div className="mt-10">
        <RideRequestForm />
      </div>
    </div>
  );
}
