import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requiredPermissions = [], requiredRole = null }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{ backgroundColor: '#f5f5f5' }}
            >
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Verificando autenticación...
                </Typography>
            </Box>
        );
    }

    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Verificar rol requerido
    if (requiredRole && user.rol !== requiredRole) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{ backgroundColor: '#f5f5f5' }}
            >
                <Typography variant="h4" color="error" gutterBottom>
                    Acceso Denegado
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    No tienes permisos para acceder a esta página.
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Rol requerido: {requiredRole}
                </Typography>
            </Box>
        );
    }

    // Verificar permisos requeridos
    if (requiredPermissions.length > 0) {
        const hasAllPermissions = requiredPermissions.every(permission =>
            user.permisos && user.permisos.includes(permission)
        );

        if (!hasAllPermissions) {
            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="100vh"
                    sx={{ backgroundColor: '#f5f5f5' }}
                >
                    <Typography variant="h4" color="error" gutterBottom>
                        Acceso Denegado
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        No tienes los permisos necesarios para acceder a esta página.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Permisos requeridos: {requiredPermissions.join(', ')}
                    </Typography>
                </Box>
            );
        }
    }

    // Si pasa todas las verificaciones, mostrar el contenido
    return children;
};

export default ProtectedRoute; 