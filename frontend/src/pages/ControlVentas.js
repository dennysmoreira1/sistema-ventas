import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Grid,
    Card, CardContent, LinearProgress
} from '@mui/material';
import {
    Add, Edit, Delete, Visibility, Search, FilterList,
    TrendingUp, AttachMoney, ShoppingCart, Person
} from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const ControlVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: 'todos',
        vendedor: 'todos'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                numeroVenta: 'V001',
                cliente: 'Juan Pérez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-15',
                total: 1250000,
                estado: 'completada',
                metodoPago: 'Efectivo',
                productos: 3
            },
            {
                id: 2,
                numeroVenta: 'V002',
                cliente: 'María García',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-15',
                total: 890000,
                estado: 'pendiente',
                metodoPago: 'Tarjeta',
                productos: 2
            },
            {
                id: 3,
                numeroVenta: 'V003',
                cliente: 'Carlos López',
                vendedor: 'Luis González',
                fecha: '2024-01-14',
                total: 2100000,
                estado: 'completada',
                metodoPago: 'Transferencia',
                productos: 5
            },
            {
                id: 4,
                numeroVenta: 'V004',
                cliente: 'Ana Rodríguez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-14',
                total: 450000,
                estado: 'cancelada',
                metodoPago: 'Efectivo',
                productos: 1
            }
        ]);
    }, []);

    const handleOpenDialog = (venta = null) => {
        setSelectedVenta(venta);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedVenta(null);
    };

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleEstadoChange = (id, nuevoEstado) => {
        setVentas(ventas.map(v =>
            v.id === id ? { ...v, estado: nuevoEstado } : v
        ));
        setMensaje('Estado de venta actualizado correctamente');
    };

    const handleDelete = (id) => {
        setVentas(ventas.filter(v => v.id !== id));
        setMensaje('Venta eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada': return 'success';
            case 'pendiente': return 'warning';
            case 'cancelada': return 'error';
            default: return 'default';
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch (metodo) {
            case 'Efectivo': return 'success';
            case 'Tarjeta': return 'primary';
            case 'Transferencia': return 'info';
            default: return 'default';
        }
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.estado !== 'todos' && venta.estado !== filtros.estado) return false;
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        ventasCompletadas: ventasFiltradas.filter(v => v.estado === 'completada').length,
        ventasPendientes: ventasFiltradas.filter(v => v.estado === 'pendiente').length
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Control de Ventas
            </Typography>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.totalVentas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ventas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.totalIngresos.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ingresos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasCompletadas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Completadas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Person sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasPendientes}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Pendientes
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            name="fechaInicio"
                            type="date"
                            value={filtros.fechaInicio}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Fin"
                            name="fechaFin"
                            type="date"
                            value={filtros.fechaFin}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Vendedor</InputLabel>
                            <Select
                                name="vendedor"
                                value={filtros.vendedor}
                                onChange={handleFiltroChange}
                                label="Vendedor"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                                <MenuItem value="Luis González">Luis González</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="cancelada">Cancelada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de ventas */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Venta</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Método Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasFiltradas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {venta.numeroVenta}
                                    </Typography>
                                </TableCell>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.vendedor}</TableCell>
                                <TableCell>
                                    {new Date(venta.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${venta.total.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.productos}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
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
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(venta)}
                                        color="primary"
                                    >
                                        <Visibility />
                                    </IconButton>
                                    {venta.estado === 'pendiente' && (
                                        <>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'completada')}
                                                color="success"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'cancelada')}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para ver detalles de venta */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    Detalles de Venta - {selectedVenta?.numeroVenta}
                </DialogTitle>
                <DialogContent>
                    {selectedVenta && (
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Cliente
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.cliente}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Vendedor
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.vendedor}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Fecha
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(selectedVenta.fecha).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ${selectedVenta.total.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Método de Pago
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.metodoPago}
                                        color={getMetodoPagoColor(selectedVenta.metodoPago)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Estado
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.estado}
                                        color={getEstadoColor(selectedVenta.estado)}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
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
        </Box>
    );
};

