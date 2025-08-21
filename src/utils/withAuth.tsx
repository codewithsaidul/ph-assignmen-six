import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";



export const withAuth = (Component: ComponentType, requiredRoles?: TRole | TRole[]) => {
    return function AuthWraper () {

        const { data: userInfo, isLoading } = useGetUserProfileQuery(undefined);

       if (!isLoading && !userInfo?.email) {
            return <Navigate to="/login" />
        }

        if (requiredRoles && !isLoading) {
            const userRole = userInfo?.role;

            if (Array.isArray(requiredRoles)) {
                if (!requiredRoles.includes(userRole)) {
                    return <Navigate to="/unauthorized" />
                }
            } else {
                if (requiredRoles !== userRole) {
                    return <Navigate to="/unauthorized" />
                }
            }
        }
        
        // return <Navigate to="/unauthorized" />

        return <Component />
    }
}