import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(filtered);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) return null;

  return (
    <div className="mt-20 px-4 md:px-10 text-center">
      <h2 className="text-3xl font-semibold text-[#1F1F1F] mb-2">Related Doctors</h2>
      <p className="text-sm text-gray-500 mb-10">Simply browse through our extensive list of trusted doctors.</p>

      <div className="flex flex-wrap justify-center gap-6">
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="w-[260px] bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[240px] object-cover bg-[#F5F8FF]"
            />

            <div className="p-4 text-left">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`font-medium ${item.available ? 'text-green-600' : 'text-gray-400'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <p className="text-lg font-semibold text-[#1F1F1F]">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
