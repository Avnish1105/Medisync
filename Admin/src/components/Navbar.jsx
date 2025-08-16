import React from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { atoken, setAtoken } = React.useContext(AdminContext);

  const logout = () => {
    if (atoken) {
      setAtoken('');
      localStorage.removeItem('atoken');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left side - Logo + Role badge */}
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="Prescripto Logo"
          className="h-10 w-auto object-contain"
        />
        <span className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full text-gray-700 shadow-sm">
          {atoken ? 'Admin' : 'Doctor'}
        </span>
      </div>

      {/* Right side - Logout */}
      <button
        className="bg-[#4F46E5] text-white px-6 py-2 rounded-full hover:bg-[#4338CA] transition text-sm font-medium"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
