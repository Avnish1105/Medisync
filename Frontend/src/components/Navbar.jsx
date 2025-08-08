import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true); // simulate login state
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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    My Profile
                  </p>
                  <p onClick={() => { navigate('/myappointments'); setDropdownOpen(false); }} className='py-2 px-3 flex items-center gap-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 000-2H7zm3 0a1 1 0 000 2h.01a1 1 0 000-2H10zm3 0a1 1 0 000 2h.01a1 1 0 000-2H13zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
                    </svg>
                    My Appointments
                  </p>
                  <hr className='my-2 border-gray-200'/>
                  <p onClick={() => { setToken(false); setDropdownOpen(false); }} className='py-2 px-3 flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-md cursor-pointer transition-colors duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
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