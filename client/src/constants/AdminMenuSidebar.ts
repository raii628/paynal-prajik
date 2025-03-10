import { 
  faTachometerAlt, 
  faCalendarCheck, 
  faBed, 
  faUsers, 
  faMapMarkerAlt,
  faChartLine,
  faComment,
  faConciergeBell,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { 
    icon: faTachometerAlt, 
    label: "Dashboard",
    link: '/admin' 
  },
  { 
    icon: faCalendarCheck, 
    label: "Reservations/Bookings",
    link: '/admin/reservations' 
  },
  { 
    icon: faBed,
    label: "Manage Rooms",
    link: '/admin/rooms' 
  },
  {
    icon: faMapMarkerAlt,
    label: "Area Reservations",
    link: '/admin/areas'
  },
  {
    icon: faConciergeBell,
    label: "Manage Amenities",
    link: '/admin/amenities'
  },
  {
    icon: faUsers,
    label: "Manage Users",
    link: '/admin/users'
  },
  {
    icon: faComment,
    label: "Comments/Feedback",
    link: '/admin/comments'
  },
  {
    icon: faChartLine,
    label: "Reports & Analytics",
    link: '/admin/reports'
  },
];
