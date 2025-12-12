import aoKhoac from "../../../../assets/img/imageHomePage/aokhoacfake.jpg";

type StyleCard = {
  title: string;
  img: string;
};

const styles: StyleCard[] = [
  { title: "Casual", img: aoKhoac },
  { title: "Formal", img: aoKhoac },
  { title: "Party", img: aoKhoac },
  { title: "Gym", img: aoKhoac },
];

const BrowseByStyle = () => {
  return (
    <section className="max-w-6xl mx-auto px-10 py-14 rounded-4xl bg-gray-200">
      <h2 className="text-4xl md:text-4xl !font-extrabold mb-6 text-center">
        BROWSE BY DRESS STYLE
      </h2>

      <div className="mt-12">
        {/* Hàng 1 */}
        <div className="grid grid-cols-3 gap-3 mb-4 ">
          <div className="relative col-span-1 rounded-xl overflow-hidden shadow-md h-56 md:h-72 transform transition-transform duration-300 hover:scale-105">
            <img
              src={styles[0].img}
              alt={styles[0].title}
              className="w-full h-full object-cover opacity-80"
            />
            <span
              className="absolute top-2 left
            -2 text-black !font-bold text-lg"
            >
              {styles[0].title}
            </span>
          </div>
          <div className="relative col-span-2 rounded-xl overflow-hidden shadow-md h-56 md:h-72 transform transition-transform duration-300 hover:scale-105">
            <img
              src={styles[1].img}
              alt={styles[1].title}
              className="w-full h-full object-cover opacity-80"
            />
            <span className="absolute top-2 left-2 text-black !font-bold text-lg">
              {styles[1].title}
            </span>
          </div>
        </div>

        {/* Hàng 2 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative col-span-2 rounded-xl overflow-hidden shadow-md h-56 md:h-72 transform transition-transform duration-300 hover:scale-105">
            <img
              src={styles[2].img}
              alt={styles[2].title}
              className="w-full h-full object-cover opacity-80"
            />
            <span className="absolute top-2 left-2 text-black !font-bold text-lg">
              {styles[2].title}
            </span>
          </div>
          <div className="relative col-span-1 rounded-xl overflow-hidden shadow-md h-56 md:h-72 transform transition-transform duration-300 hover:scale-105">
            <img
              src={styles[3].img}
              alt={styles[3].title}
              className="w-full h-full object-cover opacity-80"
            />
            <span className="absolute top-2 left-2 text-black !font-bold text-lg">
              {styles[3].title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyle;
