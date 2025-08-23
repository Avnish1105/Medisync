import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Dashboard = () => {
  const { dashboard, fetchDashboard } = useContext(AdminContext);

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, []);

  if (!dashboard) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold">{dashboard.doctors}</div>
          <div className="text-gray-600">Doctors</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold">{dashboard.patients}</div>
          <div className="text-gray-600">Patients</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold">{dashboard.appointments}</div>
          <div className="text-gray-600">Appointments</div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Latest Appointments</h3>
      <ul>
        {dashboard.latestAppointments.map((appt, idx) => (
          <li key={appt._id || idx} className="mb-2 border-b pb-2">
            <span className="font-medium">Date:</span> {appt.slotDate} &nbsp;
            <span className="font-medium">Time:</span> {appt.slotTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;