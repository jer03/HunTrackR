import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token + fetch profile on first load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/users/profile');
                    setUser(res.data.user);
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    // Login action
    const login = async (email, password) => {
        const res = await api.post('/users/login', { email, password });
        localStorage.setItem('token', res.data.token);
        const profile = await api.get('/users/profile');
        setUser(profile.data.user);
    };

    // Register action
    const register = async (name, email, password) => {
        await api.post('/users/register', { name, email, password });
        return login(email, password);
    };

    // Logout action
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = { user, loading, login, register, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
