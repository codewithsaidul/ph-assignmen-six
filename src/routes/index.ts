import App from "@/App";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
])