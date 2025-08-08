import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-16 py-12 text-gray-800">
      <h1 className="text-center text-3xl font-semibold mb-12">
        CONTACT <span className="text-black font-bold">US</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Contact Image */}
        <img
          src={assets.contact_image}
          alt="Contact"
          className="w-full md:w-1/2 max-w-[600px] rounded-xl shadow-lg"
        />

        {/* Contact Details */}
        <div className="text-left w-full md:w-1/2 max-w-[500px] space-y-8">
          <div>
            <h2 className="text-lg font-semibold">OUR OFFICE</h2>
            <p className="mt-2">54709 Willms Station<br />
              Suite 350, Washington, USA</p>
            <p className="mt-2">Tel: (415) 555-0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">CAREERS AT PRESCRIPTO</h2>
            <p className="mt-2">Learn more about our teams and job openings.</p>
            <button className="mt-3 px-6 py-2 border rounded-md hover:bg-gray-100 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
