import React, { createContext } from 'react';
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const value = {
        // Add any context values you want to provide to the components
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
}

export default DoctorContextProvider;