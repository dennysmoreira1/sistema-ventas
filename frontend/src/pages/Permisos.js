import React, { useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, Chip,
    Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, InputLabel, Select, MenuItem, TextField,
    IconButton, Alert
} from '@mui/material';
import {
    Edit, Delete, Add, Security, CheckCircle, Cancel
} from '@mui/icons-material';

const Permisos = () => {
    const [permisos, setPermisos] = useState([
        {
            id: 1,
            nombre: 'Administrador',
            descripcion: 'Acceso completo al sistema',
            permisos: ['admin', 'usuarios', 'productos', 'ventas', 'reportes', 'configuracion'],
            usuarios: 3,
            activo: true
        },
        {
            id: 2,
            nombre: 'Vendedor',
            descripcion: 'Gestión de ventas y clientes',
            permisos: ['ventas', 'clientes'],
            usuarios: 8,
            activo: true
        },
        {
            id: 3,
            nombre: 'Inventario',
            descripcion: 'Gestión de productos e inventario',
            permisos: ['productos'],
            usuarios: 2,
            activo: true
        },
        {
            id: 4,
            nombre: 'Reportes',
            descripcion: 'Acceso solo a reportes',
            permisos: ['reportes'],
            usuarios: 1,
            activo: false
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingPermiso, setEditingPermiso] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        permisos: [],
        activo: true
    });

    const permisosDisponibles = [
        'admin',
        'usuarios',
        'productos',
        'ventas',
        'clientes',
        'reportes',
        'configuracion'
    ];

    const handleOpenDialog = (permiso = null) => {
        if (permiso) {
            setEditingPermiso(permiso);
            setFormData({
                nombre: permiso.nombre,
                descripcion: permiso.descripcion,
                permisos: permiso.permisos,
                activo: permiso.activo
            });
        } else {
            setEditingPermiso(null);
            setFormData({
                nombre: '',
                descripcion: '',
                permisos: [],
                activo: true
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingPermiso(null);
        setFormData({
            nombre: '',
            descripcion: '',
            permisos: [],
            activo: true
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePermisosChange = (event) => {
        setFormData(prev => ({
            ...prev,
            permisos: event.target.value
        }));
    };

    const handleSubmit = () => {
        if (editingPermiso) {
            // Editar permiso existente
            setPermisos(prev => prev.map(p =>
                p.id === editingPermiso.id
                    ? { ...p, ...formData }
                    : p
            ));
        } else {
            // Crear nuevo permiso
            const nuevoPermiso = {
                id: Date.now(),
                ...formData,
                usuarios: 0
            };
            setPermisos(prev => [...prev, nuevoPermiso]);
        }
        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setPermisos(prev => prev.filter(p => p.id !== id));
    };

    const getEstadoColor = (activo) => {
        return activo ? 'success' : 'error';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Gestión de Permisos
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Administra los roles y permisos del sistema
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Nuevo Rol
                </Button>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                    Los permisos determinan qué funcionalidades puede acceder cada usuario en el sistema.
                </Typography>
            </Alert>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rol</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Permisos</TableCell>
                            <TableCell>Usuarios</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permisos.map((permiso) => (
                            <TableRow key={permiso.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Security sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {permiso.nombre}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="textSecondary">
                                        {permiso.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                                        {permiso.permisos.map((perm) => (
                                            <Chip
                                                key={perm}
                                                label={perm}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {permiso.usuarios} usuarios
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={permiso.activo ? 'Activo' : 'Inactivo'}
                                        color={getEstadoColor(permiso.activo)}
                                        size="small"
                                        icon={permiso.activo ? <CheckCircle /> : <Cancel />}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleOpenDialog(permiso)}
                                            color="primary"
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(permiso.id)}
                                            color="error"
                                            disabled={permiso.usuarios > 0}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingPermiso ? 'Editar Rol' : 'Nuevo Rol'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            fullWidth
                            label="Nombre del Rol"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            multiline
                            rows={3}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Permisos</InputLabel>
                            <Select
                                multiple
                                value={formData.permisos}
                                onChange={handlePermisosChange}
                                label="Permisos"
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {permisosDisponibles.map((permiso) => (
                                    <MenuItem key={permiso} value={permiso}>
                                        {permiso}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingPermiso ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Permisos; 