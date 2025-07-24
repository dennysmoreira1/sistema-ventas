import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete, Business, Email, Phone, LocationOn } from '@mui/icons-material';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingProveedor, setEditingProveedor] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        nit: '',
        email: '',
        telefono: '',
        direccion: '',
        tipoServicio: 'productos',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setProveedores([
            {
                id: 1,
                nombre: 'Distribuidora ABC',
                nit: '900123456-7',
                email: 'contacto@distribuidoraabc.com',
                telefono: '+57 300 123 4567',
                direccion: 'Calle 123 #45-67, Bogotá',
                tipoServicio: 'productos',
                estado: 'activo',
                productosSuministrados: 150,
                fechaRegistro: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Suministros XYZ',
                nit: '800987654-3',
                email: 'info@suministrosxyz.com',
                telefono: '+57 300 987 6543',
                direccion: 'Carrera 78 #12-34, Medellín',
                tipoServicio: 'servicios',
                estado: 'activo',
                productosSuministrados: 75,
                fechaRegistro: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Tecnología Avanzada',
                nit: '700555123-4',
                email: 'ventas@tecnologiaavanzada.com',
                telefono: '+57 300 555 1234',
                direccion: 'Avenida 5 #23-45, Cali',
                tipoServicio: 'productos',
                estado: 'inactivo',
                productosSuministrados: 0,
                fechaRegistro: '2024-01-03'
            }
        ]);
    }, []);

    const handleOpenDialog = (proveedor = null) => {
        if (proveedor) {
            setEditingProveedor(proveedor);
            setFormData({
                nombre: proveedor.nombre,
                nit: proveedor.nit,
                email: proveedor.email,
                telefono: proveedor.telefono,
                direccion: proveedor.direccion,
                tipoServicio: proveedor.tipoServicio,
                estado: proveedor.estado
            });
        } else {
            setEditingProveedor(null);
            setFormData({
                nombre: '',
                nit: '',
                email: '',
                telefono: '',
                direccion: '',
                tipoServicio: 'productos',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingProveedor(null);
        setFormData({
            nombre: '',
            nit: '',
            email: '',
            telefono: '',
            direccion: '',
            tipoServicio: 'productos',
            estado: 'activo'
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.nit || !formData.email) {
            setError('Los campos nombre, NIT y email son obligatorios');
            return;
        }

        if (editingProveedor) {
            // Actualizar proveedor
            setProveedores(proveedores.map(p =>
                p.id === editingProveedor.id
                    ? {
                        ...p,
                        nombre: formData.nombre,
                        nit: formData.nit,
                        email: formData.email,
                        telefono: formData.telefono,
                        direccion: formData.direccion,
                        tipoServicio: formData.tipoServicio,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Proveedor actualizado exitosamente');
        } else {
            // Crear nuevo proveedor
            const nuevoProveedor = {
                id: Date.now(),
                nombre: formData.nombre,
                nit: formData.nit,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                tipoServicio: formData.tipoServicio,
                estado: formData.estado,
                productosSuministrados: 0,
                fechaRegistro: new Date().toISOString().split('T')[0]
            };
            setProveedores([...proveedores, nuevoProveedor]);
            setMensaje('Proveedor creado exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProveedores(proveedores.filter(p => p.id !== id));
        setMensaje('Proveedor eliminado exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    const getTipoServicioColor = (tipo) => {
        return tipo === 'productos' ? 'primary' : 'secondary';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Proveedores
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Proveedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>NIT</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Tipo de Servicio</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Productos Suministrados</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Business sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {proveedor.nombre}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{proveedor.nit}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                                            <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                                {proveedor.email}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                                            <Typography variant="body2">
                                                {proveedor.telefono}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {proveedor.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.tipoServicio}
                                        color={getTipoServicioColor(proveedor.tipoServicio)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.estado}
                                        color={getEstadoColor(proveedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{proveedor.productosSuministrados}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(proveedor)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(proveedor.id)}
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

            {/* Dialog para agregar/editar proveedor */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
                            <TextField
                                fullWidth
                                label="Nombre de la empresa"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="NIT"
                                name="nit"
                                value={formData.nit}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                margin="normal"
                                multiline
                                rows={2}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Tipo de Servicio</InputLabel>
                                <Select
                                    name="tipoServicio"
                                    value={formData.tipoServicio}
                                    onChange={handleInputChange}
                                    label="Tipo de Servicio"
                                >
                                    <MenuItem value="productos">Productos</MenuItem>
                                    <MenuItem value="servicios">Servicios</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleInputChange}
                                    label="Estado"
                                >
                                    <MenuItem value="activo">Activo</MenuItem>
                                    <MenuItem value="inactivo">Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProveedor ? 'Actualizar' : 'Crear'}
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

export default Proveedores; 