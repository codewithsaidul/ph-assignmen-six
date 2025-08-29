import App from "@/App";
import { role } from "@/constants";
import DashboardLayout from "@/Layout/dashboard/DashboardLayout";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { rideSidebarItems } from "./rideSidebarItems";
import HomePage from "@/pages/public/HomePage";
import FaqPage from "@/pages/public/FaqPage";
import ContactPage from "@/pages/public/ContactPage";
import AboutPage from "@/pages/public/AboutPage";
import FeaturesPage from "@/pages/public/FeaturesPage";
import { driverSidebarItems } from "./driverSidebarItems";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/auth/Login"))
const Register = lazy(() => import("@/pages/auth/Register"))
const AccountStatusPage = lazy(() => import("@/pages/common/AccountStatusPage"))
const UpdateProfile = lazy(() => import("@/pages/user/UpdateProfile"))
const UserProfile = lazy(() => import("@/pages/user/UserProfile"))
const RideDetails = lazy(() => import("@/pages/ride/RideDetails"))
const Unauthorized = lazy(() => import("@/pages/common/Unauthorized"))



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
        path: "/about",
        Component: AboutPage
      },
      {
        path: "/features",
        Component: FeaturesPage
      },
      {
        path: "/faq",
        Component: FaqPage
      },
      {
        path: "/contact",
        Component: ContactPage
      },
    ]
  },
  {
    path: "/dashboard",
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
    path: "/driver",
    Component: withAuth(DashboardLayout, role.driver as TRole),
    children: [
      { index: true, element: <Navigate to="/driver/earnings-analytics" /> },
      ...generateRoutes(driverSidebarItems),
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
  {
    path: "/account-status",
    Component: AccountStatusPage,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);
