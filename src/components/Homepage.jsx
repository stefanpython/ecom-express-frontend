import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-5 sm:grid-rows-5 gap-4 pt-3 sm:-mb-40 ">
        <div className="bg-blue-500 text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-auto sm:row-start-1 sm:row-end-3 ">
          <img
            src="./super.jpg"
            alt="Image 1"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-green-500 text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-auto sm:row-start-1 sm:row-end-3">
          <img
            src="./super.jpg"
            alt="Image 2"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-red-500 text-white p-4 sm:col-start-2 sm:col-end-5 h-60 sm:h-auto sm:row-start-1 sm:row-end-4 mb-10 sm:mb-0">
          <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
            <img
              src="./sale1.jpg"
              alt="Image 3"
              className="w-full h-full object-cover"
            />
            <img
              src="./sale2.jpg"
              alt="Image 3"
              className="w-full h-full object-cover"
            />
          </Carousel>
        </div>

        <div className="bg-yellow-500 text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-40 sm:row-start-3 ">
          <img
            src="./store.png"
            alt="Image 4"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-indigo-500 text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-40 sm:row-start-3 ">
          <img
            src="./store.png"
            alt="Image 5"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
