import { baseApi } from "@/redux/baseApi/base.api";
import type { IDriverStats } from "@/types";

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
  }),
});

export const { useGetDriverAnalyticsQuery } = driverApi;
