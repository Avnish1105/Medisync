  import React from 'react';
  import { assets } from '../assets/assets';

  const Footer = () => {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <img 
                src={assets.Medisync_logo} 
                alt="Medisync Logo" 
                className="h-auto w-40 object-contain" // Fixed logo proportions
              />
              <p className="text-sm text-gray-600 max-w-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat iusto facilis optio vel dolore adipisci harum quibusdam!
              </p>
            </div>

            {/* Company Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">COMPANY</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Contact Us', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">GET IN TOUCH</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91-123-456-7890
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  random@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-xs text-gray-500 text-center">
              Copyright © 2024 MediSync - All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;