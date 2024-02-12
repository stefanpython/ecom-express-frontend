import React from "react";

const Shipping = () => {
  return (
    <div className="flex items-center justify-center min-h-[870px]">
      <div className="max-w-4xl mx-auto px-6 sm:-mt-60">
        <h1 className="text-3xl font-bold mb-6">Shipping</h1>
        <p className="text-lg mb-4">
          We offer shipping to most locations worldwide. Shipping costs and
          delivery times may vary depending on your location and the items
          ordered.
        </p>
        <p className="text-lg mb-4">
          For domestic orders, we typically use standard shipping services which
          may take 3-5 business days for delivery. Expedited shipping options
          are also available at checkout for faster delivery.
        </p>
        <p className="text-lg mb-4">
          For international orders, shipping times may vary and can take up to
          2-4 weeks for delivery depending on the destination and customs
          clearance processes.
        </p>
        <p className="text-lg mb-4">
          Please note that shipping costs and delivery times are estimates and
          may be subject to change. Any customs duties or taxes imposed by the
          destination country are the responsibility of the customer.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
