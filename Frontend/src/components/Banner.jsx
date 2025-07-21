import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'; // Replaced Navigate with useNavigate

const Banner = () => {
  const navigate = useNavigate(); // Define navigate using the useNavigate hook

  return (
    <div className="relative bg-gradient-to-r from-[#4B75FC] to-[#3B5FD9] rounded-3xl overflow-hidden px-4 py-8 sm:px-6 sm:py-10 md:py-16 text-white shadow-2xl">
      {/* Decorative Elements */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-white/10 rounded-full top-[-60px] left-[-60px] z-0 blur-2xl animate-pulse opacity-70" />
      <div className="absolute w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full bottom-[-40px] right-[40px] sm:right-[80px] z-0 blur-2xl animate-pulse opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
        {/* Text and Button */}
        <div className="text-center md:text-left space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
            Book Your Appointment
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white/90">
            Connect with 100+ Trusted Doctors
          </h2>
          <p className="text-sm sm:text-base text-white/80">
            Schedule your visit with top specialists in just a few clicks.
          </p>
          <button
            onClick={() => {
              navigate('/login');
              window.scrollTo(0, 0); 
            }}
            className="bg-white text-[#4B75FC] px-6 py-2 sm:px-6 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-[#F0F4FF] hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Create Account
          </button>
        </div>

        {/* Doctor Image (Right Side) */}
        <div className="w-full md:w-auto flex justify-center md:justify-end relative">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover drop-shadow-2xl rounded-lg transition-transform duration-500 ease-out hover:scale-105"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Banner;