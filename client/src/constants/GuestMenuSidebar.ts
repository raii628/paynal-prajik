import {
  faHouseUser,
  faCalendarCheck,
  faMapMarkerAlt,
  faWindowClose,
  faComment,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

export const guestMenuItems = [
  {
    icon: faHouseUser,
    label: "Dashboard",
    link: "/guest",
  },
  {
    icon: faCalendarCheck,
    label: "Book Room",
    link: "/guest/bookings",
  },
  {
    icon: faMapMarkerAlt,
    label: "Area Reservation",
    link: "/guest/areas",
  },
  {
    icon: faWindowClose,
    label: "Cancellation",
    link: "/guest/cancellation",
  },
  {
    icon: faComment,
    label: "Reviews",
    link: "/guest/reviews",
  },
  {
    icon: faFileAlt,
    label: "Reports",
    link: "/guest/reports",
  },
];
