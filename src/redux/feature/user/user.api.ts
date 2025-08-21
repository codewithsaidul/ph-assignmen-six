import { baseApi } from "@/redux/baseApi/base.api";






export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["User Profile"],
            transformResponse: (response) => response.data
        }),
    })
})



export const { useGetUserProfileQuery } = userApi