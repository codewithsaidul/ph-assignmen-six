"use client";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import type { IUser } from "@/types";
import { User } from "lucide-react";
import { Link } from "react-router";
import { useLogoutMutation } from "@/redux/feature/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import toast from "react-hot-toast";
import { userApi } from "@/redux/feature/user/user.api";

interface ISidebarUserProps {
  user: IUser;
}

export default function SidebarUser({ user }: ISidebarUserProps) {
  const { isMobile } = useSidebar();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(userApi.util.resetApiState());
      toast.success("Logout Successfully");
    } catch {
      toast.error("Logout failed!");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent z-50 data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={
                    user?.profilePicture ||
                    "https://avatars.githubusercontent.com/u/124599?v=4"
                  }
                  alt={user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.name}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      user?.profilePicture ||
                      "https://avatars.githubusercontent.com/u/124599?v=4"
                    }
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User />
                  My Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
