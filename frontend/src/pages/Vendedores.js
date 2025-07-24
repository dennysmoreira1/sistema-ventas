import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete, Person, Email, Phone, LocationOn } from '@mui/icons-material';

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
                nombre: 'María García',
                email: 'maria.garcia@email.com',
                telefono: '+57 300 123 4567',
                comision: 5.5,
                zona: 'Norte',
                estado: 'activo',
                ventasRealizadas: 25,
                fechaRegistro: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Ana Rodríguez',
                email: 'ana.rodriguez@email.com',
                telefono: '+57 300 987 6543',
                comision: 4.8,
                zona: 'Sur',
                estado: 'activo',
                ventasRealizadas: 18,
                fechaRegistro: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Pedro Sánchez',
                email: 'pedro.sanchez@email.com',
                telefono: '+57 300 555 1234',
                comision: 6.2,
                zona: 'Este',
                estado: 'inactivo',
                ventasRealizadas: 0,
                fechaRegistro: '2024-01-03'
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
        if (!formData.nombre || !formData.email) {
            setError('Los campos nombre y email son obligatorios');
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
            setMensaje('Vendedor actualizado exitosamente');
        } else {
            // Crear nuevo vendedor
            const nuevoVendedor = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                telefono: formData.telefono,
                comision: parseFloat(formData.comision) || 0,
                zona: formData.zona,
                estado: formData.estado,
                ventasRealizadas: 0,
                fechaRegistro: new Date().toISOString().split('T')[0]
            };
            setVendedores([...vendedores, nuevoVendedor]);
            setMensaje('Vendedor creado exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVendedores(vendedores.filter(v => v.id !== id));
        setMensaje('Vendedor eliminado exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    const getZonaColor = (zona) => {
        switch (zona) {
            case 'Norte':
                return 'primary';
            case 'Sur':
                return 'secondary';
            case 'Este':
                return 'info';
            case 'Oeste':
                return 'warning';
            default:
                return 'default';
        }
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
                            <TableCell>Estado</TableCell>
                            <TableCell>Ventas Realizadas</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vendedores.map((vendedor) => (
                            <TableRow key={vendedor.id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Person sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {vendedor.nombre}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Box display="flex" alignItems="center" mb={0.5}>
                                            <Email sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                                            <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                                {vendedor.email}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <Phone sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                                            <Typography variant="body2">
                                                {vendedor.telefono}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.zona}
                                        color={getZonaColor(vendedor.zona)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{vendedor.comision}%</TableCell>
                                <TableCell>
                                    <Chip
                                        label={vendedor.estado}
                                        color={getEstadoColor(vendedor.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{vendedor.ventasRealizadas}</TableCell>
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
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingVendedor ? 'Editar Vendedor' : 'Agregar Nuevo Vendedor'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
                            <TextField
                                fullWidth
                                label="Nombre completo"
                                name="nombre"
                                value={formData.nombre}
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
                                label="Comisión (%)"
                                name="comision"
                                type="number"
                                value={formData.comision}
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
                        {editingVendedor ? 'Actualizar' : 'Crear'}
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

export default Vendedores; 