import Loading from "@/components/loading/Loading";
import FilterIncomingRequest from "@/components/modules/driver/ride/FilterIncomingRequest";
import IncomingRideDataTable from "@/components/modules/driver/ride/IncomingRideDataTable";
import PaginationPage from "@/components/pagination/PaginationPage";
import {
  useGetDriverProfileQuery,
  useGetIncomingRideRequestsQuery,
} from "@/redux/feature/driver/driver.api";
import type { IIncomingRideRequest } from "@/types";
import { useEffect, useMemo, useState } from "react";

export default function IncomingRequest() {
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("createdAt-desc");
  const [fareRange, setFareRange] = useState({ min: "", max: "" });
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");

  const { data: driverProfile } = useGetDriverProfileQuery(undefined);

  // --- Debounce Logic ---
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMinFare(fareRange.min);
      setMaxFare(fareRange.max);
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if inputValue changes before 500ms
    return () => {
      clearTimeout(timerId);
    };
  }, [fareRange.min, fareRange.max]);

  const sortParams = useMemo(() => {
    const [sortBy, sortOrder] = sortValue.split("-");
    return { sortBy, sortOrder };
  }, [sortValue]);

  // 👇 মূল সমাধান: একটিমাত্র queryParams অবজেক্ট তৈরি করুন
  const queryParams = useMemo(
    () => ({
      page,
      limit: 15,
      sortBy: sortParams.sortBy,
      sortOrder: sortParams.sortOrder,
      minFare: minFare || undefined,
      maxFare: maxFare || undefined,
    }),
    [page, sortParams, minFare, maxFare]
  );
  // fetch incoming ride request data from db using rtk query
  const { data, isLoading } = useGetIncomingRideRequestsQuery(queryParams);

  if (isLoading && !data) return <Loading />;

  if (data && driverProfile?.availability !== "online") {
    return (
      <div>
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>

        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="font-semibold text-2xl min-[370px]:text-4xl font-ride-title">
              You are currently Offline.
            </h2>
            <p className="text-xs min-[370px]:text-base mt-3">
              To accept rides, you need to go online first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const allIncomingRides = data?.data;
  const pagination = data?.meta;

  const handleResetFilterr = () => {
    setFareRange({ min: "", max: "" });
    setSortValue("createdAt-desc");
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>
      </div>

      {/* incoming request filter */}
      <FilterIncomingRequest
        min={fareRange.min}
        max={fareRange.max}
        sortValue={sortValue}
        setSortValue={setSortValue}
        setFareRange={setFareRange}
        handleResetFilterr={handleResetFilterr}
      />

      {/* ================ table body ================== */}
      <IncomingRideDataTable
        allIncomingRides={allIncomingRides as IIncomingRideRequest[]}
        queryParams={queryParams}
      />
      {/* ================ table body ================== */}

      {Array.isArray(allIncomingRides) &&
        allIncomingRides?.length > 19 &&
        pagination &&
        pagination.total > 20 && (
          <div className="mt-10">
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        )}
    </div>
  );
}
