import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="py-12 px-4 bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-semibold text-center mb-2">Top Doctors to Book</h1>
      <p className="text-center text-sm text-gray-600 mb-8">
        Simply browse through our extensive list of doctors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:[grid-template-columns:repeat(5,minmax(0,1fr))] gap-6">
        {doctors?.slice(0, 10).map((item) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <div className="text-sm">
              <div className="flex justify-between items-center text-green-600 font-medium mb-2">
                <p>Status:</p>
                <p>Available</p>
              </div>
              <p className="font-semibold text-lg text-gray-900">{item.name}</p>
              <p className="text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          See All Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
