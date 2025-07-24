import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

    // Función para limpiar datos de sesión
    const clearSession = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, []);

    // Inicializar estado desde localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const savedUser = localStorage.getItem('user');
                const savedToken = localStorage.getItem('token');

                if (savedUser && savedToken) {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    setToken(savedToken);
                }
            } catch (error) {
                console.error('Error al cargar usuario:', error);
                clearSession();
            } finally {
                setLoading(false);
                setInitialized(true);
            }
        };

        initializeAuth();
    }, [clearSession]);

    const login = useCallback(async (userData) => {
        try {
            setLoading(true);

            // Mock login para testing - puedes usar cualquier email/password
            if (userData.email && userData.password) {
                const mockUser = {
                    id: 1,
                    nombre: 'Usuario Demo',
                    email: userData.email,
                    rol: 'Administrador',
                    permisos: ['admin', 'ventas', 'productos', 'clientes', 'reportes']
                };

                const mockToken = 'mock-token-' + Date.now();

                setUser(mockUser);
                setToken(mockToken);
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockToken);

                return { success: true };
            } else {
                return { success: false, error: 'Email y contraseña son requeridos' };
            }

            // Código original del backend (comentado por ahora)
            /*
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
            */
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: 'Error de conexión' };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        clearSession();
    }, [clearSession]);

    const hasPermission = useCallback((permission) => {
        if (!user) return false;
        return user.permisos && user.permisos.includes(permission);
    }, [user]);

    const value = {
        user,
        loading,
        token,
        initialized,
        login,
        logout,
        hasPermission
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 