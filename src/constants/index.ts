export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "Features" },
  { href: "#", label: "Pricing" },
  { href: "#", label: "About" },
];




export const role = {
  admin: "admin",
  rider: "rider",
  driver: "driver",
};



export const rideStatusColorMap: Record<string, string> = {
  requested:
    "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
  accepted: "text-sky-800 bg-sky-100 dark:text-sky-300 dark:bg-sky-900/50",
  picked_up: "text-blue-800 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50",
  in_transit:
    "text-indigo-800 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50",
  completed:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  cancelled: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
  rejected: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
};



export const userStatusColorMap: Record<string, string> = {
  // IsActive statuses
  active:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  inactive:
    "text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50",
  blocked: 
    "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",

  // DriverStatus statuses
  pending:
    "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
  approved:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  rejected:
    "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
  suspend: // 'suspend' এবং 'blocked' এর জন্য ভিন্ন কালার ব্যবহার করা যেতে পারে
    "text-orange-800 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/50",
};