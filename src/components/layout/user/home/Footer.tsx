import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Cột logo */}
        <div className="md:col-span-1">
          <h4 className=" !text-4xl !font-extrabold mb-4">SHOP.DC</h4>
          <p className="text-gray-600">
            We have clothes that suit your style and which you're proud to wear.
          </p>
          <div className="flex gap-2 mt-2">
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        {/* Nhóm menu */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "COMPANY",
              items: ["About", "Features", "Works", "Career"],
            },
            {
              title: "HELP",
              items: [
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ],
            },
            {
              title: "FAQ",
              items: ["Account", "Manage Deliveries", "Orders", "Payments"],
            },
            {
              title: "RESOURCES",
              items: [
                "Free eBooks",
                "Development Tutorial",
                "How to - Blog",
                "Youtube Playlist",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="text-left ml-20">
              <h4 className="!text-xl !font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-1 text-gray-600 text-sm list-none p-0">
                {col.items.map((i) => (
                  <li className="whitespace-nowrap" key={i}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl text-center mx-auto mt-8 text-sm text-gray-500 border-t border-gray-200 ">
        <div className="mt-4"> Shop.dc © 2000-2023, All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
