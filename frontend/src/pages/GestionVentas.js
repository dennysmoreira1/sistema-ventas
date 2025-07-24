import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar, Grid
} from '@mui/material';
import { Add, Edit, Delete, ShoppingCart, AttachMoney } from '@mui/icons-material';

const GestionVentas = () => {
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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        if (editingVenta) {
            setVentas(prev => prev.map(v => v.id === editingVenta.id ? { ...formData, id: editingVenta.id } : v));
        } else {
            setVentas(prev => [...prev, { ...formData, id: Date.now() }]);
        }
        setMensaje('Venta guardada exitosamente');
        handleClose();
    };

    const handleEdit = (venta) => {
        setEditingVenta(venta);
        setFormData(venta);
        setOpenDialog(true);
    };

    const handleDelete = (id) => {
        setVentas(prev => prev.filter(v => v.id !== id));
        setMensaje('Venta eliminada exitosamente');
    };

    const handleClose = () => {
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

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Ventas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenDialog(true)}
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
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.productos}</TableCell>
                                <TableCell>${venta.total}</TableCell>
                                <TableCell>{venta.metodoPago}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.estado}
                                        color={venta.estado === 'completada' ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(venta)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(venta.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingVenta ? 'Editar Venta' : 'Nueva Venta'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cliente"
                                name="cliente"
                                value={formData.cliente}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Productos"
                                name="productos"
                                value={formData.productos}
                                onChange={handleInputChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Total"
                                name="total"
                                value={formData.total}
                                onChange={handleInputChange}
                                margin="normal"
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
                        <Grid xs={12}>
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
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave} variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!mensaje}
                autoHideDuration={6000}
                onClose={() => setMensaje('')}
            >
                <Alert onClose={() => setMensaje('')} severity="success">
                    {mensaje}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GestionVentas; 