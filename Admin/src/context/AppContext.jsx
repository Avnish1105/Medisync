import React, { createContext } from 'react';
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const value = {
        // Add any context values you want to provide to the components
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;