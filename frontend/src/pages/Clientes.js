import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Avatar,
    Card, CardContent, Grid, useTheme, useMediaQuery
} from '@mui/material';
import { Add, Edit, Delete, Phone, Email, LocationOn, Person } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

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
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    // Datos de ejemplo
    useEffect(() => {
        setClientes([
            {
                id: 1,
                nombre: 'Juan Pérez',
                documento: '12345678',
                email: 'juan@email.com',
                telefono: '300-123-4567',
                direccion: 'Calle 123 #45-67, Bogotá',
                tipoCliente: 'premium',
                estado: 'activo',
                totalCompras: 125000,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'María García',
                documento: '87654321',
                email: 'maria@email.com',
                telefono: '300-987-6543',
                direccion: 'Carrera 78 #12-34, Medellín',
                tipoCliente: 'regular',
                estado: 'activo',
                totalCompras: 45000,
                ultimaCompra: '2024-01-10'
            },
            {
                id: 3,
                nombre: 'Carlos López',
                documento: '11223344',
                email: 'carlos@email.com',
                telefono: '300-555-1234',
                direccion: 'Avenida 5 #23-45, Cali',
                tipoCliente: 'vip',
                estado: 'inactivo',
                totalCompras: 89000,
                ultimaCompra: '2023-12-20'
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
                    ? { ...c, ...formData }
                    : c
            ));
            setMensaje('Cliente actualizado correctamente');
        } else {
            // Agregar nuevo cliente
            const newCliente = {
                id: Date.now(),
                ...formData,
                totalCompras: 0,
                ultimaCompra: null
            };
            setClientes([...clientes, newCliente]);
            setMensaje('Cliente agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setClientes(clientes.filter(c => c.id !== id));
        setMensaje('Cliente eliminado correctamente');
    };

    const getTipoClienteColor = (tipo) => {
        switch (tipo) {
            case 'premium': return 'primary';
            case 'vip': return 'secondary';
            case 'regular': return 'default';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Vista de tarjetas para móviles y tablets
    const renderCardView = () => (
        <Grid container spacing={2}>
            {clientes.map((cliente) => (
                <Grid xs={12} sm={6} md={4} key={cliente.id}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                    {getInitials(cliente.nombre)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {cliente.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {cliente.documento}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box mb={2}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.email}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {cliente.telefono}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.direccion}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Compras: ${cliente.totalCompras.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Última Compra: {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="flex-end">
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
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // Vista de tabla para pantallas grandes
    const renderTableView = () => (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Contacto</TableCell>
                        {!isTablet && <TableCell>Dirección</TableCell>}
                        <TableCell>Tipo</TableCell>
                        {!isTablet && <TableCell>Total Compras</TableCell>}
                        {!isTablet && <TableCell>Última Compra</TableCell>}
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                        {getInitials(cliente.nombre)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {cliente.nombre}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{cliente.documento}</TableCell>
                            <TableCell>
                                <Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.email}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {cliente.telefono}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            {!isTablet && (
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            )}
                            <TableCell>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                            </TableCell>
                            {!isTablet && (
                                <TableCell>${cliente.totalCompras.toLocaleString()}</TableCell>
                            )}
                            {!isTablet && (
                                <TableCell>
                                    {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                            )}
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
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
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
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12}>
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
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Tipo de Cliente</InputLabel>
                                    <Select
                                        name="tipoCliente"
                                        value={formData.tipoCliente}
                                        onChange={handleInputChange}
                                        label="Tipo de Cliente"
                                    >
                                        <MenuItem value="regular">Regular</MenuItem>
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="vip">VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCliente ? 'Actualizar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
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

export default Clientes; 
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
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    // Datos de ejemplo
    useEffect(() => {
        setClientes([
            {
                id: 1,
                nombre: 'Juan Pérez',
                documento: '12345678',
                email: 'juan@email.com',
                telefono: '300-123-4567',
                direccion: 'Calle 123 #45-67, Bogotá',
                tipoCliente: 'premium',
                estado: 'activo',
                totalCompras: 125000,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'María García',
                documento: '87654321',
                email: 'maria@email.com',
                telefono: '300-987-6543',
                direccion: 'Carrera 78 #12-34, Medellín',
                tipoCliente: 'regular',
                estado: 'activo',
                totalCompras: 45000,
                ultimaCompra: '2024-01-10'
            },
            {
                id: 3,
                nombre: 'Carlos López',
                documento: '11223344',
                email: 'carlos@email.com',
                telefono: '300-555-1234',
                direccion: 'Avenida 5 #23-45, Cali',
                tipoCliente: 'vip',
                estado: 'inactivo',
                totalCompras: 89000,
                ultimaCompra: '2023-12-20'
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
                    ? { ...c, ...formData }
                    : c
            ));
            setMensaje('Cliente actualizado correctamente');
        } else {
            // Agregar nuevo cliente
            const newCliente = {
                id: Date.now(),
                ...formData,
                totalCompras: 0,
                ultimaCompra: null
            };
            setClientes([...clientes, newCliente]);
            setMensaje('Cliente agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setClientes(clientes.filter(c => c.id !== id));
        setMensaje('Cliente eliminado correctamente');
    };

    const getTipoClienteColor = (tipo) => {
        switch (tipo) {
            case 'premium': return 'primary';
            case 'vip': return 'secondary';
            case 'regular': return 'default';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Vista de tarjetas para móviles y tablets
    const renderCardView = () => (
        <Grid container spacing={2}>
            {clientes.map((cliente) => (
                <Grid xs={12} sm={6} md={4} key={cliente.id}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                    {getInitials(cliente.nombre)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {cliente.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {cliente.documento}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box mb={2}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.email}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {cliente.telefono}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.direccion}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Compras: ${cliente.totalCompras.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Última Compra: {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="flex-end">
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
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // Vista de tabla para pantallas grandes
    const renderTableView = () => (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Contacto</TableCell>
                        {!isTablet && <TableCell>Dirección</TableCell>}
                        <TableCell>Tipo</TableCell>
                        {!isTablet && <TableCell>Total Compras</TableCell>}
                        {!isTablet && <TableCell>Última Compra</TableCell>}
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                        {getInitials(cliente.nombre)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {cliente.nombre}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{cliente.documento}</TableCell>
                            <TableCell>
                                <Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.email}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {cliente.telefono}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            {!isTablet && (
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            )}
                            <TableCell>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                            </TableCell>
                            {!isTablet && (
                                <TableCell>${cliente.totalCompras.toLocaleString()}</TableCell>
                            )}
                            {!isTablet && (
                                <TableCell>
                                    {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                            )}
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
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
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
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12}>
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
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Tipo de Cliente</InputLabel>
                                    <Select
                                        name="tipoCliente"
                                        value={formData.tipoCliente}
                                        onChange={handleInputChange}
                                        label="Tipo de Cliente"
                                    >
                                        <MenuItem value="regular">Regular</MenuItem>
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="vip">VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCliente ? 'Actualizar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
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

export default Clientes; 
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
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    // Datos de ejemplo
    useEffect(() => {
        setClientes([
            {
                id: 1,
                nombre: 'Juan Pérez',
                documento: '12345678',
                email: 'juan@email.com',
                telefono: '300-123-4567',
                direccion: 'Calle 123 #45-67, Bogotá',
                tipoCliente: 'premium',
                estado: 'activo',
                totalCompras: 125000,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'María García',
                documento: '87654321',
                email: 'maria@email.com',
                telefono: '300-987-6543',
                direccion: 'Carrera 78 #12-34, Medellín',
                tipoCliente: 'regular',
                estado: 'activo',
                totalCompras: 45000,
                ultimaCompra: '2024-01-10'
            },
            {
                id: 3,
                nombre: 'Carlos López',
                documento: '11223344',
                email: 'carlos@email.com',
                telefono: '300-555-1234',
                direccion: 'Avenida 5 #23-45, Cali',
                tipoCliente: 'vip',
                estado: 'inactivo',
                totalCompras: 89000,
                ultimaCompra: '2023-12-20'
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
                    ? { ...c, ...formData }
                    : c
            ));
            setMensaje('Cliente actualizado correctamente');
        } else {
            // Agregar nuevo cliente
            const newCliente = {
                id: Date.now(),
                ...formData,
                totalCompras: 0,
                ultimaCompra: null
            };
            setClientes([...clientes, newCliente]);
            setMensaje('Cliente agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setClientes(clientes.filter(c => c.id !== id));
        setMensaje('Cliente eliminado correctamente');
    };

    const getTipoClienteColor = (tipo) => {
        switch (tipo) {
            case 'premium': return 'primary';
            case 'vip': return 'secondary';
            case 'regular': return 'default';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Vista de tarjetas para móviles y tablets
    const renderCardView = () => (
        <Grid container spacing={2}>
            {clientes.map((cliente) => (
                <Grid xs={12} sm={6} md={4} key={cliente.id}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                    {getInitials(cliente.nombre)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {cliente.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {cliente.documento}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box mb={2}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.email}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {cliente.telefono}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.direccion}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Compras: ${cliente.totalCompras.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Última Compra: {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="flex-end">
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
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // Vista de tabla para pantallas grandes
    const renderTableView = () => (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Contacto</TableCell>
                        {!isTablet && <TableCell>Dirección</TableCell>}
                        <TableCell>Tipo</TableCell>
                        {!isTablet && <TableCell>Total Compras</TableCell>}
                        {!isTablet && <TableCell>Última Compra</TableCell>}
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                        {getInitials(cliente.nombre)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {cliente.nombre}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{cliente.documento}</TableCell>
                            <TableCell>
                                <Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.email}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {cliente.telefono}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            {!isTablet && (
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            )}
                            <TableCell>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                            </TableCell>
                            {!isTablet && (
                                <TableCell>${cliente.totalCompras.toLocaleString()}</TableCell>
                            )}
                            {!isTablet && (
                                <TableCell>
                                    {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                            )}
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
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
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
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12}>
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
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Tipo de Cliente</InputLabel>
                                    <Select
                                        name="tipoCliente"
                                        value={formData.tipoCliente}
                                        onChange={handleInputChange}
                                        label="Tipo de Cliente"
                                    >
                                        <MenuItem value="regular">Regular</MenuItem>
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="vip">VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCliente ? 'Actualizar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
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

export default Clientes; 
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
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    // Datos de ejemplo
    useEffect(() => {
        setClientes([
            {
                id: 1,
                nombre: 'Juan Pérez',
                documento: '12345678',
                email: 'juan@email.com',
                telefono: '300-123-4567',
                direccion: 'Calle 123 #45-67, Bogotá',
                tipoCliente: 'premium',
                estado: 'activo',
                totalCompras: 125000,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'María García',
                documento: '87654321',
                email: 'maria@email.com',
                telefono: '300-987-6543',
                direccion: 'Carrera 78 #12-34, Medellín',
                tipoCliente: 'regular',
                estado: 'activo',
                totalCompras: 45000,
                ultimaCompra: '2024-01-10'
            },
            {
                id: 3,
                nombre: 'Carlos López',
                documento: '11223344',
                email: 'carlos@email.com',
                telefono: '300-555-1234',
                direccion: 'Avenida 5 #23-45, Cali',
                tipoCliente: 'vip',
                estado: 'inactivo',
                totalCompras: 89000,
                ultimaCompra: '2023-12-20'
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
                    ? { ...c, ...formData }
                    : c
            ));
            setMensaje('Cliente actualizado correctamente');
        } else {
            // Agregar nuevo cliente
            const newCliente = {
                id: Date.now(),
                ...formData,
                totalCompras: 0,
                ultimaCompra: null
            };
            setClientes([...clientes, newCliente]);
            setMensaje('Cliente agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setClientes(clientes.filter(c => c.id !== id));
        setMensaje('Cliente eliminado correctamente');
    };

    const getTipoClienteColor = (tipo) => {
        switch (tipo) {
            case 'premium': return 'primary';
            case 'vip': return 'secondary';
            case 'regular': return 'default';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Vista de tarjetas para móviles y tablets
    const renderCardView = () => (
        <Grid container spacing={2}>
            {clientes.map((cliente) => (
                <Grid xs={12} sm={6} md={4} key={cliente.id}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                    {getInitials(cliente.nombre)}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {cliente.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {cliente.documento}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box mb={2}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.email}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {cliente.telefono}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2" noWrap>
                                        {cliente.direccion}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                                <Chip
                                    label={cliente.estado}
                                    color={getEstadoColor(cliente.estado)}
                                    size="small"
                                />
                            </Box>

                            <Box mb={2}>
                                <Typography variant="body2" color="textSecondary">
                                    Total Compras: ${cliente.totalCompras.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Última Compra: {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </Typography>
                            </Box>

                            <Box display="flex" justifyContent="flex-end">
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
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // Vista de tabla para pantallas grandes
    const renderTableView = () => (
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Contacto</TableCell>
                        {!isTablet && <TableCell>Dirección</TableCell>}
                        <TableCell>Tipo</TableCell>
                        {!isTablet && <TableCell>Total Compras</TableCell>}
                        {!isTablet && <TableCell>Última Compra</TableCell>}
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                        {getInitials(cliente.nombre)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {cliente.nombre}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{cliente.documento}</TableCell>
                            <TableCell>
                                <Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.email}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {cliente.telefono}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            {!isTablet && (
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {cliente.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            )}
                            <TableCell>
                                <Chip
                                    label={cliente.tipoCliente}
                                    color={getTipoClienteColor(cliente.tipoCliente)}
                                    size="small"
                                />
                            </TableCell>
                            {!isTablet && (
                                <TableCell>${cliente.totalCompras.toLocaleString()}</TableCell>
                            )}
                            {!isTablet && (
                                <TableCell>
                                    {cliente.ultimaCompra ? new Date(cliente.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                            )}
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
                        <Grid container spacing={2}>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nombre completo"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Documento"
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    required
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
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Teléfono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid xs={12}>
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
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Tipo de Cliente</InputLabel>
                                    <Select
                                        name="tipoCliente"
                                        value={formData.tipoCliente}
                                        onChange={handleInputChange}
                                        label="Tipo de Cliente"
                                    >
                                        <MenuItem value="regular">Regular</MenuItem>
                                        <MenuItem value="premium">Premium</MenuItem>
                                        <MenuItem value="vip">VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCliente ? 'Actualizar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
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

export default Clientes; 