import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/user/get-profile',
                { headers: { token } }
            );
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Register user
    const register = async (form) => {
        try {
            const res = await axios.post(`${backendUrl}/api/user/register`, form);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                toast.success('Registration successful!');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Error registering user');
        }
    };

    // Login user
    const login = async (form) => {
        try {
            const res = await axios.post(`${backendUrl}/api/user/login`, form);
            if (res.data.success) {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                toast.success('Login successful!');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Error logging in');
        }
    };

    // Logout user
    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        setUserData(null);
        toast.info('Logged out');
    };

    // Update user profile
    const updateProfile = async (formData) => {
        try {
            const res = await axios.post(
                backendUrl + '/api/user/update-profile',
                formData,
                {
                    headers: {
                        token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (res.data.success) {
                toast.success('Profile updated successfully!');
                loadUserProfileData();
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Error updating profile');
        }
    };

    // Send JSON for booking appointment
    const bookAppointment = async (payload) => {
        try {
            const res = await axios.post(
                backendUrl + '/api/user/book-appointment',
                payload,
                {
                    headers: {
                        token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (res.data.success) {
                toast.success(res.data.message || 'Appointment booked successfully!');
                await getDoctorsData(); // <-- Refresh doctors after booking
            } else {
                toast.error(res.data.message || 'Failed to book appointment');
            }
            return res.data; // <-- return the result
        } catch (err) {
            toast.error('Error booking appointment');
            return { success: false };
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(
                backendUrl + '/api/user/appointments',
                { headers: { token } }
            );
            if (res.data.success) {
                setAppointments(res.data.appointments);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // --- Add this function for cancellation ---
    const cancelAppointment = async (appointmentId) => {
        try {
            const res = await axios.post(
                backendUrl + '/api/user/cancel-appointment',
                { userId: userData._id, appointmentId },
                { headers: { token } }
            );
            if (res.data.success) {
                toast.success(res.data.message || "Appointment cancelled");
                fetchAppointments();
                await getDoctorsData(); // <-- Refresh doctors after cancellation
            } else {
                toast.error(res.data.message || "Failed to cancel appointment");
            }
        } catch (err) {
            toast.error("Error cancelling appointment");
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
            fetchAppointments();
        } else {
            setUserData(null);
        }
    }, [token]);

    return (
        <AppContext.Provider value={{
            doctors,
            token,
            setToken,
            register,
            login,
            logout,
            backendUrl,
            userData,
            loadUserProfileData,
            updateProfile,
            bookAppointment,
            appointments,
            fetchAppointments,
            cancelAppointment,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContextProvider };