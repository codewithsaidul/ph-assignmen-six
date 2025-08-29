import { baseApi } from "@/redux/baseApi/base.api";
import type {
  IDriverProfile,
  IDriverStats,
  IResponse,
  IUpdateDriverStatus,
  IIncomingRideRequest,
  IIncomingRequestParams,
} from "@/types";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverAnalytics: builder.query<IDriverStats, undefined>({
      query: () => ({
        url: "/analytics/driverStats",
        method: "GET",
      }),
      providesTags: ["Analytics"],
      transformResponse: (response: { data: IDriverStats }) => response.data,
    }),
    getDriverProfile: builder.query<IDriverProfile, undefined>({
      query: () => ({
        url: "/drivers/me",
        method: "GET",
      }),
      providesTags: ["Driver Profile"],
      transformResponse: (response: { data: IDriverProfile }) => response.data,
    }),
    getIncomingRideRequests: builder.query<IResponse<IIncomingRideRequest[]>, IIncomingRequestParams>({
      query: ({
        page = 1,
        limit = 1,
        sortBy = "createdAt",
        sortOrder = "desc",
        minFare,
        maxFare,
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
        if (sortOrder) params.append("sortOrder", sortOrder);
        if (minFare) params.append("minFare", minFare);
        if (maxFare) params.append("maxFare", maxFare);

        return {
          url: "/drivers/incoming-request",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Incoming Ride"],
    }),
    updateDriverStatus: builder.mutation<IResponse<null>, IUpdateDriverStatus>({
      query: (userData) => ({
        url: `/drivers/${userData.driverId}/driverStatus`,
        method: "PATCH",
        data: userData,
      }),
      invalidatesTags: ["Users", "User Profile"],
    }),
    updateDriverAvaility: builder.mutation({
      query: (availability) => ({
        url: `/drivers/me/availability`,
        method: "PATCH",
        data: availability,
      }),
      async onQueryStarted({ availability }, { dispatch, queryFulfilled }) {
        const cacheUpdate = dispatch(
          driverApi.util.updateQueryData(
            "getDriverProfile",
            undefined,
            (draft) => {
              draft.availability = availability;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          cacheUpdate.undo();
        }
      },
      // invalidatesTags: ["Driver Profile"],
    }),
  }),
});

export const {
  useGetDriverAnalyticsQuery,
  useGetDriverProfileQuery,
  useGetIncomingRideRequestsQuery,
  useUpdateDriverStatusMutation,
  useUpdateDriverAvailityMutation,
} = driverApi;
