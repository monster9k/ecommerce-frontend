import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="max-w-6xl mx-auto rounded-2xl bg-black text-white py-8 px-6 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-between gap-6">
        {/* H3 bên trái */}
        <h3 className="!text-4xl !font-bold md:w-1/2">
          STAY UPTO DATE ABOUT <br />
          OUR LATEST OFFERS
        </h3>

        {/* Input + Button bên phải */}
        <div className="md:w-1/3 flex flex-col gap-2">
          <div className="px-4 py-2 gap-2 !text-sm rounded-2xl text-black bg-white w-full flex items-center ">
            <Mail className="w-4 h-4 text-gray-600" />{" "}
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
            />
          </div>

          <button className="bg-white text-black px-4 py-2 !text-sm !rounded-2xl !font-bold w-ful transform transition-transform duration-300 hover:scale-105">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
