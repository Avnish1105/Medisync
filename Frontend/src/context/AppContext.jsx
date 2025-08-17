import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
                
            }else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } 
        catch (error) {
            console.error(error);
            toast.error(error.message);


        }
    }

    useEffect(() => {
        getDoctorsData();
    }, []);

    return (

        <AppContext.Provider value={{ doctors }}>
            {props.children}
        </AppContext.Provider>

    );
};

export { AppContextProvider };
