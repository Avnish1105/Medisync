import React, { useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Doctorslist = () => {
  const { doctors, adminToken, getAllDoctors, changeAvailability } = React.useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-blue-50 rounded-xl shadow p-4 flex flex-col items-center transition-colors duration-200 hover:bg-blue-100"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-28 h-28 object-cover rounded-full mb-3 border"
              />
              <div className="text-center mb-2">
                <div className="font-semibold text-lg">{doctor.name}</div>
                <div className="text-gray-500 text-sm">{doctor.speciality}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={doctor.available === true}
                  onChange={() => changeAvailability(doctor._id)}
                  className="accent-blue-600 cursor-pointer"
                  id={`available-${doctor._id}`}
                />
                <label htmlFor={`available-${doctor._id}`} className="text-sm cursor-pointer">
                  Available
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No doctors found.</div>
        )}
      </div>
    </div>
  );
};

export default Doctorslist;