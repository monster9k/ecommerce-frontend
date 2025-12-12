import heroImg from "../../../../assets/img/imageHomePage/hero-model.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left text */}
        <div className="mr-10">
          <h1 className="!text-7xl md:text-8xl !font-extrabold  tracking-tight !mt-10">
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>
          <p className="text-gray-600 !mt-10 text-sm md:text-base max-w-xl">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <button className="!rounded-full bg-black text-white px-14 py-2 !text-xl font-medium hover:!bg-gray-400 hover:!text-black">
              Shop Now
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-8 ml-6 mt-10 mb-20">
            <div className="text-left">
              <div className="text-4xl font-bold ">200+</div>
              <div className="text-xl text-gray-500  whitespace-nowrap">
                International Brands
              </div>
            </div>
            <div className="text-left">
              <div className="text-4xl font-bold">2,000+</div>
              <div className="text-xl text-gray-500  whitespace-nowrap">
                High-Quality Products
              </div>
            </div>
            <div className="text-centleftr">
              <div className="text-4xl font-bold">30,000+</div>
              <div className="text-xl text-gray-500  whitespace-nowrap">
                Happy Customers
              </div>
            </div>
          </div>
        </div>

        {/* right image */}
        <div className="hidden md:flex justify-center md:justify-end items-start ml-20">
          <div className="md:w-[500px] -mt-4">
            {/* Ảnh chính */}
            <img
              src={heroImg}
              alt="Hero"
              className="w-full h-auto object-cover filter grayscale-10 opacity-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
