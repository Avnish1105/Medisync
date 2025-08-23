import React from 'react';
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import Doctorlist from "./pages/Admin/Doctorslist";

const App = () => {
  const { adminToken } = React.useContext(AdminContext);

  return adminToken ? (
    <div>
      <ToastContainer />
      {/* Sidebar fixed on left */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Content shifted right */}
      <div className="ml-64">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/admindashboard" />} />
            <Route path="/admindashboard" element={<Dashboard />} />
            <Route path="/allappointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<Doctorlist />} />
            <Route path="*" element={<Navigate to="/admindashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
