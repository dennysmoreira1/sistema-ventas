import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Avatar
} from '@mui/material';
import { Add, Edit, Delete, Phone, Email, LocationOn, Business } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

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
        contacto: '',
        categoria: 'general',
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
                email: 'contacto@abc.com',
                telefono: '601-123-4567',
                direccion: 'Calle 45 #12-34, Bogotá',
                contacto: 'Carlos Mendoza',
                categoria: 'tecnologia',
                estado: 'activo',
                productosSuministrados: 45,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'Suministros XYZ',
                nit: '800987654-3',
                email: 'ventas@xyz.com',
                telefono: '601-987-6543',
                direccion: 'Carrera 78 #23-45, Medellín',
                contacto: 'Ana Rodríguez',
                categoria: 'oficina',
                estado: 'activo',
                productosSuministrados: 23,
                ultimaCompra: '2024-01-12'
            },
            {
                id: 3,
                nombre: 'Comercial Delta',
                nit: '700555123-4',
                email: 'info@delta.com',
                telefono: '601-555-1234',
                direccion: 'Avenida 5 #67-89, Cali',
                contacto: 'Luis González',
                categoria: 'ropa',
                estado: 'inactivo',
                productosSuministrados: 12,
                ultimaCompra: '2023-12-20'
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
                contacto: proveedor.contacto,
                categoria: proveedor.categoria,
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
                contacto: '',
                categoria: 'general',
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
            contacto: '',
            categoria: 'general',
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
                        contacto: formData.contacto,
                        categoria: formData.categoria,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Proveedor actualizado correctamente');
        } else {
            // Agregar nuevo proveedor
            const newProveedor = {
                id: Date.now(),
                nombre: formData.nombre,
                nit: formData.nit,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                contacto: formData.contacto,
                categoria: formData.categoria,
                estado: formData.estado,
                productosSuministrados: 0,
                ultimaCompra: null
            };
            setProveedores([...proveedores, newProveedor]);
            setMensaje('Proveedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProveedores(proveedores.filter(p => p.id !== id));
        setMensaje('Proveedor eliminado correctamente');
    };

    const getCategoriaColor = (categoria) => {
        switch (categoria) {
            case 'tecnologia': return 'primary';
            case 'oficina': return 'secondary';
            case 'ropa': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
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
                            <TableCell>Categoría</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Última Compra</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(proveedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {proveedor.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {proveedor.contacto}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{proveedor.nit}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {proveedor.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.categoria}
                                        color={getCategoriaColor(proveedor.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{proveedor.productosSuministrados}</TableCell>
                                <TableCell>
                                    {proveedor.ultimaCompra ? new Date(proveedor.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.estado}
                                        color={getEstadoColor(proveedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la empresa"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="NIT"
                            name="nit"
                            value={formData.nit}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
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
                            label="Persona de contacto"
                            name="contacto"
                            value={formData.contacto}
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                label="Categoría"
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="tecnologia">Tecnología</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="ropa">Ropa</MenuItem>
                                <MenuItem value="alimentos">Alimentos</MenuItem>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProveedor ? 'Actualizar' : 'Agregar'}
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

export default Proveedores; 
        nombre: '',
        nit: '',
        email: '',
        telefono: '',
        direccion: '',
        contacto: '',
        categoria: 'general',
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
                email: 'contacto@abc.com',
                telefono: '601-123-4567',
                direccion: 'Calle 45 #12-34, Bogotá',
                contacto: 'Carlos Mendoza',
                categoria: 'tecnologia',
                estado: 'activo',
                productosSuministrados: 45,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'Suministros XYZ',
                nit: '800987654-3',
                email: 'ventas@xyz.com',
                telefono: '601-987-6543',
                direccion: 'Carrera 78 #23-45, Medellín',
                contacto: 'Ana Rodríguez',
                categoria: 'oficina',
                estado: 'activo',
                productosSuministrados: 23,
                ultimaCompra: '2024-01-12'
            },
            {
                id: 3,
                nombre: 'Comercial Delta',
                nit: '700555123-4',
                email: 'info@delta.com',
                telefono: '601-555-1234',
                direccion: 'Avenida 5 #67-89, Cali',
                contacto: 'Luis González',
                categoria: 'ropa',
                estado: 'inactivo',
                productosSuministrados: 12,
                ultimaCompra: '2023-12-20'
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
                contacto: proveedor.contacto,
                categoria: proveedor.categoria,
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
                contacto: '',
                categoria: 'general',
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
            contacto: '',
            categoria: 'general',
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
                        contacto: formData.contacto,
                        categoria: formData.categoria,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Proveedor actualizado correctamente');
        } else {
            // Agregar nuevo proveedor
            const newProveedor = {
                id: Date.now(),
                nombre: formData.nombre,
                nit: formData.nit,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                contacto: formData.contacto,
                categoria: formData.categoria,
                estado: formData.estado,
                productosSuministrados: 0,
                ultimaCompra: null
            };
            setProveedores([...proveedores, newProveedor]);
            setMensaje('Proveedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProveedores(proveedores.filter(p => p.id !== id));
        setMensaje('Proveedor eliminado correctamente');
    };

    const getCategoriaColor = (categoria) => {
        switch (categoria) {
            case 'tecnologia': return 'primary';
            case 'oficina': return 'secondary';
            case 'ropa': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
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
                            <TableCell>Categoría</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Última Compra</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(proveedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {proveedor.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {proveedor.contacto}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{proveedor.nit}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {proveedor.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.categoria}
                                        color={getCategoriaColor(proveedor.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{proveedor.productosSuministrados}</TableCell>
                                <TableCell>
                                    {proveedor.ultimaCompra ? new Date(proveedor.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.estado}
                                        color={getEstadoColor(proveedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la empresa"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="NIT"
                            name="nit"
                            value={formData.nit}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
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
                            label="Persona de contacto"
                            name="contacto"
                            value={formData.contacto}
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                label="Categoría"
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="tecnologia">Tecnología</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="ropa">Ropa</MenuItem>
                                <MenuItem value="alimentos">Alimentos</MenuItem>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProveedor ? 'Actualizar' : 'Agregar'}
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

export default Proveedores; 
        nombre: '',
        nit: '',
        email: '',
        telefono: '',
        direccion: '',
        contacto: '',
        categoria: 'general',
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
                email: 'contacto@abc.com',
                telefono: '601-123-4567',
                direccion: 'Calle 45 #12-34, Bogotá',
                contacto: 'Carlos Mendoza',
                categoria: 'tecnologia',
                estado: 'activo',
                productosSuministrados: 45,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'Suministros XYZ',
                nit: '800987654-3',
                email: 'ventas@xyz.com',
                telefono: '601-987-6543',
                direccion: 'Carrera 78 #23-45, Medellín',
                contacto: 'Ana Rodríguez',
                categoria: 'oficina',
                estado: 'activo',
                productosSuministrados: 23,
                ultimaCompra: '2024-01-12'
            },
            {
                id: 3,
                nombre: 'Comercial Delta',
                nit: '700555123-4',
                email: 'info@delta.com',
                telefono: '601-555-1234',
                direccion: 'Avenida 5 #67-89, Cali',
                contacto: 'Luis González',
                categoria: 'ropa',
                estado: 'inactivo',
                productosSuministrados: 12,
                ultimaCompra: '2023-12-20'
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
                contacto: proveedor.contacto,
                categoria: proveedor.categoria,
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
                contacto: '',
                categoria: 'general',
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
            contacto: '',
            categoria: 'general',
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
                        contacto: formData.contacto,
                        categoria: formData.categoria,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Proveedor actualizado correctamente');
        } else {
            // Agregar nuevo proveedor
            const newProveedor = {
                id: Date.now(),
                nombre: formData.nombre,
                nit: formData.nit,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                contacto: formData.contacto,
                categoria: formData.categoria,
                estado: formData.estado,
                productosSuministrados: 0,
                ultimaCompra: null
            };
            setProveedores([...proveedores, newProveedor]);
            setMensaje('Proveedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProveedores(proveedores.filter(p => p.id !== id));
        setMensaje('Proveedor eliminado correctamente');
    };

    const getCategoriaColor = (categoria) => {
        switch (categoria) {
            case 'tecnologia': return 'primary';
            case 'oficina': return 'secondary';
            case 'ropa': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
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
                            <TableCell>Categoría</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Última Compra</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(proveedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {proveedor.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {proveedor.contacto}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{proveedor.nit}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {proveedor.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.categoria}
                                        color={getCategoriaColor(proveedor.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{proveedor.productosSuministrados}</TableCell>
                                <TableCell>
                                    {proveedor.ultimaCompra ? new Date(proveedor.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.estado}
                                        color={getEstadoColor(proveedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la empresa"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="NIT"
                            name="nit"
                            value={formData.nit}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
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
                            label="Persona de contacto"
                            name="contacto"
                            value={formData.contacto}
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                label="Categoría"
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="tecnologia">Tecnología</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="ropa">Ropa</MenuItem>
                                <MenuItem value="alimentos">Alimentos</MenuItem>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProveedor ? 'Actualizar' : 'Agregar'}
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

export default Proveedores; 
        nombre: '',
        nit: '',
        email: '',
        telefono: '',
        direccion: '',
        contacto: '',
        categoria: 'general',
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
                email: 'contacto@abc.com',
                telefono: '601-123-4567',
                direccion: 'Calle 45 #12-34, Bogotá',
                contacto: 'Carlos Mendoza',
                categoria: 'tecnologia',
                estado: 'activo',
                productosSuministrados: 45,
                ultimaCompra: '2024-01-15'
            },
            {
                id: 2,
                nombre: 'Suministros XYZ',
                nit: '800987654-3',
                email: 'ventas@xyz.com',
                telefono: '601-987-6543',
                direccion: 'Carrera 78 #23-45, Medellín',
                contacto: 'Ana Rodríguez',
                categoria: 'oficina',
                estado: 'activo',
                productosSuministrados: 23,
                ultimaCompra: '2024-01-12'
            },
            {
                id: 3,
                nombre: 'Comercial Delta',
                nit: '700555123-4',
                email: 'info@delta.com',
                telefono: '601-555-1234',
                direccion: 'Avenida 5 #67-89, Cali',
                contacto: 'Luis González',
                categoria: 'ropa',
                estado: 'inactivo',
                productosSuministrados: 12,
                ultimaCompra: '2023-12-20'
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
                contacto: proveedor.contacto,
                categoria: proveedor.categoria,
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
                contacto: '',
                categoria: 'general',
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
            contacto: '',
            categoria: 'general',
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
                        contacto: formData.contacto,
                        categoria: formData.categoria,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Proveedor actualizado correctamente');
        } else {
            // Agregar nuevo proveedor
            const newProveedor = {
                id: Date.now(),
                nombre: formData.nombre,
                nit: formData.nit,
                email: formData.email,
                telefono: formData.telefono,
                direccion: formData.direccion,
                contacto: formData.contacto,
                categoria: formData.categoria,
                estado: formData.estado,
                productosSuministrados: 0,
                ultimaCompra: null
            };
            setProveedores([...proveedores, newProveedor]);
            setMensaje('Proveedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProveedores(proveedores.filter(p => p.id !== id));
        setMensaje('Proveedor eliminado correctamente');
    };

    const getCategoriaColor = (categoria) => {
        switch (categoria) {
            case 'tecnologia': return 'primary';
            case 'oficina': return 'secondary';
            case 'ropa': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
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
                            <TableCell>Categoría</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Última Compra</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proveedores.map((proveedor) => (
                            <TableRow key={proveedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(proveedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {proveedor.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {proveedor.contacto}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>{proveedor.nit}</TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{proveedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                            {proveedor.direccion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.categoria}
                                        color={getCategoriaColor(proveedor.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{proveedor.productosSuministrados}</TableCell>
                                <TableCell>
                                    {proveedor.ultimaCompra ? new Date(proveedor.ultimaCompra).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={proveedor.estado}
                                        color={getEstadoColor(proveedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingProveedor ? 'Editar Proveedor' : 'Agregar Nuevo Proveedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la empresa"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="NIT"
                            name="nit"
                            value={formData.nit}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
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
                            label="Persona de contacto"
                            name="contacto"
                            value={formData.contacto}
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                label="Categoría"
                            >
                                <MenuItem value="general">General</MenuItem>
                                <MenuItem value="tecnologia">Tecnología</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="ropa">Ropa</MenuItem>
                                <MenuItem value="alimentos">Alimentos</MenuItem>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProveedor ? 'Actualizar' : 'Agregar'}
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

export default Proveedores; 