import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [componentData, setComponentData] = useState({title: "", slogan: ""});

    return (
        <AdminContext.Provider value={{ componentData, setComponentData }}>
            {children}
        </AdminContext.Provider>
    );
};
