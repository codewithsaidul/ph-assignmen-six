import App from "@/App";
import Login from "@/pages/auth/Login";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
        path: "/login",
        Component: Login
    }
])