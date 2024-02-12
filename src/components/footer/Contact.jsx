import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Clear the form fields after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    // Show confirmation alert
    window.alert("Message has been successfully sent!");
  };

  return (
    <div className="flex items-center justify-center min-h-[870px]">
      <div className="max-w-md mx-auto px-6 -mt-60">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className=" border border-gray-300 rounded p-2 w-72 sm:w-96"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className=" border border-gray-300 rounded p-2 w-72 sm:w-96"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-72 sm:w-96"
              rows={4}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
