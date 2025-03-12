<<<<<<< HEAD
import { faHouse, faCalendarDays, faBed, faUsers } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { 
    icon: faHouse, 
=======
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
>>>>>>> upstream/main
    label: "Dashboard",
    link: '/admin' 
  },
  { 
<<<<<<< HEAD
    icon: faCalendarDays, 
    label: "Reservation",
    link: '/admin/reservation' 
=======
    icon: faCalendarCheck, 
    label: "Reservations/Bookings",
    link: '/admin/reservations' 
>>>>>>> upstream/main
  },
  { 
    icon: faBed,
    label: "Manage Rooms",
    link: '/admin/rooms' 
  },
<<<<<<< HEAD
  { 
    icon: faUsers, 
    label: "Staff Section",
    link: '/admin/manager' 
=======
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
>>>>>>> upstream/main
  },
];
