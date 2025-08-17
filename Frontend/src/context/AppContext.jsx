import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

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
        toast.info('Logged out');
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    return (
        <AppContext.Provider value={{ doctors, token, setToken, register, login, logout, backendUrl }}>
            {props.children}
        </AppContext.Provider>
    );
};

export { AppContextProvider };
