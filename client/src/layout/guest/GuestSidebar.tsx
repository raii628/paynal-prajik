import { FC } from "react"
import { NavLink } from "react-router-dom"

const GuestSidebar: FC = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Guest Dashboard</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book-room"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-10 4h10m-10 4h10" />
              </svg>
              Book Room
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              My Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vip-upgrade"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              VIP Upgrade
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4" />
              </svg>
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.176 0 4.21.498 6.121 1.404M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className="flex items-center p-2 hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
              </svg>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default GuestSidebar