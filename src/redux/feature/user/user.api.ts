import { baseApi } from "@/redux/baseApi/base.api";
import type { IResponse, IUpdateProfile, IUser } from "@/types";






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
        getAllUsers: builder.query({
            query: () => ({
                url: "/user/all-users",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        updateUserInfo: builder.mutation<IResponse<IUser>, IUpdateProfile>({
            query: ( { userId, userData }) => ({
                url: `/user/${userId}`,
                method: "PATCH",
                data: userData
            }),
            invalidatesTags: ["Users", "User Profile"]
        }),
    })
})



export const { useGetUserProfileQuery, useUpdateUserInfoMutation } = userApi