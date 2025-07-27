import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar, Card, CardContent,
    Avatar, useTheme, useMediaQuery
} from '@mui/material';
import { Add, Edit, Delete, Email, Phone, LocationOn } from '@mui/icons-material';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCliente, setEditingCliente] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        tipoCliente: 'regular',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Datos de ejemplo
    useEffect(() => {
        setClientes([
            {
                id: 1,
                nombre: 'Juan Pérez',
                documento: '12345678',
                email: 'juan.perez@email.com',
                telefono: '+1234567890',
                direccion: 'Calle Principal 123, Ciudad',
                tipoCliente: 'premium',
                estado: 'activo',
                fechaRegistro: '2024-01-01',
                comprasRealizadas: 15
            },
            {
                id: 2,
                nombre: 'María García',
                documento: '87654321',
                email: 'maria.garcia@email.com',
                telefono: '+0987654321',
                direccion: 'Avenida Central 456, Ciudad',
                tipoCliente: 'regular',
                estado: 'activo',
                fechaRegistro: '2024-01-02',
                comprasRealizadas: 8
            },
            {
                id: 3,
                nombre: 'Carlos López',
                documento: '11223344',
                email: 'carlos.lopez@email.com',
                telefono: '+1122334455',
                direccion: 'Plaza Mayor 789, Ciudad',
                tipoCliente: 'premium',
                estado: 'inactivo',
                fechaRegistro: '2024-01-03',
                comprasRealizadas: 25
            }
        ]);
    }, []);

    const handleOpenDialog = (cliente = null) => {
        if (cliente) {
            setEditingCliente(cliente);
            setFormData({
                nombre: cliente.nombre,
                documento: cliente.documento,
                email: cliente.email,
                telefono: cliente.telefono,
                direccion: cliente.direccion,
                tipoCliente: cliente.tipoCliente,
                estado: cliente.estado
            });
        } else {
            setEditingCliente(null);
            setFormData({
                nombre: '',
                documento: '',
                email: '',
                telefono: '',
                direccion: '',
                tipoCliente: 'regular',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCliente(null);
        setFormData({
            nombre: '',
            documento: '',
            email: '',
            telefono: '',
            direccion: '',
            tipoCliente: 'regular',
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
        if (!formData.nombre || !formData.documento || !formData.email) {
            setError('Los campos nombre, documento y email son obligatorios');
            return;
        }

        if (editingCliente) {
            // Actualizar cliente
            setClientes(clientes.map(c =>
                c.id === editingCliente.id
                    ? {
                        ...c,
                        nombre: formData.nombre,
                        documento: formData.documento,
                        email: formData.email,
                        telefono: formData.telefono,
                        direccion: formData.direccion,
                        tipoCliente: formData.tipoCliente,
                        estado: formData.estado
                    }
                    : c
            ));
            setMensaje('Cliente actualizado exitosamente');
        } else {
            // Crear nuevo cliente
            const nuevoCliente = {
                id: Date.now(),
                nombre: formData.nombre,
                documento: formData.documento,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                tipoCliente: formData.tipoCliente,
                estado: formData.estado,
                fechaRegistro: new Date().toISOString().split('T')[0],
                comprasRealizadas: 0
            };
            setClientes([...clientes, nuevoCliente]);
            setMensaje('Cliente creado exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setClientes(clientes.filter(c => c.id !== id));
        setMensaje('Cliente eliminado exitosamente');
    };

    const getTipoClienteColor = (tipo) => {
        return tipo === 'premium' ? 'warning' : 'default';
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const renderCardView = () => (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(300px, 1fr))' } }}>
            {clientes.map((cliente) => (
                <Card key={cliente.id} sx={{ height: 'fit-content' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                {getInitials(cliente.nombre)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {cliente.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {cliente.documento}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            {cliente.email && (
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2">{cliente.email}</Typography>
                                </Box>
                            )}
                            {cliente.telefono && (
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Phone sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2">{cliente.telefono}</Typography>
                                </Box>
                            )}
                            {cliente.direccion && (
                                <Box display="flex" alignItems="center">
                                    <LocationOn sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>{cliente.direccion}</Typography>
                                </Box>
                            )}
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="textSecondary">
                                Registro: {cliente.fechaRegistro}
                            </Typography>
                            <Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(cliente)}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(cliente.id)}
                                    color="error"
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    const renderTableView = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                        {getInitials(cliente.nombre)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {cliente.nombre}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {cliente.direccion}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{cliente.documento}</TableCell>
                            <TableCell>{cliente.email}</TableCell>
                            <TableCell>{cliente.telefono}</TableCell>
                            <TableCell>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(cliente)}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(cliente.id)}
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
    );

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, height: '100vh', overflow: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Clientes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Cliente
                </Button>
            </Box>

            {isMobile ? renderCardView() : renderTableView()}

            {/* Dialog para agregar/editar cliente */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingCliente ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Documento"
                            name="documento"
                            value={formData.documento}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Teléfono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            margin="normal"
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                            <InputLabel>Tipo de Cliente</InputLabel>
                            <Select
                                name="tipoCliente"
                                value={formData.tipoCliente}
                                onChange={handleInputChange}
                                label="Tipo de Cliente"
                            >
                                <MenuItem value="regular">Regular</MenuItem>
                                <MenuItem value="premium">Premium</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCliente ? 'Actualizar' : 'Crear'}
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

export default Clientes; 