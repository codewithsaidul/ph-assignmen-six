import {
  BarChart3,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  History as HistoryIcon,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  Star,
  Users,
} from "lucide-react";



export { riderTourSteps, driverTourSteps } from "./tour.steps"

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Features" },
  { href: "/faq", label: "Faq" },
  { href: "/contact", label: "Contact" },
];


export const sortOptions = [
  { value: "createdAt-desc", label: "Date: Newest to Oldest" },
  { value: "createdAt-asc", label: "Date: Oldest to Newest" },
  { value: "fare-desc", label: "Fare: High to Low" },
  { value: "fare-asc", label: "Fare: Low to High" },
];

export const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/team/sarah.jpg",
    bio: "With 15 years in transportation tech, Sarah founded Rydex to revolutionize urban mobility.",
    linkedin: "#",
    email: "sarah@rydex.com",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/team/michael.jpg",
    bio: "Former Google engineer passionate about building scalable, user-friendly transportation solutions.",
    linkedin: "#",
    email: "michael@rydex.com",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/team/emily.jpg",
    bio: "Operations expert ensuring safe, efficient rides and exceptional customer experiences.",
    linkedin: "#",
    email: "emily@rydex.com",
  },
];

export const riderFeatures = [
  {
    icon: MapPin,
    title: "Easy Ride Booking",
    description:
      "Book rides instantly with our simple interface. Enter pickup and destination, and we'll connect you with nearby drivers.",
    highlight: "One-tap booking",
  },
  {
    icon: CreditCard,
    title: "Cash-Only Payments",
    description:
      "No credit card required! Pay your driver directly in cash. Simple, secure, and accessible to everyone.",
    highlight: "100% Cash accepted",
  },
  {
    icon: Eye,
    title: "Live Ride Tracking",
    description:
      "See your driver's location in real-time, get accurate ETAs, and track your ride progress on our interactive map.",
    highlight: "Real-time GPS",
  },
  {
    icon: HistoryIcon,
    title: "Ride History",
    description:
      "Access your complete ride history with details on routes, duration, cost, and driver ratings for every trip.",
    highlight: "Complete records",
  },
];

export const driverFeatures = [
  {
    icon: CheckCircle,
    title: "Accept Ride Requests",
    description:
      "Receive instant notifications for nearby ride requests. Accept or decline based on your availability and preferences.",
    highlight: "Smart matching",
  },
  {
    icon: DollarSign,
    title: "Earning Summaries",
    description:
      "Track your daily and weekly earnings with detailed breakdowns. See completed trips, total distance, and payment summaries.",
    highlight: "Transparent earnings",
  },
  {
    icon: Clock,
    title: "Trip History",
    description:
      "Access your complete driving history with rider information, routes taken, and earnings per trip for easy record keeping.",
    highlight: "Detailed logs",
  },
  {
    icon: Star,
    title: "Rider Ratings",
    description:
      "Rate riders after each trip and see ratings from other drivers to help maintain a safe and respectful community.",
    highlight: "Two-way ratings",
  },
];

export const adminFeatures = [
  {
    icon: Settings,
    title: "Ride Management",
    description:
      "Monitor all active rides, resolve disputes, and ensure smooth operations across the entire platform.",
    highlight: "Complete oversight",
  },
  {
    icon: Users,
    title: "User Management",
    description:
      "Manage driver and rider profiles, verify identities, handle account issues, and maintain platform safety standards.",
    highlight: "User safety first",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive insights into platform performance, user behavior, revenue trends, and operational metrics.",
    highlight: "Data-driven decisions",
  },
  {
    icon: Shield,
    title: "Safety Controls",
    description:
      "Advanced safety features including driver background checks, ride monitoring, and emergency response protocols.",
    highlight: "Enhanced security",
  },
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
    text: "Rydex has been a lifesaver! As someone who prefers cash payments, this service is perfect. The drivers are always professional and the rides are comfortable.",
    location: "Downtown Customer",
  },
  {
    name: "David Chen",
    rating: 5,
    text: "I've been driving for Rydex for 6 months now. The platform is easy to use and I love helping people who need reliable transportation. Great community!",
    location: "Rydex Driver",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! I use Rydex for my daily commute and it's always reliable. The cash payment option is so convenient and the drivers are friendly.",
    location: "Regular Rider",
  },
];

export const role = {
  admin: "admin",
  rider: "rider",
  driver: "driver",
};

export const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    content: "123 Innovation Drive, Sylhet, Bangladesh",
  },
  {
    icon: Phone,
    title: "Phone Number",
    content: "1-800-RYDEX (1-800-743-3266)",
  },
  {
    icon: Mail,
    title: "Email Address",
    content: "support@rydex.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "24/7 Customer Support",
  },
];

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
      "Yes! Rydex is unique in that we accept cash payments exclusively. Simply pay your driver in cash at the end of your ride. No credit card or digital payment required.",
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
      "Rydex operates 24/7 in all our service areas. Whether you need an early morning ride to the airport or a late-night trip home, our drivers are available around the clock.",
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
      "To drive with Rydex, you need a valid driver's license, clean driving record, vehicle registration, insurance, and must pass our background check. Your vehicle must be 2010 or newer and pass our safety inspection.",
  },
  {
    id: "support",
    question: "How can I contact customer support?",
    answer:
      "Our support team is available 24/7 through the app, website chat, phone at 1-800-Rydex, or email at support@rydex.com. We typically respond within 15 minutes during business hours.",
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
      "We currently operate in 15 major cities across the country, with plans to expand to more areas. Check our app or website to see if Rydex is available in your location.",
  },
];
