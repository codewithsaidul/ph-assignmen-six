import { baseApi } from "@/redux/baseApi/base.api";
import type { IDriverStats, IResponse, IUpdateDriverStatus } from "@/types";

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
    getDriverProfile: builder.query({
      query: () => ({
        url: "/drivers/driverProfile",
        method: "GET",
      }),
      providesTags: ["Driver Profile"],
      transformResponse: (response) => response.data,
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
      query: ({ driverId, availability}) => ({
        url: `/drivers/${driverId}/availability`,
        method: "PATCH",
        data: availability,
      }),
      invalidatesTags: ["Users", "User Profile"],
    }),
  }),
});

export const { useGetDriverAnalyticsQuery, useGetDriverProfileQuery, useUpdateDriverStatusMutation, useUpdateDriverAvailityMutation } = driverApi;
