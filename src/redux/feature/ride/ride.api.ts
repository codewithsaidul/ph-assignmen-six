import { baseApi } from "@/redux/baseApi/base.api";
import type { IResponse, IRideData, IRidesParams } from "@/types";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... আপনার builder এর ভেতরে

    getAllRides: builder.query<IResponse<IRideData>, IRidesParams>({
      query: ({ page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", searchTerm, fields }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy", sortBy);
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
  }),
});



export const { useGetAllRidesQuery } = rideApi
