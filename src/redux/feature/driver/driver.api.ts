import { baseApi } from "@/redux/baseApi/base.api";
import type {
  IDriverProfile,
  IDriverStats,
  IResponse,
  IUpdateDriverStatus,
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
  useUpdateDriverStatusMutation,
  useUpdateDriverAvailityMutation,
} = driverApi;
