import Logo from "@/components/logo/Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-card">
      <div className="mx-auto container space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Logo width="40" height="40" />
              <h2 className="text-5xl">Rydex</h2>
            </div>

            <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
              Rydex is a modern ride booking system that allows users to book rides seamlessly, track drivers in real time, and manage rides efficiently with a smooth and intuitive interface.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Services
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    1on1 Coaching
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Company Review
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Accounts Review
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    HR Consulting
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    SEO Optimisation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Company
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Meet the Team
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Accounts Review
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Helpful Links
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Live Chat
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900 dark:text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Accessibility
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Returns Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="#"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    Hiring-3 Statistics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2022. Rydex | Intelligent Ride Booking Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
