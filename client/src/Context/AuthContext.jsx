// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    // Check localStorage for a token when the app first loads
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    // Function to handle login
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    // The value that will be available to all consuming components
    const value = {
        authToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};