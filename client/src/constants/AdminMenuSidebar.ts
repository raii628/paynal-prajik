import { faHouse, faCalendarDays, faBed, faUsers } from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
  { 
    icon: faHouse, 
    label: "Dashboard",
    link: '/admin' 
  },
  { 
    icon: faCalendarDays, 
    label: "Reservation",
    link: '/admin/reservation' 
  },
  { 
    icon: faBed,
    label: "Manage Rooms",
    link: '/admin/rooms' 
  },
  { 
    icon: faUsers, 
    label: "Staff Section",
    link: '/admin/manager' 
  },
];
