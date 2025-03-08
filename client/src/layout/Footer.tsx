import { footerSections } from "../constants/Footer";

const Footer = () => {
  return (
    <footer className="relative bg-[#eff3f7] px-30 py-5">
      <h1 className="text-2xl text-blue-700 mb-2">Azurea</h1>
      <section className="flex justify-between py-2">
        {footerSections.map((section, index) => (
          <div key={index}>
            <h1 className="text-sm font-semibold">{section.title}</h1>
            <ul className="pt-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="text-xs pt-2">
                  <a href="#" className="text-blue-600 hover:underline transition-all duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="text-center py-5">
        <h1 className="text-xs border-t-2 border-gray-200 pt-5">
          &copy; {new Date().getFullYear()} Azurea. All rights reserved. Azurea and its logo are
          trademarks of Azurea, Inc.
        </h1>
      </section>
    </footer>
  );
};

export default Footer;
