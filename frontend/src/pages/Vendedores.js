import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Avatar
} from '@mui/material';
import { Add, Edit, Delete, Phone, Email, LocationOn } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const Vendedores = () => {
    const [vendedores, setVendedores] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingVendedor, setEditingVendedor] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        comision: '',
        zona: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVendedores([
            {
                id: 1,
                nombre: 'Carlos Rodríguez',
                email: 'carlos@empresa.com',
                telefono: '300-123-4567',
                comision: 15,
                zona: 'Norte',
                estado: 'activo',
                ventasMes: 25,
                totalVentas: 125000
            },
            {
                id: 2,
                nombre: 'Ana Martínez',
                email: 'ana@empresa.com',
                telefono: '300-987-6543',
                comision: 12,
                zona: 'Sur',
                estado: 'activo',
                ventasMes: 18,
                totalVentas: 89000
            },
            {
                id: 3,
                nombre: 'Luis González',
                email: 'luis@empresa.com',
                telefono: '300-555-1234',
                comision: 10,
                zona: 'Este',
                estado: 'inactivo',
                ventasMes: 0,
                totalVentas: 45000
            }
        ]);
    }, []);

    const handleOpenDialog = (vendedor = null) => {
        if (vendedor) {
            setEditingVendedor(vendedor);
            setFormData({
                nombre: vendedor.nombre,
                email: vendedor.email,
                telefono: vendedor.telefono,
                comision: vendedor.comision.toString(),
                zona: vendedor.zona,
                estado: vendedor.estado
            });
        } else {
            setEditingVendedor(null);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                comision: '',
                zona: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVendedor(null);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            comision: '',
            zona: '',
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
        if (!formData.nombre || !formData.email || !formData.telefono) {
            setError('Los campos nombre, email y teléfono son obligatorios');
            return;
        }

        if (editingVendedor) {
            // Actualizar vendedor
            setVendedores(vendedores.map(v =>
                v.id === editingVendedor.id
                    ? {
                        ...v,
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        comision: parseFloat(formData.comision),
                        zona: formData.zona,
                        estado: formData.estado
                    }
                    : v
            ));
            setMensaje('Vendedor actualizado correctamente');
        } else {
            // Agregar nuevo vendedor
            const newVendedor = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                comision: parseFloat(formData.comision),
                zona: formData.zona,
                estado: formData.estado,
                ventasMes: 0,
                totalVentas: 0
            };
            setVendedores([...vendedores, newVendedor]);
            setMensaje('Vendedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVendedores(vendedores.filter(v => v.id !== id));
        setMensaje('Vendedor eliminado correctamente');
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
                Gestión de Vendedores
            </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Vendedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Zona</TableCell>
                            <TableCell>Comisión</TableCell>
                            <TableCell>Ventas Mes</TableCell>
                            <TableCell>Total Ventas</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendedores.map((vendedor) => (
                            <TableRow key={vendedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(vendedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {vendedor.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        {vendedor.zona}
                                    </Box>
                                </TableCell>
                                <TableCell>{vendedor.comision}%</TableCell>
                                <TableCell>{vendedor.ventasMes}</TableCell>
                                <TableCell>${vendedor.totalVentas.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.estado}
                                        color={getEstadoColor(vendedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(vendedor)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(vendedor.id)}
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

            {/* Dialog para agregar/editar vendedor */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingVendedor ? 'Editar Vendedor' : 'Agregar Nuevo Vendedor'}
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Zona</InputLabel>
                            <Select
                                name="zona"
                                value={formData.zona}
                                onChange={handleInputChange}
                                label="Zona"
                            >
                                <MenuItem value="Norte">Norte</MenuItem>
                                <MenuItem value="Sur">Sur</MenuItem>
                                <MenuItem value="Este">Este</MenuItem>
                                <MenuItem value="Oeste">Oeste</MenuItem>
                                <MenuItem value="Centro">Centro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Comisión (%)"
                            name="comision"
                            type="number"
                            value={formData.comision}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{ min: 0, max: 100 }}
                        />
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
                        {editingVendedor ? 'Actualizar' : 'Agregar'}
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

export default Vendedores; 
        nombre: '',
        email: '',
        telefono: '',
        comision: '',
        zona: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVendedores([
            {
                id: 1,
                nombre: 'Carlos Rodríguez',
                email: 'carlos@empresa.com',
                telefono: '300-123-4567',
                comision: 15,
                zona: 'Norte',
                estado: 'activo',
                ventasMes: 25,
                totalVentas: 125000
            },
            {
                id: 2,
                nombre: 'Ana Martínez',
                email: 'ana@empresa.com',
                telefono: '300-987-6543',
                comision: 12,
                zona: 'Sur',
                estado: 'activo',
                ventasMes: 18,
                totalVentas: 89000
            },
            {
                id: 3,
                nombre: 'Luis González',
                email: 'luis@empresa.com',
                telefono: '300-555-1234',
                comision: 10,
                zona: 'Este',
                estado: 'inactivo',
                ventasMes: 0,
                totalVentas: 45000
            }
        ]);
    }, []);

    const handleOpenDialog = (vendedor = null) => {
        if (vendedor) {
            setEditingVendedor(vendedor);
            setFormData({
                nombre: vendedor.nombre,
                email: vendedor.email,
                telefono: vendedor.telefono,
                comision: vendedor.comision.toString(),
                zona: vendedor.zona,
                estado: vendedor.estado
            });
        } else {
            setEditingVendedor(null);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                comision: '',
                zona: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVendedor(null);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            comision: '',
            zona: '',
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
        if (!formData.nombre || !formData.email || !formData.telefono) {
            setError('Los campos nombre, email y teléfono son obligatorios');
            return;
        }

        if (editingVendedor) {
            // Actualizar vendedor
            setVendedores(vendedores.map(v =>
                v.id === editingVendedor.id
                    ? {
                        ...v,
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        comision: parseFloat(formData.comision),
                        zona: formData.zona,
                        estado: formData.estado
                    }
                    : v
            ));
            setMensaje('Vendedor actualizado correctamente');
        } else {
            // Agregar nuevo vendedor
            const newVendedor = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                comision: parseFloat(formData.comision),
                zona: formData.zona,
                estado: formData.estado,
                ventasMes: 0,
                totalVentas: 0
            };
            setVendedores([...vendedores, newVendedor]);
            setMensaje('Vendedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVendedores(vendedores.filter(v => v.id !== id));
        setMensaje('Vendedor eliminado correctamente');
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
                Gestión de Vendedores
            </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Vendedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Zona</TableCell>
                            <TableCell>Comisión</TableCell>
                            <TableCell>Ventas Mes</TableCell>
                            <TableCell>Total Ventas</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendedores.map((vendedor) => (
                            <TableRow key={vendedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(vendedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {vendedor.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        {vendedor.zona}
                                    </Box>
                                </TableCell>
                                <TableCell>{vendedor.comision}%</TableCell>
                                <TableCell>{vendedor.ventasMes}</TableCell>
                                <TableCell>${vendedor.totalVentas.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.estado}
                                        color={getEstadoColor(vendedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(vendedor)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(vendedor.id)}
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

            {/* Dialog para agregar/editar vendedor */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingVendedor ? 'Editar Vendedor' : 'Agregar Nuevo Vendedor'}
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Zona</InputLabel>
                            <Select
                                name="zona"
                                value={formData.zona}
                                onChange={handleInputChange}
                                label="Zona"
                            >
                                <MenuItem value="Norte">Norte</MenuItem>
                                <MenuItem value="Sur">Sur</MenuItem>
                                <MenuItem value="Este">Este</MenuItem>
                                <MenuItem value="Oeste">Oeste</MenuItem>
                                <MenuItem value="Centro">Centro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Comisión (%)"
                            name="comision"
                            type="number"
                            value={formData.comision}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{ min: 0, max: 100 }}
                        />
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
                        {editingVendedor ? 'Actualizar' : 'Agregar'}
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

export default Vendedores; 
        nombre: '',
        email: '',
        telefono: '',
        comision: '',
        zona: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVendedores([
            {
                id: 1,
                nombre: 'Carlos Rodríguez',
                email: 'carlos@empresa.com',
                telefono: '300-123-4567',
                comision: 15,
                zona: 'Norte',
                estado: 'activo',
                ventasMes: 25,
                totalVentas: 125000
            },
            {
                id: 2,
                nombre: 'Ana Martínez',
                email: 'ana@empresa.com',
                telefono: '300-987-6543',
                comision: 12,
                zona: 'Sur',
                estado: 'activo',
                ventasMes: 18,
                totalVentas: 89000
            },
            {
                id: 3,
                nombre: 'Luis González',
                email: 'luis@empresa.com',
                telefono: '300-555-1234',
                comision: 10,
                zona: 'Este',
                estado: 'inactivo',
                ventasMes: 0,
                totalVentas: 45000
            }
        ]);
    }, []);

    const handleOpenDialog = (vendedor = null) => {
        if (vendedor) {
            setEditingVendedor(vendedor);
            setFormData({
                nombre: vendedor.nombre,
                email: vendedor.email,
                telefono: vendedor.telefono,
                comision: vendedor.comision.toString(),
                zona: vendedor.zona,
                estado: vendedor.estado
            });
        } else {
            setEditingVendedor(null);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                comision: '',
                zona: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVendedor(null);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            comision: '',
            zona: '',
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
        if (!formData.nombre || !formData.email || !formData.telefono) {
            setError('Los campos nombre, email y teléfono son obligatorios');
            return;
        }

        if (editingVendedor) {
            // Actualizar vendedor
            setVendedores(vendedores.map(v =>
                v.id === editingVendedor.id
                    ? {
                        ...v,
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        comision: parseFloat(formData.comision),
                        zona: formData.zona,
                        estado: formData.estado
                    }
                    : v
            ));
            setMensaje('Vendedor actualizado correctamente');
        } else {
            // Agregar nuevo vendedor
            const newVendedor = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                comision: parseFloat(formData.comision),
                zona: formData.zona,
                estado: formData.estado,
                ventasMes: 0,
                totalVentas: 0
            };
            setVendedores([...vendedores, newVendedor]);
            setMensaje('Vendedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVendedores(vendedores.filter(v => v.id !== id));
        setMensaje('Vendedor eliminado correctamente');
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
                Gestión de Vendedores
            </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Vendedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Zona</TableCell>
                            <TableCell>Comisión</TableCell>
                            <TableCell>Ventas Mes</TableCell>
                            <TableCell>Total Ventas</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendedores.map((vendedor) => (
                            <TableRow key={vendedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(vendedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {vendedor.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        {vendedor.zona}
                                    </Box>
                                </TableCell>
                                <TableCell>{vendedor.comision}%</TableCell>
                                <TableCell>{vendedor.ventasMes}</TableCell>
                                <TableCell>${vendedor.totalVentas.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.estado}
                                        color={getEstadoColor(vendedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(vendedor)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(vendedor.id)}
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

            {/* Dialog para agregar/editar vendedor */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingVendedor ? 'Editar Vendedor' : 'Agregar Nuevo Vendedor'}
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Zona</InputLabel>
                            <Select
                                name="zona"
                                value={formData.zona}
                                onChange={handleInputChange}
                                label="Zona"
                            >
                                <MenuItem value="Norte">Norte</MenuItem>
                                <MenuItem value="Sur">Sur</MenuItem>
                                <MenuItem value="Este">Este</MenuItem>
                                <MenuItem value="Oeste">Oeste</MenuItem>
                                <MenuItem value="Centro">Centro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Comisión (%)"
                            name="comision"
                            type="number"
                            value={formData.comision}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{ min: 0, max: 100 }}
                        />
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
                        {editingVendedor ? 'Actualizar' : 'Agregar'}
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

export default Vendedores; 
        nombre: '',
        email: '',
        telefono: '',
        comision: '',
        zona: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVendedores([
            {
                id: 1,
                nombre: 'Carlos Rodríguez',
                email: 'carlos@empresa.com',
                telefono: '300-123-4567',
                comision: 15,
                zona: 'Norte',
                estado: 'activo',
                ventasMes: 25,
                totalVentas: 125000
            },
            {
                id: 2,
                nombre: 'Ana Martínez',
                email: 'ana@empresa.com',
                telefono: '300-987-6543',
                comision: 12,
                zona: 'Sur',
                estado: 'activo',
                ventasMes: 18,
                totalVentas: 89000
            },
            {
                id: 3,
                nombre: 'Luis González',
                email: 'luis@empresa.com',
                telefono: '300-555-1234',
                comision: 10,
                zona: 'Este',
                estado: 'inactivo',
                ventasMes: 0,
                totalVentas: 45000
            }
        ]);
    }, []);

    const handleOpenDialog = (vendedor = null) => {
        if (vendedor) {
            setEditingVendedor(vendedor);
            setFormData({
                nombre: vendedor.nombre,
                email: vendedor.email,
                telefono: vendedor.telefono,
                comision: vendedor.comision.toString(),
                zona: vendedor.zona,
                estado: vendedor.estado
            });
        } else {
            setEditingVendedor(null);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                comision: '',
                zona: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVendedor(null);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            comision: '',
            zona: '',
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
        if (!formData.nombre || !formData.email || !formData.telefono) {
            setError('Los campos nombre, email y teléfono son obligatorios');
            return;
        }

        if (editingVendedor) {
            // Actualizar vendedor
            setVendedores(vendedores.map(v =>
                v.id === editingVendedor.id
                    ? {
                        ...v,
                        nombre: formData.nombre,
                        email: formData.email,
                        telefono: formData.telefono,
                        comision: parseFloat(formData.comision),
                        zona: formData.zona,
                        estado: formData.estado
                    }
                    : v
            ));
            setMensaje('Vendedor actualizado correctamente');
        } else {
            // Agregar nuevo vendedor
            const newVendedor = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                comision: parseFloat(formData.comision),
                zona: formData.zona,
                estado: formData.estado,
                ventasMes: 0,
                totalVentas: 0
            };
            setVendedores([...vendedores, newVendedor]);
            setMensaje('Vendedor agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVendedores(vendedores.filter(v => v.id !== id));
        setMensaje('Vendedor eliminado correctamente');
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
                Gestión de Vendedores
            </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Vendedor
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Zona</TableCell>
                            <TableCell>Comisión</TableCell>
                            <TableCell>Ventas Mes</TableCell>
                            <TableCell>Total Ventas</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendedores.map((vendedor) => (
                            <TableRow key={vendedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(vendedor.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {vendedor.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.email}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{vendedor.telefono}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                                        {vendedor.zona}
                                    </Box>
                                </TableCell>
                                <TableCell>{vendedor.comision}%</TableCell>
                                <TableCell>{vendedor.ventasMes}</TableCell>
                                <TableCell>${vendedor.totalVentas.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.estado}
                                        color={getEstadoColor(vendedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(vendedor)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(vendedor.id)}
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

            {/* Dialog para agregar/editar vendedor */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingVendedor ? 'Editar Vendedor' : 'Agregar Nuevo Vendedor'}
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
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Zona</InputLabel>
                            <Select
                                name="zona"
                                value={formData.zona}
                                onChange={handleInputChange}
                                label="Zona"
                            >
                                <MenuItem value="Norte">Norte</MenuItem>
                                <MenuItem value="Sur">Sur</MenuItem>
                                <MenuItem value="Este">Este</MenuItem>
                                <MenuItem value="Oeste">Oeste</MenuItem>
                                <MenuItem value="Centro">Centro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Comisión (%)"
                            name="comision"
                            type="number"
                            value={formData.comision}
                            onChange={handleInputChange}
                            margin="normal"
                            inputProps={{ min: 0, max: 100 }}
                        />
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
                        {editingVendedor ? 'Actualizar' : 'Agregar'}
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

export default Vendedores; 