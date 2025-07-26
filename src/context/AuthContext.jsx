import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // «десь должна быть логика получени€ данных пользовател€
            // ƒл€ простоты будем хранить только логин
            const login = localStorage.getItem('userLogin');
            if (login) {
                setCurrentUser({ login, token });
            }
        }
        setLoading(false);
    }, []);

    const login = async (loginData) => {
        try {
            const response = await api.authAPI.login(loginData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userLogin', loginData.login);
            setCurrentUser({ login: loginData.login, token: response.data.token });
            return response;
        } catch (error) {
            throw error;
        }
    };

    const register = async (registerData) => {
        try {
            const response = await api.authAPI.register(registerData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userLogin', registerData.login);
            setCurrentUser({ login: registerData.login, token: response.data.token });
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userLogin');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);