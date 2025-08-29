import { baseApi } from "@/redux/baseApi/base.api";
import type { IAdminAnalytics, IAdminAnalyticsResponseData } from "@/types";




export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminAnalytics: builder.query<IAdminAnalytics, undefined>({
            query: () => ({
                url: "/analytics/stats",
                method: "GET"
            }),
            providesTags:["Analytics"],
            transformResponse: (response: IAdminAnalyticsResponseData) => response.data
        })
    })
})


export const { useGetAdminAnalyticsQuery } = adminApi