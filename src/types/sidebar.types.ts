export type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface SidebarGroupActionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface SidebarMenuActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  showOnHover?: boolean;
}

export interface SidebarMenuSubButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}
