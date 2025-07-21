import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctors } from '../assets/assets';

const Appointment = () => {
  const { doctorId } = useParams();
  const [docInfo, setDocInfo] = useState(null);

  const [doctorSlots,setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  

  useEffect(() => {
    const found = doctors.find(doc => doc._id === doctorId);
    setDocInfo(found);
  }, [doctorId]);

  if (!docInfo) return <div className="text-center mt-10 text-lg">Loading doctor info...</div>;

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto">
      <div className="bg-white border rounded-xl shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
        <img src={docInfo.image} alt={docInfo.name} className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-lg" />

        <div className="flex-1">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <span className="text-blue-500 text-xl">✔️</span>
          </h1>

          <p className="text-gray-600 mt-1">{docInfo.degree} - {docInfo.speciality} <span className="ml-2 bg-gray-100 text-sm px-2 py-1 rounded-full">{docInfo.experience} </span></p>

          <h2 className="mt-4 font-medium text-gray-700">About</h2>
          <p className="text-gray-600 mt-1 leading-relaxed text-sm md:text-base">
            {docInfo.about}
          </p>

          <p className="mt-4 font-medium text-gray-800">Appointment fee: <span className="text-black font-bold">${docInfo.fees}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;