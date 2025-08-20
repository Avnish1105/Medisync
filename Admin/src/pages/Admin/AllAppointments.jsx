import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AllAppointments = () => {
  const { appointments, fetchAllAppointments } = useContext(AdminContext);

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  return (
    <div>
      <h2>All Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td>{appt.userData?.name}</td>
              <td>{appt.docData?.name}</td>
              <td>{appt.slotDate}</td>
              <td>{appt.slotTime}</td>
              <td>{appt.cancelled ? 'Cancelled' : 'Active'}</td>
              {/* Add more fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;