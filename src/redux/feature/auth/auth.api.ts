import { baseApi } from "@/redux/baseApi/base.api";
import type { ILogin, ILoginResponse, IResponse } from "@/types";





export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                data: data
            })
        })
    })
})



export const { useLoginMutation } = authApi