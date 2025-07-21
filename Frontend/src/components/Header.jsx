import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-20 text-white shadow-2xl">
      {/* Decorative Elements */}
      <div className="absolute w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full top-[-40px] left-[-40px] sm:left-[-60px] z-0 blur-xl animate-pulse opacity-70" />
      <div className="absolute w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full bottom-[-30px] right-[30px] sm:right-[40px] z-0 blur-xl animate-pulse opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
        {/* Left Side (Text and Button) */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight drop-shadow-md">
            Book Appointment<br />With Trusted Doctors
          </h1>
          <div className="space-y-3">
            <img
              src={assets.group_profiles}
              alt="Group profiles"
              className="w-24 sm:w-32 mx-auto md:mx-0"
            />
            <p className="text-xs sm:text-sm md:text-base">
              Simply browse through our extensive list of trusted doctors,<br />schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className="inline-flex items-center gap-2 mt-4 px-4 sm:px-5 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out w-fit mx-auto md:mx-0"
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="Arrow icon" className="w-3 sm:w-4" />
          </a>
        </div>

        {/* Right Side (Image) */}
        <div className="flex-1 w-full md:w-auto flex justify-center md:justify-end relative mt-6 md:mt-0">
          <img
            src={assets.header_img}
            alt="Header image"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover drop-shadow-2xl rounded-lg transition-transform duration-500 ease-out hover:scale-105"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;  