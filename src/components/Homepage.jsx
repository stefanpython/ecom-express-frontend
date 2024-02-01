import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Homepage = ({ isAdmin }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-5 sm:grid-rows-5 gap-4 pt-3 sm:-mb-40 ">
        <div className=" text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-auto sm:row-start-1 sm:row-end-3">
          <img
            src="./super.jpg"
            alt="Image 1"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className=" text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-auto sm:row-start-1 sm:row-end-3">
          <img
            src="./super.jpg"
            alt="Image 2"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className=" text-white p-4 sm:col-start-2 sm:col-end-5 h-60 sm:h-auto sm:row-start-1 sm:row-end-4 mb-16 sm:mb-0">
          {/* <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}> */}
          <Link to="/shop">
            <Carousel showThumbs={false}>
              <img
                src="./sale1.jpg"
                alt="Image 3"
                className="w-full h-full object-cover rounded-md"
              />
              <img
                src="./sale2.jpg"
                alt="Image 3"
                className="w-full h-full object-cover rounded-md"
              />
            </Carousel>
          </Link>
        </div>

        <div className=" text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-40 sm:row-start-3 ">
          <img
            src="./store.png"
            alt="Image 4"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className=" text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-40 sm:row-start-3 ">
          <img
            src="./store.png"
            alt="Image 5"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