export default ControlVentas; 
    const [ventas, setVentas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: 'todos',
        vendedor: 'todos'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                numeroVenta: 'V001',
                cliente: 'Juan Pérez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-15',
                total: 1250000,
                estado: 'completada',
                metodoPago: 'Efectivo',
                productos: 3
            },
            {
                id: 2,
                numeroVenta: 'V002',
                cliente: 'María García',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-15',
                total: 890000,
                estado: 'pendiente',
                metodoPago: 'Tarjeta',
                productos: 2
            },
            {
                id: 3,
                numeroVenta: 'V003',
                cliente: 'Carlos López',
                vendedor: 'Luis González',
                fecha: '2024-01-14',
                total: 2100000,
                estado: 'completada',
                metodoPago: 'Transferencia',
                productos: 5
            },
            {
                id: 4,
                numeroVenta: 'V004',
                cliente: 'Ana Rodríguez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-14',
                total: 450000,
                estado: 'cancelada',
                metodoPago: 'Efectivo',
                productos: 1
            }
        ]);
    }, []);

    const handleOpenDialog = (venta = null) => {
        setSelectedVenta(venta);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedVenta(null);
    };

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleEstadoChange = (id, nuevoEstado) => {
        setVentas(ventas.map(v =>
            v.id === id ? { ...v, estado: nuevoEstado } : v
        ));
        setMensaje('Estado de venta actualizado correctamente');
    };

    const handleDelete = (id) => {
        setVentas(ventas.filter(v => v.id !== id));
        setMensaje('Venta eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada': return 'success';
            case 'pendiente': return 'warning';
            case 'cancelada': return 'error';
            default: return 'default';
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch (metodo) {
            case 'Efectivo': return 'success';
            case 'Tarjeta': return 'primary';
            case 'Transferencia': return 'info';
            default: return 'default';
        }
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.estado !== 'todos' && venta.estado !== filtros.estado) return false;
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        ventasCompletadas: ventasFiltradas.filter(v => v.estado === 'completada').length,
        ventasPendientes: ventasFiltradas.filter(v => v.estado === 'pendiente').length
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Control de Ventas
            </Typography>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.totalVentas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ventas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.totalIngresos.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ingresos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasCompletadas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Completadas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Person sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasPendientes}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Pendientes
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            name="fechaInicio"
                            type="date"
                            value={filtros.fechaInicio}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Fin"
                            name="fechaFin"
                            type="date"
                            value={filtros.fechaFin}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Vendedor</InputLabel>
                            <Select
                                name="vendedor"
                                value={filtros.vendedor}
                                onChange={handleFiltroChange}
                                label="Vendedor"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                                <MenuItem value="Luis González">Luis González</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="cancelada">Cancelada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de ventas */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Venta</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Método Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasFiltradas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {venta.numeroVenta}
                                    </Typography>
                                </TableCell>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.vendedor}</TableCell>
                                <TableCell>
                                    {new Date(venta.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${venta.total.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.productos}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
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
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(venta)}
                                        color="primary"
                                    >
                                        <Visibility />
                                    </IconButton>
                                    {venta.estado === 'pendiente' && (
                                        <>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'completada')}
                                                color="success"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'cancelada')}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para ver detalles de venta */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    Detalles de Venta - {selectedVenta?.numeroVenta}
                </DialogTitle>
                <DialogContent>
                    {selectedVenta && (
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Cliente
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.cliente}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Vendedor
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.vendedor}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Fecha
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(selectedVenta.fecha).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ${selectedVenta.total.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Método de Pago
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.metodoPago}
                                        color={getMetodoPagoColor(selectedVenta.metodoPago)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Estado
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.estado}
                                        color={getEstadoColor(selectedVenta.estado)}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
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
        </Box>
    );
};

