import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer grid grid-cols-1 sm:grid-cols-3 grid-row-1 bg-slate-100 sm:-my-44 py-7 mt-10">
      <div className="sm:flex sm:text-left sm:justify-center lg:border-r-2 border-b-2 sm:border-b-0 pb-6 sm:pb-0">
        <div>
          <h1 className="text-lg text-stone-800 mb-1">CUSTOMER SERVICE</h1>
          <Link to="/contact">
            <p className="text-stone-500 mb-1">Contact Us</p>
          </Link>

          <Link to="/sell">
            <p className="text-stone-500 mb-1">Sell with Us</p>
          </Link>

          <Link to="/shipping">
            <p className="text-stone-500">Shipping</p>
          </Link>
        </div>
      </div>

      <br />

      <div className="sm:flex sm:text-left sm:justify-center sm:row-start-1 border-b-2 lg:border-r-2 sm:border-b-0 pb-6 sm:pb-0">
        <div>
          <h1 className="text-lg text-stone-800 mb-1">LINKS</h1>

          <Link to="/about">
            <p className="text-stone-500 mb-1">About Us</p>
          </Link>

          <Link to="/terms">
            <p className="text-stone-500 mb-1">Terms and conditions</p>
          </Link>

          <Link to="/processing">
            <p className="text-stone-500">Processing of personal data</p>
          </Link>
        </div>
      </div>

      <br />

      <div className="sm:flex sm:text-left sm:justify-center sm:row-start-1 sm:col-start-3 pb-6 sm:pb-0">
        <div>
          <h1 className="text-lg text-stone-800 mb-1">NEWSLETTER</h1>
          <p className="text-stone-500 mb-2">Sign Up for Our Newsletter</p>

          <div className="lg:flex lg:justify-center">
            <input
              className="border-2 rounded shadow-lg shadow-blue-100/50"
              type="text"
              placeholder="Email"
            />
            <button className="text-xs text-white p-1.5 rounded bg-blue-500 shadow-lg shadow-blue-200/50 ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
