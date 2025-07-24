import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, TextField, Button, Alert, Snackbar,
    Container, Avatar, IconButton
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff, Refresh } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clearStorage } from '../utils/clearStorage';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useAuth();

    // Si ya está autenticado, redirigir al dashboard
    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // Evitar múltiples envíos

        setLoading(true);
        setError('');

        try {
            const result = await login(formData);

            if (result.success) {
                // Redirigir a la página original o al dashboard
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en login:', error);
            setError('Error inesperado al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = (tipo) => {
        if (loading) return; // Evitar cambios durante el loading

        let credentials;
        switch (tipo) {
            case 'admin':
                credentials = { email: 'admin@empresa.com', password: 'admin123' };
                break;
            case 'vendedor':
                credentials = { email: 'juan@empresa.com', password: 'vendedor123' };
                break;
            case 'inventario':
                credentials = { email: 'maria@empresa.com', password: 'inventario123' };
                break;
            default:
                return;
        }
        setFormData(credentials);
    };

    const handleClearStorage = () => {
        clearStorage();
    };

    // Si ya está autenticado, no mostrar el formulario
    if (user) {
        return null;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 400
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlined />
                    </Avatar>

                    <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
                        Sistema de Ventas
                    </Typography>

                    <Typography variant="body2" color="textSecondary" textAlign="center" mb={3}>
                        Inicia sesión para acceder al panel de administración
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleInputChange}
                            error={!!error}
                            disabled={loading}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            error={!!error}
                            disabled={loading}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        disabled={loading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>

                        {/* Botones de demo */}
                        <Typography variant="body2" color="textSecondary" textAlign="center" mb={2}>
                            Acceso de demostración:
                        </Typography>

                        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleDemoLogin('admin')}
                                disabled={loading}
                            >
                                Admin
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleDemoLogin('vendedor')}
                                disabled={loading}
                            >
                                Vendedor
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleDemoLogin('inventario')}
                                disabled={loading}
                            >
                                Inventario
                            </Button>
                        </Box>

                        <Box mt={2} textAlign="center">
                            <Typography variant="body2" color="textSecondary">
                                ¿Olvidaste tu contraseña?{' '}
                                <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                                    Contacta al administrador
                                </Typography>
                            </Typography>
                        </Box>

                        {/* Botón de debug */}
                        <Box mt={2} textAlign="center">
                            <Button
                                size="small"
                                variant="text"
                                onClick={handleClearStorage}
                                startIcon={<Refresh />}
                                sx={{ fontSize: '0.75rem' }}
                            >
                                Limpiar sesión (Debug)
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                {/* Información de credenciales de demo */}
                <Paper elevation={1} sx={{ mt: 2, p: 2, width: '100%', maxWidth: 400 }}>
                    <Typography variant="h6" gutterBottom>
                        Credenciales de Demo:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        <strong>Admin:</strong> admin@empresa.com / admin123<br />
                        <strong>Vendedor:</strong> juan@empresa.com / vendedor123<br />
                        <strong>Inventario:</strong> maria@empresa.com / inventario123
                    </Typography>
                </Paper>
            </Box>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login; 