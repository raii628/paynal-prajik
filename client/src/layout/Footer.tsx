const Footer = () => {
  const footerSections = [
    {
      title: "Navigation",
      links: ["Home", "Rooms", "Booking", "Services", "Contact"],
    },
    {
      title: "Reservations",
      links: [
        "Book a Room",
        "Special Offers",
        "Cancel Booking",
        "Modify Reservation",
        "Group Reservations",
      ],
    },
    {
      title: "Support",
      links: [
        "FAQs",
        "Customer Support",
        "Refund Policies",
        "Privacy Policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Contact",
      links: [
        "Hotel Address",
        "Phone: 098-765-4321",
        "Email: support@azureahotel.com",
        "Social Media",
      ],
    },
  ];

  return (
    <footer className="relative bg-[#eff3f7] px-15 py-5">
      <h1 className="text-2xl text-blue-700 mb-2">Azurea Haven</h1>
      <i className="fa-solid fa-location-dot text-violet-600"></i>
      <h6 className="inline-block ml-1 text-sm italic mb-5">
        Brgy. Bubukal Sta. Cruz, Laguna
      </h6>
      <section className="flex justify-between py-2">
        {footerSections.map((section, index) => (
          <div key={index}>
            <h1 className="text-sm font-semibold">{section.title}</h1>
            <ul className="pt-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="text-xs pt-2">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline transition-all duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="flex justify-between items-center py-5 border-t-2 border-gray-200 mt-7">
        <h1 className="text-xs">
          <span className="border-r-2 border-gray-500 pr-2 mr-2">
            Privacy Policy
          </span>
          &copy; Copyright {new Date().getFullYear()} Azurea. All rights
          reserved.
        </h1>
        <div className="flex gap-5">
          <i className="fa-brands fa-instagram text-xl transition-all duration-300 border border-grey-800 p-2 rounded-full hover:bg-gradient-to-r from-[#feda75] via-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#4f5bd5] hover:bg-clip-text hover:text-transparent"></i>

          <i className="fa-brands fa-facebook text-xl transition-all duration-300 border border-black p-2 rounded-full hover:text-blue-500 hover:bg-white"></i>

          <i className="fa-brands fa-x-twitter text-xl transition-all duration-300 border border-black p-2 rounded-full hover:text-white hover:bg-black"></i>

          <i className="fa-brands fa-tiktok text-xl transition-all duration-300 border border-black p-2 rounded-full hover:text-white hover:bg-black"></i>

          <i className="fa-brands fa-linkedin text-xl transition-all duration-300 border border-black p-2 rounded-full hover:text-[#0077b5] hover:bg-white"></i>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
