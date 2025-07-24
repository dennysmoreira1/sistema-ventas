import React, { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Card, CardContent, Button,
    TextField, Avatar, Chip, Alert, Snackbar
} from '@mui/material';
import {
    Edit, Save, Cancel, Email, Phone, LocationOn,
    Business, Work, School
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        direccion: user?.direccion || '',
        empresa: user?.empresa || '',
        cargo: user?.cargo || '',
        educacion: user?.educacion || ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = () => {
        setMensaje('Perfil actualizado correctamente');
        setEditing(false);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrador':
                return 'error';
            case 'Vendedor':
                return 'primary';
            case 'Inventario':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getInitials = (nombre) => {
        return nombre?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    };

    if (!user) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" color="error">
                    No hay información de usuario disponible
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Mi Perfil
            </Typography>

            <Grid container spacing={3}>
                {/* Información del perfil */}
                <Grid xs={12} md={8}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h6" fontWeight="bold">
                                Información Personal
                            </Typography>
                            <Button
                                variant={editing ? "outlined" : "contained"}
                                startIcon={editing ? <Cancel /> : <Edit />}
                                onClick={() => setEditing(!editing)}
                            >
                                {editing ? 'Cancelar' : 'Editar'}
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Empresa"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Cargo"
                                    name="cargo"
                                    value={formData.cargo}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Educación"
                                    name="educacion"
                                    value={formData.educacion}
                                    onChange={handleInputChange}
                                    disabled={!editing}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        {editing && (
                            <Box display="flex" justifyContent="flex-end" mt={3}>
                                <Button
                                    variant="contained"
                                    startIcon={<Save />}
                                    onClick={handleSaveProfile}
                                >
                                    Guardar Cambios
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Tarjeta de información del usuario */}
                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: 'primary.main',
                                        mb: 2
                                    }}
                                >
                                    {getInitials(user.nombre)}
                                </Avatar>
                                <Typography variant="h6" fontWeight="bold" textAlign="center">
                                    {user.nombre}
                                </Typography>
                                <Chip
                                    label={user.rol}
                                    color={getRoleColor(user.rol)}
                                    sx={{ mt: 1 }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <Email sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <Phone sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.telefono}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <LocationOn sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.direccion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <Business sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.empresa}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <Work sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.cargo}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <School sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.educacion}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Permisos del sistema */}
                <Grid xs={12}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Permisos del Sistema
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {user.permisos?.map(permiso => (
                                <Chip
                                    key={permiso}
                                    label={permiso}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbars para mensajes */}
            <Snackbar
                open={!!mensaje}
                autoHideDuration={3000}
                onClose={() => setMensaje('')}
            >
                <Alert severity="success" onClose={() => setMensaje('')}>
                    {mensaje}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Perfil; 