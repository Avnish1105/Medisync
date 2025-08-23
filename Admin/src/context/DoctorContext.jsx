import React, { createContext, useState } from 'react';
import axios from 'axios';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken') || '');
    const [doctor, setDoctor] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Doctor login function
    const loginDoctor = async (email, password) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/doctor/login`,
                { email, password }
            );
            if (data.success) {
                setDoctorToken(data.token);
                setDoctor(data.doctor);
                localStorage.setItem('doctorToken', data.token);
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logoutDoctor = () => {
        setDoctorToken('');
        setDoctor(null);
        localStorage.removeItem('doctorToken');
    };

    const value = {
        doctorToken,
        setDoctorToken,
        doctor,
        setDoctor,
        loginDoctor,
        logoutDoctor,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;