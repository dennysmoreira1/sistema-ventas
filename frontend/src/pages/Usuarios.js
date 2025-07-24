import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete, Person, Email } from '@mui/icons-material';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        rol: 'usuario',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setUsuarios([
            {
                id: 1,
                nombre: 'Juan Pérez',
                email: 'juan.perez@email.com',
                rol: 'administrador',
                estado: 'activo',
                fechaRegistro: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'María García',
                email: 'maria.garcia@email.com',
                rol: 'usuario',
                estado: 'activo',
                fechaRegistro: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Carlos López',
                email: 'carlos.lopez@email.com',
                rol: 'usuario',
                estado: 'inactivo',
                fechaRegistro: '2024-01-03'
            }
        ]);
    }, []);

    const handleOpenDialog = (usuario = null) => {
        if (usuario) {
            setEditingUsuario(usuario);
            setFormData({
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                password: '',
                confirmPassword: ''
            });
        } else {
            setEditingUsuario(null);
            setFormData({
                nombre: '',
                email: '',
                rol: 'usuario',
                password: '',
                confirmPassword: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUsuario(null);
        setFormData({
            nombre: '',
            email: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email) {
            setError('Los campos nombre y email son obligatorios');
            return;
        }
        if (!editingUsuario && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Las contraseñas no coinciden o están vacías');
            return;
        }

        if (editingUsuario) {
            // Actualizar usuario
            setUsuarios(usuarios.map(u =>
                u.id === editingUsuario.id
                    ? {
                        ...u,
                        nombre: formData.nombre,
                        email: formData.email,
                        rol: formData.rol
                    }
                    : u
            ));
            setMensaje('Usuario actualizado exitosamente');
        } else {
            // Crear nuevo usuario
            const nuevoUsuario = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                estado: 'activo',
                fechaRegistro: new Date().toISOString().split('T')[0]
            };
            setUsuarios([...usuarios, nuevoUsuario]);
            setMensaje('Usuario creado exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
        setMensaje('Usuario eliminado exitosamente');
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'administrador':
                return 'error';
            case 'usuario':
                return 'primary';
            default:
                return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Usuario
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha Registro</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Person sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {usuario.nombre}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Email sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">{usuario.email}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.rol}
                                        color={getRolColor(usuario.rol)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.estado}
                                        color={getEstadoColor(usuario.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{usuario.fechaRegistro}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(usuario)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(usuario.id)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar usuario */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUsuario ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            name="rol"
                            value={formData.rol}
                            label="Rol"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="usuario">Usuario</MenuItem>
                            <MenuItem value="administrador">Administrador</MenuItem>
                        </Select>
                    </FormControl>
                    {!editingUsuario && (
                        <>
                            <TextField
                                margin="dense"
                                name="password"
                                label="Contraseña"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="dense"
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingUsuario ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
            <Snackbar
                open={!!mensaje}
                autoHideDuration={6000}
                onClose={() => setMensaje('')}
            >
                <Alert onClose={() => setMensaje('')} severity="success">
                    {mensaje}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError('')}
            >
                <Alert onClose={() => setError('')} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Usuarios; 