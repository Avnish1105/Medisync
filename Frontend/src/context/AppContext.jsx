import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(null);

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

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
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
            updateProfile
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContextProvider };
