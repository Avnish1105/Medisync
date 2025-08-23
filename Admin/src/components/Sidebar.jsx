import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex-shrink-0 fixed left-0 top-0">
      {/* Title only, logo removed */}
      <div className="flex items-center gap-3 px-6 py-6">
        <h1 className="text-lg font-semibold text-gray-900">Medisync</h1>
        <span className="text-xs bg-white border border-gray-300 px-2 py-0.5 rounded-full text-gray-700">
          Admin
        </span>
      </div>

      {/* Navigation Links */}
      {adminToken && (
        <ul className="flex-1 px-2 space-y-2">
          <NavLink
            to="/admindashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
              ${isActive ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            <img src={assets.home_icon} alt="" className="h-5 w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/allappointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
              ${isActive ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            <img src={assets.appointment_icon} alt="" className="h-5 w-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
              ${isActive ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            <img src={assets.add_icon} alt="" className="h-5 w-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
              ${isActive ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`
            }
          >
            <img src={assets.people_icon} alt="" className="h-5 w-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
