import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
  const { userData, updateProfile, loadUserProfileData } = useContext(AppContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    gender: '',
    dob: '',
    image: null,
  });

  useEffect(() => {
    if (userData) {
      // Parse address if it's an object or string
      let addressLine1 = '';
      let addressLine2 = '';
      if (userData.address) {
        if (typeof userData.address === 'object') {
          addressLine1 = userData.address.line1 || '';
          addressLine2 = userData.address.line2 || '';
        } else if (typeof userData.address === 'string') {
          try {
            const addr = JSON.parse(userData.address);
            addressLine1 = addr.line1 || '';
            addressLine2 = addr.line2 || '';
          } catch {
            // If not JSON, treat as single line address
            addressLine1 = userData.address;
          }
        }
      }
      setForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        addressLine1,
        addressLine2,
        gender: userData.gender || '',
        dob: userData.dob || '',
        image: null,
      });
    }
  }, [userData]);

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'addressLine1' || key === 'addressLine2') return;
      if (value) formData.append(key, value);
    });
    // Only include address if at least one line is filled
    if (form.addressLine1 || form.addressLine2) {
      formData.append(
        'address',
        JSON.stringify({
          line1: form.addressLine1,
          line2: form.addressLine2,
        })
      );
    }
    await updateProfile(formData);
    setEditMode(false);
    if (typeof loadUserProfileData === 'function') {
      loadUserProfileData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      {/* Profile Pic and Name */}
      <div className="flex gap-8 items-center mb-6">
        <img
          src={userData?.image || assets.profile_pic}
          alt="Profile"
          className="w-24 h-24 rounded-lg object-cover"
        />
        {editMode ? (
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="text-xl font-semibold border px-2 py-1 rounded w-full"
          />
        ) : (
          <div className="text-xl font-semibold">{form.name}</div>
        )}
      </div>

      {/* Contact Info */}
      <div className="border-t pt-4 mb-6">
        <h3 className="font-medium text-gray-600 mb-2">CONTACT INFORMATION</h3>
        <div className="mb-2">
          <span className="font-medium capitalize">email:</span>{' '}
          <input
            name="email"
            value={form.email}
            className="border px-2 py-1 rounded w-full mt-1 bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div className="mb-2">
          <span className="font-medium capitalize">phone:</span>{' '}
          {editMode ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            />
          ) : (
            <span>{form.phone}</span>
          )}
        </div>
        <div className="mb-2">
          <span className="font-medium capitalize">address line 1:</span>{' '}
          {editMode ? (
            <input
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
              placeholder="Address Line 1"
            />
          ) : (
            <span>{form.addressLine1}</span>
          )}
        </div>
        <div className="mb-2">
          <span className="font-medium capitalize">address line 2:</span>{' '}
          {editMode ? (
            <input
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
              placeholder="Address Line 2"
            />
          ) : (
            <span>{form.addressLine2}</span>
          )}
        </div>
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
              value={form.gender}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span>{form.gender}</span>
          )}
        </div>
        {/* Birthday */}
        <div className="mb-2">
          <span className="font-medium">Birthday:</span>{' '}
          {editMode ? (
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            />
          ) : (
            <span>
              {form.dob
                ? new Date(form.dob).toLocaleDateString('en-GB')
                : ''}
            </span>
          )}
        </div>
        {/* Profile Image - Shown only in edit mode */}
        {editMode && (
          <div className="mb-2">
            <span className="font-medium">Profile Image:</span>{' '}
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full mt-1"
            />
          </div>
        )}
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
            onClick={() => setEditMode(true)}
            className="border px-4 py-2 rounded text-blue-600 hover:bg-blue-50"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
