const ProductDetails = () => {
  const mockProduct = {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  };

  return (
    <div className="container mx-auto px-6 lg:px-44 sm:h-screen lg:mb-40">
      <div className="flex justify-center w-fit">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6 pt-6">
          <img src="./laptop.jpg" alt="" />
          <div>Right Top</div>
          <div>Left Bottom</div>
          <div>Right Bottom</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
