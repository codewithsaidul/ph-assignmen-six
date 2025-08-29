import {
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Shield,
} from "lucide-react";

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "#", label: "Features" },
  { href: "/faq", label: "Faq" },
  { href: "#", label: "About" },
];

export const steps = [
  {
    icon: MapPin,
    title: "Book Your Ride",
    description:
      "Enter pickup location and destination. We'll find the nearest driver for you.",
  },
  {
    icon: CheckCircle,
    title: "Enjoy the Ride",
    description:
      "Relax while our verified driver safely takes you to your destination.",
  },
  {
    icon: CreditCard,
    title: "Pay in Cash",
    description:
      "Simple cash payment at the end of your ride. No cards or apps required.",
  },
];

export const highlights = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All drivers are background-checked and vehicles are regularly inspected for your safety.",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    description:
      "Transparent, competitive rates with no hidden fees. Cash payments make it accessible to everyone.",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Need a ride at any time? Our drivers are available around the clock, every day of the year.",
    color: "text-primary",
  },
];

export const testimonials = [
  {
    name: "Maria Rodriguez",
    rating: 5,
    text: "RideBook has been a lifesaver! As someone who prefers cash payments, this service is perfect. The drivers are always professional and the rides are comfortable.",
    location: "Downtown Customer",
  },
  {
    name: "David Chen",
    rating: 5,
    text: "I've been driving for RideBook for 6 months now. The platform is easy to use and I love helping people who need reliable transportation. Great community!",
    location: "RideBook Driver",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! I use RideBook for my daily commute and it's always reliable. The cash payment option is so convenient and the drivers are friendly.",
    location: "Regular Rider",
  },
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
  inactive: "text-gray-800 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50",
  blocked: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",

  // DriverStatus statuses
  pending:
    "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
  approved:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  rejected: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
  // 'suspend' এবং 'blocked' এর জন্য ভিন্ন কালার ব্যবহার করা যেতে পারে
  suspend:
    "text-orange-800 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/50",
};

export const faqs = [
  {
    id: "payment",
    question: "Do you accept cash payments?",
    answer:
      "Yes! RideBook is unique in that we accept cash payments exclusively. Simply pay your driver in cash at the end of your ride. No credit card or digital payment required.",
  },
  {
    id: "booking",
    question: "How do I book a ride?",
    answer:
      "Booking is simple! Enter your pickup location and destination in our app or website, confirm your details, and we'll match you with the nearest available driver. You'll see their details and estimated arrival time.",
  },
  {
    id: "safety",
    question: "How do you ensure rider and driver safety?",
    answer:
      "Safety is our top priority. All drivers undergo background checks, vehicle inspections, and identity verification. Rides are tracked in real-time, and we have 24/7 support for any safety concerns.",
  },
  {
    id: "pricing",
    question: "How is the ride fare calculated?",
    answer:
      "Our fares are calculated based on distance, time, and current demand. You'll see the estimated fare before confirming your ride, and the final amount is calculated at the end of your trip.",
  },
  {
    id: "availability",
    question: "What are your service hours?",
    answer:
      "RideBook operates 24/7 in all our service areas. Whether you need an early morning ride to the airport or a late-night trip home, our drivers are available around the clock.",
  },
  {
    id: "cancellation",
    question: "Can I cancel my ride?",
    answer:
      "Yes, you can cancel your ride before the driver arrives. If you cancel within 2 minutes of booking, there's no charge. After that, a small cancellation fee may apply to compensate the driver.",
  },
  {
    id: "driver-requirements",
    question: "What are the requirements to become a driver?",
    answer:
      "To drive with RideBook, you need a valid driver's license, clean driving record, vehicle registration, insurance, and must pass our background check. Your vehicle must be 2010 or newer and pass our safety inspection.",
  },
  {
    id: "support",
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7 through the app, website chat, phone at 1-800-RIDEBOOK, or email at support@ridebook.com. We typically respond within 15 minutes during business hours.",
  },
  {
    id: "ratings",
    question: "How does the rating system work?",
    answer:
      "Both riders and drivers can rate each other after each trip on a 1-5 star scale. This helps maintain quality and safety standards. Ratings are anonymous and help build trust within our community.",
  },
  {
    id: "areas",
    question: "Which cities do you serve?",
    answer:
      "We currently operate in 15 major cities across the country, with plans to expand to more areas. Check our app or website to see if RideBook is available in your location.",
  },
];
