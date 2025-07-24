import React, { useState } from 'react';
import {
    Box, Typography, Paper, TextField, Button, Avatar, Grid, Card, CardContent,
    Divider, Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
    Person, Email, Security, AccessTime, Edit, Save, Cancel,
    Visibility, VisibilityOff, Lock, Settings
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
    const { user, logout } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        telefono: '',
        departamento: '',
        cargo: user?.rol || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = () => {
        // Aquí iría la lógica para guardar los cambios del perfil
        setMensaje('Perfil actualizado correctamente');
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setFormData({
            nombre: user?.nombre || '',
            email: user?.email || '',
            telefono: '',
            departamento: '',
            cargo: user?.rol || ''
        });
        setEditMode(false);
    };

    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Aquí iría la lógica para cambiar la contraseña
        setMensaje('Contraseña actualizada correctamente');
        setChangePasswordMode(false);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
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
                                variant={editMode ? "outlined" : "contained"}
                                startIcon={editMode ? <Cancel /> : <Edit />}
                                onClick={() => setEditMode(!editMode)}
                            >
                                {editMode ? 'Cancelar' : 'Editar'}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
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
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Departamento"
                                    name="departamento"
                                    value={formData.departamento}
                                    onChange={handleInputChange}
                                    disabled={!editMode}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Cargo</InputLabel>
                                    <Select
                                        name="cargo"
                                        value={formData.cargo}
                                        onChange={handleInputChange}
                                        label="Cargo"
                                        disabled={!editMode}
                                    >
                                        <MenuItem value="Administrador">Administrador</MenuItem>
                                        <MenuItem value="Vendedor">Vendedor</MenuItem>
                                        <MenuItem value="Inventario">Inventario</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {editMode && (
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

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <Email sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    {user.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mb={1}>
                                    <AccessTime sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    Último acceso: {user.ultimoAcceso ? new Date(user.ultimoAcceso).toLocaleString() : 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <Security sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                                    ID: {user.id}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<Lock />}
                                onClick={() => setChangePasswordMode(true)}
                            >
                                Cambiar Contraseña
                            </Button>
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

            {/* Dialog para cambiar contraseña */}
            <Dialog open={changePasswordMode} onClose={() => setChangePasswordMode(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Cambiar Contraseña
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Contraseña actual"
                            name="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Nueva contraseña"
                            name="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirmar nueva contraseña"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChangePasswordMode(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleChangePassword} variant="contained">
                        Cambiar Contraseña
                    </Button>
                </DialogActions>
            </Dialog>

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

            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Perfil; 