import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Import the assets object

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Edward Vincent',
    email: 'richardjameswop@gmail.com',
    phone: '+1 123 456 7890',
    address: '57th Cross, Richmond Circle, Church Road, London',
    gender: 'Male',
    birthday: '2024-07-20',
  });

  const [editMode, setEditMode] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleChange = (e) => {
    setTempUserInfo({ ...tempUserInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      {/* Profile Pic and Name */}
      <div className="flex gap-8 items-center mb-6">
        <img
          src={assets.profile_pic}
          alt="Profile"
          className="w-24 h-24 rounded-lg object-cover"
        />
        {editMode ? (
          <input
            name="name"
            value={tempUserInfo.name}
            onChange={handleChange}
            className="text-xl font-semibold border px-2 py-1 rounded w-full"
          />
        ) : (
          <div className="text-xl font-semibold">{userInfo.name}</div>
        )}
      </div>

      {/* Contact Info */}
      <div className="border-t pt-4 mb-6">
        <h3 className="font-medium text-gray-600 mb-2">CONTACT INFORMATION</h3>
        {['email', 'phone', 'address'].map((field) => (
          <div key={field} className="mb-2">
            <span className="font-medium capitalize">{field}:</span>{' '}
            {editMode ? (
              <input
                name={field}
                value={tempUserInfo[field]}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full mt-1"
              />
            ) : (
              <span>{userInfo[field]}</span>
            )}
          </div>
        ))}
      </div>

      {/* Basic Info */}
      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-600 mb-2">BASIC INFORMATION</h3>

        {/* Gender */}
        <div className="mb-2">
          <span className="font-medium">Gender:</span>{' '}
          {editMode ? (
            <select
              name="gender"
              value={tempUserInfo.gender}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span>{userInfo.gender}</span>
          )}
        </div>

        {/* Birthday */}
        <div className="mb-2">
          <span className="font-medium">Birthday:</span>{' '}
          {editMode ? (
            <input
              name="birthday"
              type="date"
              value={tempUserInfo.birthday}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            />
          ) : (
            <span>{new Date(userInfo.birthday).toLocaleDateString('en-GB')}</span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Save Information
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setTempUserInfo(userInfo);
              setEditMode(true);
            }}
            className="border px-4 py-2 rounded text-blue-600 hover:bg-blue-50"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
