import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');
  const [doctors, setDoctors] = React.useState([]);

  // Fetch all appointments for admin
  const fetchAllAppointments = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/appointments`,
        {},
        { headers: { token: adminToken } }
      );
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (err) {
      // handle error (toast, etc.)
    }
  };

  // Cancel appointment by admin
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { token: adminToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllAppointments(); // Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/all-doctors',
        {},
        { headers: { token: adminToken } } // <-- fixed here
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/admin/change-availability',
        { docId },
        { headers: { token: adminToken } } // <-- fixed here
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AdminContext.Provider value={{
      appointments,
      fetchAllAppointments,
      cancelAppointment, // <-- Add this to context
      adminToken,
      setAdminToken,
      doctors,
      getAllDoctors,
      changeAvailability
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;