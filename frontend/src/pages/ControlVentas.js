import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar, Grid
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ControlVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingVenta, setEditingVenta] = useState(null);
    const [formData, setFormData] = useState({
        cliente: '',
        productos: '',
        total: '',
        metodoPago: 'efectivo',
        estado: 'pendiente'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                cliente: 'Juan Pérez',
                productos: 'iPhone 15 Pro, Samsung Galaxy S24',
                total: 4300000,
                metodoPago: 'tarjeta',
                estado: 'completada',
                fecha: '2024-01-15',
                vendedor: 'María García'
            },
            {
                id: 2,
                cliente: 'Carlos López',
                productos: 'Nike Air Max',
                total: 450000,
                metodoPago: 'efectivo',
                estado: 'pendiente',
                fecha: '2024-01-16',
                vendedor: 'Ana Rodríguez'
            },
            {
                id: 3,
                cliente: 'Laura Martínez',
                productos: 'Laptop HP Pavilion',
                total: 3200000,
                metodoPago: 'transferencia',
                estado: 'cancelada',
                fecha: '2024-01-17',
                vendedor: 'Pedro Sánchez'
            }
        ]);
    }, []);

    const handleOpenDialog = (venta = null) => {
        if (venta) {
            setEditingVenta(venta);
            setFormData({
                cliente: venta.cliente,
                productos: venta.productos,
                total: venta.total.toString(),
                metodoPago: venta.metodoPago,
                estado: venta.estado
            });
        } else {
            setEditingVenta(null);
            setFormData({
                cliente: '',
                productos: '',
                total: '',
                metodoPago: 'efectivo',
                estado: 'pendiente'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingVenta(null);
        setFormData({
            cliente: '',
            productos: '',
            total: '',
            metodoPago: 'efectivo',
            estado: 'pendiente'
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.cliente || !formData.productos || !formData.total) {
            setError('Los campos cliente, productos y total son obligatorios');
            return;
        }

        if (editingVenta) {
            // Actualizar venta
            setVentas(ventas.map(v =>
                v.id === editingVenta.id
                    ? {
                        ...v,
                        cliente: formData.cliente,
                        productos: formData.productos,
                        total: parseFloat(formData.total),
                        metodoPago: formData.metodoPago,
                        estado: formData.estado
                    }
                    : v
            ));
            setMensaje('Venta actualizada exitosamente');
        } else {
            // Crear nueva venta
            const nuevaVenta = {
                id: Date.now(),
                cliente: formData.cliente,
                productos: formData.productos,
                total: parseFloat(formData.total),
                metodoPago: formData.metodoPago,
                estado: formData.estado,
                fecha: new Date().toISOString().split('T')[0],
                vendedor: 'Usuario Actual'
            };
            setVentas([...ventas, nuevaVenta]);
            setMensaje('Venta creada exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setVentas(ventas.filter(v => v.id !== id));
        setMensaje('Venta eliminada exitosamente');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada':
                return 'success';
            case 'pendiente':
                return 'warning';
            case 'cancelada':
                return 'error';
            default:
                return 'default';
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch (metodo) {
            case 'efectivo':
                return 'success';
            case 'tarjeta':
                return 'primary';
            case 'transferencia':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Control de Ventas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Nueva Venta
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Método de Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.productos}</TableCell>
                                <TableCell>${venta.total.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.metodoPago}
                                        color={getMetodoPagoColor(venta.metodoPago)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.estado}
                                        color={getEstadoColor(venta.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{venta.fecha}</TableCell>
                                <TableCell>{venta.vendedor}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(venta)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(venta.id)}
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

            {/* Dialog para crear/editar venta */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingVenta ? 'Editar Venta' : 'Nueva Venta'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cliente"
                                name="cliente"
                                value={formData.cliente}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Total"
                                name="total"
                                type="number"
                                value={formData.total}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                fullWidth
                                label="Productos"
                                name="productos"
                                value={formData.productos}
                                onChange={handleInputChange}
                                margin="normal"
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Método de Pago</InputLabel>
                                <Select
                                    name="metodoPago"
                                    value={formData.metodoPago}
                                    onChange={handleInputChange}
                                    label="Método de Pago"
                                >
                                    <MenuItem value="efectivo">Efectivo</MenuItem>
                                    <MenuItem value="tarjeta">Tarjeta</MenuItem>
                                    <MenuItem value="transferencia">Transferencia</MenuItem>
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
                                    <MenuItem value="pendiente">Pendiente</MenuItem>
                                    <MenuItem value="completada">Completada</MenuItem>
                                    <MenuItem value="cancelada">Cancelada</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingVenta ? 'Actualizar' : 'Crear'}
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

export default ControlVentas; 