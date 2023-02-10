import { useState, useEffect } from "react";
import { submitContact } from "../services";

const ContactForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      text: event.target.text.value,
    };

    submitContact(formData)
        .then((res)=>{
            setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        })

    event.target.reset()
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Contact Us</h3>
      <form onSubmit={handleSubmitForm}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input
            required
            type="text"
            placeholder="Your name"
            className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="name"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="email"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            required
            placeholder="Enter text..."
            className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            name="text"
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
      {showSuccessMessage && (
        <span className="text-xl font-semibold mt-3 text-green-500">
          Details submitted
        </span>
      )}
    </div>
  );
};

export default ContactForm;
