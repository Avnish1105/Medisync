import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {
  const { appointments, fetchAllAppointments, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    fetchAllAppointments();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">All Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 border-b text-left">Patient Name</th>
              <th className="py-3 px-4 border-b text-left">Doctor Name</th>
              <th className="py-3 px-4 border-b text-left">Date</th>
              <th className="py-3 px-4 border-b text-left">Time</th>
              <th className="py-3 px-4 border-b text-left">Doctor Fees</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-blue-50 transition">
                  <td className="py-2 px-4 border-b">{appt.userData?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{appt.docData?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{appt.slotDate}</td>
                  <td className="py-2 px-4 border-b">{appt.slotTime}</td>
                  <td className="py-2 px-4 border-b">
                    {appt.docData?.fees !== undefined ? `$${appt.docData.fees}` : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {appt.cancelled ? (
                      <span className="text-red-400 font-semibold">Cancelled</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {!appt.cancelled ? (
                      <button
                        onClick={() => cancelAppointment(appt._id)}
                        className="text-red-500 hover:bg-red-100 rounded-full p-2 transition"
                        title="Cancel Appointment"
                      >
                        &#10005;
                      </button>
                    ) : (
                      <span className="text-gray-300">&#10005;</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;