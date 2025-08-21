import { baseApi } from "@/redux/baseApi/base.api";
import type { ILogin, ILoginResponse, IRegister, IResponse, IUser } from "@/types";





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
        })
    })
})



export const { useLoginMutation, useRegisterMutation } = authApi