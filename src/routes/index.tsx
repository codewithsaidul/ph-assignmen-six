import App from "@/App";
import { role } from "@/constants";
import DashboardLayout from "@/Layout/dashboard/DashboardLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import UpdateProfile from "@/pages/user/UpdateProfile";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import UserProfile from "@/pages/user/UserProfile";
import { rideSidebarItems } from "./rideSidebarItems";
import RideDetails from "@/pages/ride/RideDetails";
import HomePage from "@/pages/public/HomePage";
import FaqPage from "@/pages/public/FaqPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "/faq",
        Component: FaqPage
      }
    ]
  },
  {
    path: "/dashboard", // <-- একটি কমন পাথ, যেমন 'dashboard'
    Component: withAuth(DashboardLayout, [
      role.admin,
      role.rider,
      role.driver,
    ] as TRole[]),
    children: [
      { index: true, element: <Navigate to="/dashboard/profile" /> },
      {
        path: "/dashboard/profile",
        Component: UserProfile,
      },
      {
        path: "/dashboard/updateProfile",
        Component: UpdateProfile,
      },
            {
        path: "/dashboard/rideDetails/:rideId",
        Component: RideDetails,
      },
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    path: "/ride",
    Component: withAuth(DashboardLayout, role.rider as TRole),
    children: [
      { index: true, element: <Navigate to="/ride/request-ride" /> },
      ...generateRoutes(rideSidebarItems),
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
