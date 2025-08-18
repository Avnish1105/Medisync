import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { userData, bookAppointment, backendUrl } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeRange = { start: 10, end: 20.5 }; // 10 AM to 8:30 PM

  // Always fetch latest doctor info from backend
  const reloadDoctorInfo = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/${doctorId}`);
      if (res.data.success) {
        setDocInfo(res.data.doctor);
      }
    } catch (err) {
      // Optionally handle error
    }
  };

  // Always fetch latest doctor info on mount and when doctorId changes
  useEffect(() => {
    reloadDoctorInfo();
  }, [doctorId]);

  useEffect(() => {
    generateSlots();
  }, [selectedDateIndex]);

  const generateTimeSlots = (isToday) => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    for (let time = timeRange.start; time <= timeRange.end; time += 0.5) {
      if (!isToday || time >= currentHour) {
        const hour = Math.floor(time);
        const mins = time % 1 === 0.5 ? '30' : '00';
        const slot = `${hour % 12 || 12}:${mins} ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push(slot);
      }
    }
    return slots;
  };

  const generateSlots = () => {
    const isToday = selectedDateIndex === 0;
    const slots = generateTimeSlots(isToday);
    setAvailableSlots(slots);
  };

  const pad = n => n.toString().padStart(2, '0');
  const getNext7Days = () => {
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Build YYYY-MM-DD in local time
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        fullDate: `${year}-${month}-${day}`,
      };
    });
  };

  // Get booked slots for the selected date
  const getBookedSlots = () => {
    if (!docInfo || !docInfo.slots_booked) return [];
    const selectedDay = getNext7Days()[selectedDateIndex];
    return docInfo.slots_booked[selectedDay.fullDate] || [];
  };

  // --- Booking handler ---
  const handleBook = async () => {
    if (!userData || !userData._id) {
      toast.error("Please login to book an appointment.");
      return;
    }
    if (!docInfo || !docInfo._id) {
      toast.error("Doctor information not loaded. Please try again.");
      return;
    }
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    const selectedDay = getNext7Days()[selectedDateIndex];
    const payload = {
      userId: userData._id,
      docId: docInfo._id,
      slotDate: selectedDay.fullDate,
      slotTime: selectedSlot
    };
    const result = await bookAppointment(payload);
    if (result && result.success) {
      setSelectedSlot('');
      await reloadDoctorInfo(); // Reload slots after booking
      toast.success('Appointment booked! Updating slots...');
      setTimeout(() => navigate('/myappointments'), 1000); // 1 second delay
    }
  };

  // --- Auto-reload slots every 10 seconds ---
  useEffect(() => {
    const interval = setInterval(() => {
      reloadDoctorInfo();
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
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
          <p className="text-gray-600 mt-1">
            {docInfo.degree} - {docInfo.speciality}{' '}
            <span className="ml-2 bg-gray-100 text-sm px-2 py-1 rounded-full">{docInfo.experience}</span>
          </p>

          <h2 className="mt-4 font-medium text-gray-700">About</h2>
          <p className="text-gray-600 mt-1 leading-relaxed text-sm md:text-base">{docInfo.about}</p>

          <p className="mt-4 font-medium text-gray-800">
            Appointment fee: <span className="text-black font-bold">${docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Booking slots</h2>

        {/* Date buttons */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {getNext7Days().map((day, index) => (
            <button
              key={index}
              className={`flex flex-col items-center px-4 py-2 rounded-full border shrink-0 ${
                index === selectedDateIndex ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => {
                setSelectedDateIndex(index);
                setSelectedSlot('');
              }}
            >
              <span className="font-semibold">{day.day}</span>
              <span className="text-sm">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Time slots - scrollable horizontally */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex gap-3 w-max pr-4">
            {availableSlots.length === 0 ? (
              <p className="text-gray-500">No slots available</p>
            ) : (
              availableSlots.map((slot, index) => {
                const bookedSlots = getBookedSlots();
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button
                    key={index}
                    className={`whitespace-nowrap py-2 px-4 border rounded-full text-sm shrink-0
                      ${selectedSlot === slot && !isBooked ? 'bg-blue-600 text-white' : ''}
                      ${isBooked ? 'bg-gray-300 text-gray-500 cursor-not-allowed line-through' : 'bg-white hover:bg-blue-50'}
                    `}
                    onClick={() => !isBooked && setSelectedSlot(slot)}
                    disabled={isBooked}
                  >
                    {slot}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Book button */}
        {selectedSlot && (
          <div className="mt-6">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
              onClick={handleBook}
            >
              Book an appointment at {selectedSlot}
            </button>
          </div>
        )}
      </div>

      {/* Related Doctors Section */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />
    </div>
  );
};

export default Appointment;