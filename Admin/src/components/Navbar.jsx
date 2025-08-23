import React from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { adminToken, setAdminToken } = React.useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    if (adminToken) {
      setAdminToken('');
      localStorage.removeItem('adminToken');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Left side - Role badge only */}
      <div className="flex items-center gap-3">
        <span className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full text-gray-700 shadow-sm">
          {adminToken ? 'Admin' : 'Doctor'}
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
