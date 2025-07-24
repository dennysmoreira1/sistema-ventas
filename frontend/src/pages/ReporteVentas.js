import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Search, Print } from '@mui/icons-material';

const ReporteVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [filtro, setFiltro] = useState({
        estado: '',
        metodoPago: '',
        cliente: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                cliente: 'Juan Pérez',
                total: 4300000,
                metodoPago: 'tarjeta',
                estado: 'completada',
                fecha: '2024-01-15',
                vendedor: 'María García'
            },
            {
                id: 2,
                cliente: 'Carlos López',
                total: 450000,
                metodoPago: 'efectivo',
                estado: 'pendiente',
                fecha: '2024-01-16',
                vendedor: 'Ana Rodríguez'
            },
            {
                id: 3,
                cliente: 'Laura Martínez',
                total: 3200000,
                metodoPago: 'transferencia',
                estado: 'cancelada',
                fecha: '2024-01-17',
                vendedor: 'Pedro Sánchez'
            }
        ]);
    }, []);

    const handleFiltroChange = (e) => {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    };

    const ventasFiltradas = ventas.filter(v =>
        (filtro.estado ? v.estado === filtro.estado : true) &&
        (filtro.metodoPago ? v.metodoPago === filtro.metodoPago : true) &&
        (filtro.cliente ? v.cliente.toLowerCase().includes(filtro.cliente.toLowerCase()) : true)
    );

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
                    Reporte de Ventas
                </Typography>
                <Button variant="contained" startIcon={<Print />}>Imprimir</Button>
            </Box>

            <Box display="flex" gap={2} mb={3}>
                <TextField
                    label="Cliente"
                    name="cliente"
                    value={filtro.cliente}
                    onChange={handleFiltroChange}
                    size="small"
                />
                <FormControl size="small">
                    <InputLabel>Estado</InputLabel>
                    <Select
                        name="estado"
                        value={filtro.estado}
                        onChange={handleFiltroChange}
                        label="Estado"
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="completada">Completada</MenuItem>
                        <MenuItem value="pendiente">Pendiente</MenuItem>
                        <MenuItem value="cancelada">Cancelada</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel>Método de Pago</InputLabel>
                    <Select
                        name="metodoPago"
                        value={filtro.metodoPago}
                        onChange={handleFiltroChange}
                        label="Método de Pago"
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="efectivo">Efectivo</MenuItem>
                        <MenuItem value="tarjeta">Tarjeta</MenuItem>
                        <MenuItem value="transferencia">Transferencia</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Método de Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Vendedor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasFiltradas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>{venta.cliente}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default ReporteVentas; 