export default ControlVentas; 
    const [ventas, setVentas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: 'todos',
        vendedor: 'todos'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                numeroVenta: 'V001',
                cliente: 'Juan Pérez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-15',
                total: 1250000,
                estado: 'completada',
                metodoPago: 'Efectivo',
                productos: 3
            },
            {
                id: 2,
                numeroVenta: 'V002',
                cliente: 'María García',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-15',
                total: 890000,
                estado: 'pendiente',
                metodoPago: 'Tarjeta',
                productos: 2
            },
            {
                id: 3,
                numeroVenta: 'V003',
                cliente: 'Carlos López',
                vendedor: 'Luis González',
                fecha: '2024-01-14',
                total: 2100000,
                estado: 'completada',
                metodoPago: 'Transferencia',
                productos: 5
            },
            {
                id: 4,
                numeroVenta: 'V004',
                cliente: 'Ana Rodríguez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-14',
                total: 450000,
                estado: 'cancelada',
                metodoPago: 'Efectivo',
                productos: 1
            }
        ]);
    }, []);

    const handleOpenDialog = (venta = null) => {
        setSelectedVenta(venta);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedVenta(null);
    };

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleEstadoChange = (id, nuevoEstado) => {
        setVentas(ventas.map(v =>
            v.id === id ? { ...v, estado: nuevoEstado } : v
        ));
        setMensaje('Estado de venta actualizado correctamente');
    };

    const handleDelete = (id) => {
        setVentas(ventas.filter(v => v.id !== id));
        setMensaje('Venta eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada': return 'success';
            case 'pendiente': return 'warning';
            case 'cancelada': return 'error';
            default: return 'default';
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch (metodo) {
            case 'Efectivo': return 'success';
            case 'Tarjeta': return 'primary';
            case 'Transferencia': return 'info';
            default: return 'default';
        }
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.estado !== 'todos' && venta.estado !== filtros.estado) return false;
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        ventasCompletadas: ventasFiltradas.filter(v => v.estado === 'completada').length,
        ventasPendientes: ventasFiltradas.filter(v => v.estado === 'pendiente').length
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Control de Ventas
            </Typography>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.totalVentas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ventas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.totalIngresos.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ingresos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasCompletadas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Completadas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Person sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasPendientes}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Pendientes
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            name="fechaInicio"
                            type="date"
                            value={filtros.fechaInicio}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Fin"
                            name="fechaFin"
                            type="date"
                            value={filtros.fechaFin}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Vendedor</InputLabel>
                            <Select
                                name="vendedor"
                                value={filtros.vendedor}
                                onChange={handleFiltroChange}
                                label="Vendedor"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                                <MenuItem value="Luis González">Luis González</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="cancelada">Cancelada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de ventas */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Venta</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Método Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasFiltradas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {venta.numeroVenta}
                                    </Typography>
                                </TableCell>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.vendedor}</TableCell>
                                <TableCell>
                                    {new Date(venta.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${venta.total.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.productos}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
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
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(venta)}
                                        color="primary"
                                    >
                                        <Visibility />
                                    </IconButton>
                                    {venta.estado === 'pendiente' && (
                                        <>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'completada')}
                                                color="success"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'cancelada')}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para ver detalles de venta */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    Detalles de Venta - {selectedVenta?.numeroVenta}
                </DialogTitle>
                <DialogContent>
                    {selectedVenta && (
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Cliente
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.cliente}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Vendedor
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.vendedor}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Fecha
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(selectedVenta.fecha).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ${selectedVenta.total.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Método de Pago
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.metodoPago}
                                        color={getMetodoPagoColor(selectedVenta.metodoPago)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Estado
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.estado}
                                        color={getEstadoColor(selectedVenta.estado)}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
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
        </Box>
    );
};

