import { baseApi } from "@/redux/baseApi/base.api";

import type {
  IResponse,
  IRide,
  IRideData,
  IRideRequest,
  IRidesParams,
  IUpdateRideStatus,
} from "@/types";
import { driverApi } from "../driver/driver.api";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRides: builder.query<IResponse<IRideData>, IRidesParams>({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
        searchTerm,
        fields,
        minFare,
        maxFare,
        rideStatus,
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (minFare) params.append("minFare", minFare);
        if (maxFare) params.append("maxFare", maxFare);
        if (rideStatus) params.append("rideStatus", rideStatus);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (fields) {
          params.append("fields", fields);
        }

        return {
          url: "/rides",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Rides"],
    }),
    rideHistory: builder.query<IResponse<IRideData>, IRidesParams>({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
        searchTerm,
        fields,
        minFare,
        maxFare,
        rideStatus,
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (minFare) params.append("minFare", minFare);
        if (maxFare) params.append("maxFare", maxFare);
        if (rideStatus) params.append("rideStatus", rideStatus);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (fields) {
          params.append("fields", fields);
        }

        return {
          url: "/rides/histroy",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Rides History"],
    }),
    rideDetails: builder.query<IRide, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/details`,
        method: "GET",
      }),
      providesTags: ["Ride"],
      transformResponse: (response: { data: IRide }) => response.data,
    }),
    requestRide: builder.mutation<IResponse<IRide>, IRideRequest>({
      query: (rideData) => ({
        url: "/rides",
        method: "POST",
        data: rideData,
      }),
      invalidatesTags: ["Rides"],
    }),
    updateRideStatus: builder.mutation<IResponse<IRide>, IUpdateRideStatus>({
      query: ({ rideId, rideStatus }) => ({
        url: `/rides/${rideId}/rideStatus`,
        method: "PATCH",
        data: rideStatus,
      }),
      async onQueryStarted(
        { rideId, page, limit, sortBy, sortOrder },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          driverApi.util.updateQueryData(
            "getIncomingRideRequests",
            { page, limit, sortBy, sortOrder },
            (draft) => {
              const index = draft.data.findIndex((ride) => ride._id === rideId);
              if (index !== -1) {
                draft.data.splice(index, 1);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Rides", "Rides History"],
    }),
  }),
});

export const {
  useGetAllRidesQuery,
  useRideHistoryQuery,
  useRideDetailsQuery,
  useRequestRideMutation,
  useUpdateRideStatusMutation,
} = rideApi;
