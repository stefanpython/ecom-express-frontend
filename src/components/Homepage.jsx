const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-5 sm:grid-rows-6 gap-4 py-4">
        <div className="bg-blue-500 text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-auto sm:row-start-1 sm:row-end-3">
          Box 1
        </div>
        <div className="bg-green-500 text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-auto sm:row-start-1 sm:row-end-3">
          Box 2
        </div>
        <div className="bg-red-500 text-white p-4 sm:col-start-2 sm:col-end-5 h-60 sm:h-auto sm:row-start-1 sm:row-end-4">
          Box 3
        </div>

        <div className="bg-yellow-500 text-white p-4 sm:col-start-1 sm:col-end-2 h-60 sm:h-40 sm:row-start-3 ">
          Box 4
        </div>
        <div className="bg-indigo-500 text-white p-4 sm:col-start-5 sm:col-end-6 h-60 sm:h-40 sm:row-start-3 ">
          Box 5
        </div>
      </div>
    </div>
  );
};

export default Homepage;
