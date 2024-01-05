import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Homepage = () => {
  return (
    <div className="container mx-auto px-4 sm:mb-44 bg-slate-500">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-5 lg:gap-4 pt-3">
        <img
          src="./sales1.jpg"
          alt=""
          className="w-full text-white p-4 lg:col-start-1 lg:col-end-2 h-96  lg:row-start-1 lg:row-end-3"
        />

        <img
          src="./sales1.jpg"
          alt=""
          className="w-full text-white p-4 lg:col-start-5 lg:col-end-6 h-96  lg:row-start-1 lg:row-end-3"
        />

        <Carousel className=" text-white p-4 lg:col-start-2 lg:col-end-5 lg:row-start-1 lg:row-end-4">
          <div>
            <img
              src="./sale1.jpg"
              alt="Image 1"
              className="max-w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src="./sale2.jpg"
              alt="Image 2"
              className="max-w-full h-full object-cover"
            />
          </div>
        </Carousel>

        <img
          src="./store.png"
          alt=""
          className="w-full text-white p-4 lg:col-start-1 lg:col-end-2 lg:row-start-3 "
        />

        <img
          src="./store.png"
          alt=""
          className="w-full text-white p-4 lg:col-start-5 lg:col-end-6 lg:row-start-3 "
        />
      </div>
    </div>
  );
};

export default Homepage;
