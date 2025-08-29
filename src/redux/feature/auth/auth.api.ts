import { baseApi } from "@/redux/baseApi/base.api";
import type { IChangePassword, ILogin, ILoginResponse, IRegister, IResponse, IUser } from "@/types";





export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                data: data
            })
        }),
        register: builder.mutation<IResponse<IUser>, IRegister>({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                data: data
            })
        }),
        changePassword: builder.mutation<IResponse<null>, IChangePassword>({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                data: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["User Profile"]
        }),
    })
})



export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useChangePasswordMutation } = authApi