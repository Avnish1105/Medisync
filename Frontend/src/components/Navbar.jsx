import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AppContext); // Use context!
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 py-3' : 'bg-transparent py-4'}`}>
      <div className='flex items-center justify-between text-sm px-4 md:px-8 lg:px-12 max-w-7xl mx-auto'>

        <img
          className='w-36 md:w-44 cursor-pointer'
          src={assets.Medisync_logo}
          alt="Logo"
          onClick={() => navigate('/')}
        />

        <ul className='hidden md:flex items-center gap-6 md:gap-8 font-medium text-gray-600'>
          {[
            { label: 'Home', path: '/' },
            { label: 'All Doctors', path: '/doctors' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => (
            <NavLink key={path} to={path} className="text-center group">
              {({ isActive }) => (
                <>
                  <li className={`py-1 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'hover:text-blue-500'}`}>{label}</li>
                  <div
                    className={`h-0.5 bg-blue-600 w-3/5 m-auto rounded transition-all duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'}`}
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
                <img className='w-8 h-8 rounded-full border border-gray-300 object-cover' src={assets.profile_pic} alt="Profile" />
                <img className={`w-3 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="Dropdown Icon" />
              </div>

              {dropdownOpen && (
                <div className='absolute right-0 mt-3 w-40 bg-white shadow-xl border border-gray-100 rounded-lg p-2 z-20 text-gray-700 text-sm transform origin-top-right transition-all duration-200 ease-out animate-fade-in'>
                  <p onClick={() => { navigate('/myprofile'); setDropdownOpen(false); }} className='py-2 px-3 flex items-center gap-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200'>
                    {/* ...icon... */} My Profile
                  </p>
                  <p onClick={() => { navigate('/myappointments'); setDropdownOpen(false); }} className='py-2 px-3 flex items-center gap-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200'>
                    {/* ...icon... */} My Appointments
                  </p>
                  <hr className='my-2 border-gray-200'/>
                  <p onClick={() => { logout(); setDropdownOpen(false); }} className='py-2 px-3 flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-200'>
                    {/* ...icon... */} Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='bg-blue-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hidden md:block'
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;