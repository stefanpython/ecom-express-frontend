import React from "react";

const SellWithUs = () => {
  return (
    <div className="flex items-center justify-center min-h-[870px]">
      <div className="max-w-4xl mx-auto px-6 sm:-mt-60">
        <h1 className="text-3xl font-bold mb-6">Sell With Us</h1>
        <p className="text-lg mb-4">
          Are you a vendor looking to showcase your products on our platform?
          We're always on the lookout for talented sellers who offer unique and
          high-quality products that align with our brand values.
        </p>
        <p className="text-lg mb-4">
          By partnering with us, you'll gain access to our broad customer base
          and benefit from our marketing efforts to promote your products. We
          strive to create a collaborative and supportive environment for our
          sellers, providing tools and resources to help you succeed.
        </p>
        <p className="text-lg mb-4">
          If you're interested in becoming a seller on our platform, please
          reach out to us using the contact information provided below. We'd
          love to hear from you and discuss potential partnership opportunities.
        </p>

        <p className="text-lg mb-4">
          Contact us at:{" "}
          <a
            href="mailto:salesecomexpress@example.com"
            className="text-blue-500 underline"
          >
            excomexpress@sales.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default SellWithUs;
