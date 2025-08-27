import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [ "Users", "User Profile", "Driver Profile", "Analytics", "Rides", "Ride", "Rides History"],
  endpoints: () => ({}),
});