import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: [ "Users", "User Profile", "Driver Profile", "Active Ride", "Analytics", "Rides", "Ride", "Rides History", "Incoming Ride"],
  endpoints: () => ({}),
});