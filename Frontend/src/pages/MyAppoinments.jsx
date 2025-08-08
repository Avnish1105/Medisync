import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  // Simulate appointment payment status
  const appointmentStatus = ['paid', 'unpaid', 'unpaid']; // Example for 3 appointments

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">My Appointments</h1>

      <div className="flex flex-col gap-6">
        {doctors.slice(0, 3).map((doctor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border rounded-xl p-6 shadow-sm gap-4"
          >
            {/* Doctor Info */}
            <div className="flex gap-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p><strong>Address:</strong><br />57th Cross, Richmond Circle, Church Road, London</p>
                  <p className="mt-1"><strong>Date & Time:</strong> 25 July, 2024 | 8:30 PM</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 md:items-end w-full md:w-auto">
              {appointmentStatus[index] === 'paid' ? (
                <button
                  disabled
                  className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md opacity-70 cursor-default"
                >
                  Paid
                </button>
              ) : (
                <>
                  <button
                    className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Pay here
                  </button>
                </>
              )}
              <button
                className="border border-gray-400 text-sm px-5 py-2 rounded-md hover:border-red-500 hover:text-red-500 transition-colors"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
