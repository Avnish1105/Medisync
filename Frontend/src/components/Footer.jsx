import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="mx-4 sm:mx-[10%] flex flex-col md:flex-row justify-between gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4">
          <img src={assets.logo} alt="Prescripto Logo" className="h-12 mb-4" />
          <p className="text-sm text-gray-600 max-w-xs sm:max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat iusto facilis optio vel dolore adipisci harum quibusdam! Omnis optio minima quidem facilis molestiae, officiis adipisci? Et quis unde qui?
          </p>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-800">COMPANY</p>
          <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Home</p>
          <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">About</p>
          <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Contact Us</p>
          <p className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Privacy Policy</p>
        </div>

        {/* Get in Touch Section */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-800">GET IN TOUCH</p>
          <p className="text-sm text-gray-600">+91-123-456-7890</p>
          <p className="text-sm text-gray-600">random@gmail.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center">
        <hr className="border-gray-300" />
        <p className="text-sm text-gray-500 mt-2">
          Copyright © 2024 GreatStack - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;