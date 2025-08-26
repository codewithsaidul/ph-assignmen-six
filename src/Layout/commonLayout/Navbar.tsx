import Logo from "@/components/logo/Logo";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { navigationLinks } from "@/constants";
import { useLogoutMutation } from "@/redux/feature/auth/auth.api";
import { useGetUserProfileQuery, userApi } from "@/redux/feature/user/user.api";
import { Link, useLocation } from "react-router";
import ProfileAvatar from "./ProfileAvatar";
import { useAppDispatch } from "@/redux/hook";
import toast from "react-hot-toast";
import { useMemo } from "react";

// Navigation links array to be used in both desktop and mobile menus

export default function Navbar() {
  // get user profile data and logout mutation
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // Handle user logout
  const handleLogout = async () => {
     try {
      await logout(undefined);
      dispatch(userApi.util.resetApiState())
      toast.success("Logout Successfully")
    } catch {
      toast.error("Logout failed!")
    }
  };


    // ২. useMemo ব্যবহার করে রোল অনুযায়ী নেভিগেশন লিংক তৈরি করুন
  const finalNavLinks = useMemo(() => {
    // প্রথমে সবার জন্য প্রযোজ্য পাবলিক লিংকগুলো নিন
    const links = [...navigationLinks];

    // ৩. রোল অনুযায়ী নতুন লিংক যোগ করুন
    if (userProfile?.role === 'rider') {
      links.push({ href: "/ride", label: "Request Ride" });
    } else if (userProfile?.role === 'driver') {
      links.push({ href: "/driver", label: "Driver Dashboard" });
    } else if (userProfile?.role === 'admin') {
      links.push({ href: "/admin", label: "Admin Dashboard" });
    }
    
    return links;
  }, [userProfile?.role]); 


  return (
    <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm z-[60]">
      <div className="flex h-16 items-center justify-between gap-4 container mx-auto px-4">
        {/* Left side */}
        {/* Main nav */}
        <div className="flex items-center gap-6">
          <div className="">
            <Link to="/" className="hover:text-primary duration-500 hover:duration-500 flex items-center gap-2">
              <Logo width="28" height="28" />
            <h2 className="text-3xl max-[350px]:hidden font-ride-title">Rydex</h2>
            </Link>
          </div>
        </div>

        {/* ================= center */}
        <div>
          {/* Navigation menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-6">
              {finalNavLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    className="text-muted-foreground data-[active]:border-b-primary hover:text-primary py-1.5 font-medium"
                    active={pathname === link.href}
                    asChild
                  >
                    <Link to={link.href} >{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <div>
            <ModeToggle />
          </div>


          
          {userProfile ? (
            <ProfileAvatar name={userProfile?.name} userRole={userProfile?.role} logOutFn={handleLogout} />
          ) : (
            <Button asChild variant="default" size="sm" className="text-sm">
              <Link to="/login">Log In</Link>
            </Button>
          )}

          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-center py-10 px-10 gap-0 md:gap-2">
                  {finalNavLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-fit">
                      <NavigationMenuLink
                        className="py-1.5 text-xl"
                        active={pathname === link.href}
                        asChild
                      >
                        <Link to={link.href} >{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
