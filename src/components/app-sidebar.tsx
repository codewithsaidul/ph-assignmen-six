import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import Logo from "./logo/Logo";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import SidebarUser from "./SidebarUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const { pathname } = useLocation();

  const data = {
    navMain: getSidebarItems(userProfile?.role),
  };

  return (
    <Sidebar {...props} className="z-50">
      <SidebarHeader>
        <div className="px-4 mt-6 mb-10">
          <Link to="/" className="flex items-center gap-2">
            <Logo width="28" height="28" />
          <h2 className="text-3xl font-ride-title">Rydex</h2>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item?.title}>
            <SidebarGroupLabel>{item?.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items?.map((item: { title: string, url: string}) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarUser user={userProfile} />
      </SidebarFooter>
    </Sidebar>
  );
}