export default ControlVentas; 
    const [ventas, setVentas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        estado: 'todos',
        vendedor: 'todos'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setVentas([
            {
                id: 1,
                numeroVenta: 'V001',
                cliente: 'Juan Pérez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-15',
                total: 1250000,
                estado: 'completada',
                metodoPago: 'Efectivo',
                productos: 3
            },
            {
                id: 2,
                numeroVenta: 'V002',
                cliente: 'María García',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-15',
                total: 890000,
                estado: 'pendiente',
                metodoPago: 'Tarjeta',
                productos: 2
            },
            {
                id: 3,
                numeroVenta: 'V003',
                cliente: 'Carlos López',
                vendedor: 'Luis González',
                fecha: '2024-01-14',
                total: 2100000,
                estado: 'completada',
                metodoPago: 'Transferencia',
                productos: 5
            },
            {
                id: 4,
                numeroVenta: 'V004',
                cliente: 'Ana Rodríguez',
                vendedor: 'Carlos Rodríguez',
                fecha: '2024-01-14',
                total: 450000,
                estado: 'cancelada',
                metodoPago: 'Efectivo',
                productos: 1
            }
        ]);
    }, []);

    const handleOpenDialog = (venta = null) => {
        setSelectedVenta(venta);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedVenta(null);
    };

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleEstadoChange = (id, nuevoEstado) => {
        setVentas(ventas.map(v =>
            v.id === id ? { ...v, estado: nuevoEstado } : v
        ));
        setMensaje('Estado de venta actualizado correctamente');
    };

    const handleDelete = (id) => {
        setVentas(ventas.filter(v => v.id !== id));
        setMensaje('Venta eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada': return 'success';
            case 'pendiente': return 'warning';
            case 'cancelada': return 'error';
            default: return 'default';
        }
    };

    const getMetodoPagoColor = (metodo) => {
        switch (metodo) {
            case 'Efectivo': return 'success';
            case 'Tarjeta': return 'primary';
            case 'Transferencia': return 'info';
            default: return 'default';
        }
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.estado !== 'todos' && venta.estado !== filtros.estado) return false;
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        ventasCompletadas: ventasFiltradas.filter(v => v.estado === 'completada').length,
        ventasPendientes: ventasFiltradas.filter(v => v.estado === 'pendiente').length
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Control de Ventas
            </Typography>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.totalVentas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ventas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.totalIngresos.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Ingresos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <TrendingUp sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasCompletadas}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Completadas
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Person sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.ventasPendientes}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Pendientes
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Inicio"
                            name="fechaInicio"
                            type="date"
                            value={filtros.fechaInicio}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha Fin"
                            name="fechaFin"
                            type="date"
                            value={filtros.fechaFin}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Vendedor</InputLabel>
                            <Select
                                name="vendedor"
                                value={filtros.vendedor}
                                onChange={handleFiltroChange}
                                label="Vendedor"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="Carlos Rodríguez">Carlos Rodríguez</MenuItem>
                                <MenuItem value="Ana Martínez">Ana Martínez</MenuItem>
                                <MenuItem value="Luis González">Luis González</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="todos">Todos</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="cancelada">Cancelada</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de ventas */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>N° Venta</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Vendedor</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell>Método Pago</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventasFiltradas.map((venta) => (
                            <TableRow key={venta.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {venta.numeroVenta}
                                    </Typography>
                                </TableCell>
                                <TableCell>{venta.cliente}</TableCell>
                                <TableCell>{venta.vendedor}</TableCell>
                                <TableCell>
                                    {new Date(venta.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${venta.total.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={venta.productos}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
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
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(venta)}
                                        color="primary"
                                    >
                                        <Visibility />
                                    </IconButton>
                                    {venta.estado === 'pendiente' && (
                                        <>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'completada')}
                                                color="success"
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEstadoChange(venta.id, 'cancelada')}
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para ver detalles de venta */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    Detalles de Venta - {selectedVenta?.numeroVenta}
                </DialogTitle>
                <DialogContent>
                    {selectedVenta && (
                        <Box sx={{ pt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Cliente
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.cliente}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Vendedor
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedVenta.vendedor}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Fecha
                                    </Typography>
                                    <Typography variant="body1">
                                        {new Date(selectedVenta.fecha).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Total
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        ${selectedVenta.total.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Método de Pago
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.metodoPago}
                                        color={getMetodoPagoColor(selectedVenta.metodoPago)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Estado
                                    </Typography>
                                    <Chip
                                        label={selectedVenta.estado}
                                        color={getEstadoColor(selectedVenta.estado)}
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cerrar</Button>
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
        </Box>
    );
};

export default ControlVentas; 