import React, { createContext } from 'react';
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [atoken,setAtoken] = React.useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        // Add any context values you want to provide to the components
        atoken,setAtoken,
        backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;