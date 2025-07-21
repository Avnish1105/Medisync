import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true); // simulate login state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 z-50 relative'>

      <img
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt="Logo"
        onClick={() => navigate('/')}
      />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {[
          { label: 'Home', path: '/' },
          { label: 'All Doctors', path: '/doctors' },
          { label: 'About', path: '/about' },
          { label: 'Contact', path: '/contact' },
        ].map(({ label, path }) => (
          <NavLink key={path} to={path} className="text-center">
            {({ isActive }) => (
              <>
                <li className='py-1'>{label}</li>
                <hr
                  className={`${
                    isActive ? 'block' : 'hidden'
                  } h-0.5 bg-blue-600 w-3/5 m-auto rounded transition-all duration-300`}
                />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className='flex items-center gap-4 relative' ref={dropdownRef}>
        {token ? (
          <div className='relative'>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center gap-2 cursor-pointer'
            >
              <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            </div>

            {dropdownOpen && (
              <div className='absolute right-0 mt-3 bg-white shadow-md border rounded-md p-4 z-20 text-gray-700 text-sm min-w-[150px]'>
                <p onClick={() => { navigate('/myprofile'); setDropdownOpen(false); }} className='hover:text-blue-600 cursor-pointer'>My Profile</p>
                <p onClick={() => { navigate('/myappointments'); setDropdownOpen(false); }} className='hover:text-blue-600 cursor-pointer'>My Appointments</p>
                <p onClick={() => { setToken(false); setDropdownOpen(false); }} className='hover:text-red-600 cursor-pointer'>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
