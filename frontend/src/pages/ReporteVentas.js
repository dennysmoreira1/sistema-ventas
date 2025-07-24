import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Grid,
    Card, CardContent, LinearProgress, Tabs, Tab
} from '@mui/material';
import {
    TrendingUp, AttachMoney, ShoppingCart, Person,
    FilterList, Download, Visibility, BarChart
} from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const ReporteVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        vendedor: 'todos',
        categoria: 'todas'
    });
    const [tabValue, setTabValue] = useState(0);
    const [mensaje, setMensaje] = useState('');

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
                categoria: 'Tecnología',
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
                categoria: 'Ropa',
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
                categoria: 'Tecnología',
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
                categoria: 'Oficina',
                metodoPago: 'Efectivo',
                productos: 1
            },
            {
                id: 5,
                numeroVenta: 'V005',
                cliente: 'Luis Mendoza',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-13',
                total: 1800000,
                categoria: 'Tecnología',
                metodoPago: 'Tarjeta',
                productos: 4
            }
        ]);
    }, []);

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.categoria !== 'todas' && venta.categoria !== filtros.categoria) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        promedioVenta: ventasFiltradas.length > 0 ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length : 0,
        totalProductos: ventasFiltradas.reduce((sum, v) => sum + v.productos, 0)
    };

    const ventasPorVendedor = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.vendedor] = (acc[venta.vendedor] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorCategoria = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.categoria] = (acc[venta.categoria] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorMetodoPago = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.metodoPago] = (acc[venta.metodoPago] || 0) + venta.total;
        return acc;
    }, {});

    const handleExportar = () => {
        setMensaje('Reporte exportado correctamente');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Ventas
            </Typography>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros del Reporte
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                label="Categoría"
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="Tecnología">Tecnología</MenuItem>
                                <MenuItem value="Ropa">Ropa</MenuItem>
                                <MenuItem value="Oficina">Oficina</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Estadísticas principales */}
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
                                <TrendingUp sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.promedioVenta.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promedio Venta
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
                                        {estadisticas.totalProductos}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Productos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs para diferentes vistas */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Resumen General" />
                    <Tab label="Por Vendedor" />
                    <Tab label="Por Categoría" />
                    <Tab label="Métodos de Pago" />
                </Tabs>

                {/* Tab 1: Resumen General */}
                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Detalle de Ventas</Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={handleExportar}
                            >
                                Exportar Reporte
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>N° Venta</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Vendedor</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Productos</TableCell>
                                        <TableCell>Método Pago</TableCell>
                                        <TableCell>Total</TableCell>
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
                                                <Chip
                                                    label={venta.categoria}
                                                    size="small"
                                                    variant="outlined"
                                                />
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
                                                    size="small"
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    ${venta.total.toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Tab 2: Por Vendedor */}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Vendedor</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorVendedor).map(([vendedor, total]) => (
                                <Grid xs={12} sm={6} md={4} key={vendedor}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {vendedor}
                                            </Typography>
                                            <Typography variant="h4" color="primary" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 3: Por Categoría */}
                {tabValue === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Categoría</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorCategoria).map(([categoria, total]) => (
                                <Grid xs={12} sm={6} md={4} key={categoria}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {categoria}
                                            </Typography>
                                            <Typography variant="h4" color="success" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 4: Métodos de Pago */}
                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Método de Pago</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorMetodoPago).map(([metodo, total]) => (
                                <Grid xs={12} sm={6} md={4} key={metodo}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {metodo}
                                            </Typography>
                                            <Typography variant="h4" color="info" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>

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

export default ReporteVentas; 
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        vendedor: 'todos',
        categoria: 'todas'
    });
    const [tabValue, setTabValue] = useState(0);
    const [mensaje, setMensaje] = useState('');

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
                categoria: 'Tecnología',
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
                categoria: 'Ropa',
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
                categoria: 'Tecnología',
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
                categoria: 'Oficina',
                metodoPago: 'Efectivo',
                productos: 1
            },
            {
                id: 5,
                numeroVenta: 'V005',
                cliente: 'Luis Mendoza',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-13',
                total: 1800000,
                categoria: 'Tecnología',
                metodoPago: 'Tarjeta',
                productos: 4
            }
        ]);
    }, []);

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.categoria !== 'todas' && venta.categoria !== filtros.categoria) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        promedioVenta: ventasFiltradas.length > 0 ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length : 0,
        totalProductos: ventasFiltradas.reduce((sum, v) => sum + v.productos, 0)
    };

    const ventasPorVendedor = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.vendedor] = (acc[venta.vendedor] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorCategoria = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.categoria] = (acc[venta.categoria] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorMetodoPago = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.metodoPago] = (acc[venta.metodoPago] || 0) + venta.total;
        return acc;
    }, {});

    const handleExportar = () => {
        setMensaje('Reporte exportado correctamente');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Ventas
            </Typography>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros del Reporte
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                label="Categoría"
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="Tecnología">Tecnología</MenuItem>
                                <MenuItem value="Ropa">Ropa</MenuItem>
                                <MenuItem value="Oficina">Oficina</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Estadísticas principales */}
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
                                <TrendingUp sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.promedioVenta.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promedio Venta
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
                                        {estadisticas.totalProductos}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Productos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs para diferentes vistas */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Resumen General" />
                    <Tab label="Por Vendedor" />
                    <Tab label="Por Categoría" />
                    <Tab label="Métodos de Pago" />
                </Tabs>

                {/* Tab 1: Resumen General */}
                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Detalle de Ventas</Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={handleExportar}
                            >
                                Exportar Reporte
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>N° Venta</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Vendedor</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Productos</TableCell>
                                        <TableCell>Método Pago</TableCell>
                                        <TableCell>Total</TableCell>
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
                                                <Chip
                                                    label={venta.categoria}
                                                    size="small"
                                                    variant="outlined"
                                                />
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
                                                    size="small"
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    ${venta.total.toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Tab 2: Por Vendedor */}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Vendedor</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorVendedor).map(([vendedor, total]) => (
                                <Grid xs={12} sm={6} md={4} key={vendedor}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {vendedor}
                                            </Typography>
                                            <Typography variant="h4" color="primary" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 3: Por Categoría */}
                {tabValue === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Categoría</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorCategoria).map(([categoria, total]) => (
                                <Grid xs={12} sm={6} md={4} key={categoria}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {categoria}
                                            </Typography>
                                            <Typography variant="h4" color="success" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 4: Métodos de Pago */}
                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Método de Pago</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorMetodoPago).map(([metodo, total]) => (
                                <Grid xs={12} sm={6} md={4} key={metodo}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {metodo}
                                            </Typography>
                                            <Typography variant="h4" color="info" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>

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

export default ReporteVentas; 
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        vendedor: 'todos',
        categoria: 'todas'
    });
    const [tabValue, setTabValue] = useState(0);
    const [mensaje, setMensaje] = useState('');

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
                categoria: 'Tecnología',
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
                categoria: 'Ropa',
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
                categoria: 'Tecnología',
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
                categoria: 'Oficina',
                metodoPago: 'Efectivo',
                productos: 1
            },
            {
                id: 5,
                numeroVenta: 'V005',
                cliente: 'Luis Mendoza',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-13',
                total: 1800000,
                categoria: 'Tecnología',
                metodoPago: 'Tarjeta',
                productos: 4
            }
        ]);
    }, []);

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.categoria !== 'todas' && venta.categoria !== filtros.categoria) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        promedioVenta: ventasFiltradas.length > 0 ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length : 0,
        totalProductos: ventasFiltradas.reduce((sum, v) => sum + v.productos, 0)
    };

    const ventasPorVendedor = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.vendedor] = (acc[venta.vendedor] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorCategoria = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.categoria] = (acc[venta.categoria] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorMetodoPago = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.metodoPago] = (acc[venta.metodoPago] || 0) + venta.total;
        return acc;
    }, {});

    const handleExportar = () => {
        setMensaje('Reporte exportado correctamente');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Ventas
            </Typography>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros del Reporte
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                label="Categoría"
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="Tecnología">Tecnología</MenuItem>
                                <MenuItem value="Ropa">Ropa</MenuItem>
                                <MenuItem value="Oficina">Oficina</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Estadísticas principales */}
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
                                <TrendingUp sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.promedioVenta.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promedio Venta
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
                                        {estadisticas.totalProductos}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Productos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs para diferentes vistas */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Resumen General" />
                    <Tab label="Por Vendedor" />
                    <Tab label="Por Categoría" />
                    <Tab label="Métodos de Pago" />
                </Tabs>

                {/* Tab 1: Resumen General */}
                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Detalle de Ventas</Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={handleExportar}
                            >
                                Exportar Reporte
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>N° Venta</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Vendedor</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Productos</TableCell>
                                        <TableCell>Método Pago</TableCell>
                                        <TableCell>Total</TableCell>
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
                                                <Chip
                                                    label={venta.categoria}
                                                    size="small"
                                                    variant="outlined"
                                                />
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
                                                    size="small"
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    ${venta.total.toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Tab 2: Por Vendedor */}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Vendedor</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorVendedor).map(([vendedor, total]) => (
                                <Grid xs={12} sm={6} md={4} key={vendedor}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {vendedor}
                                            </Typography>
                                            <Typography variant="h4" color="primary" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 3: Por Categoría */}
                {tabValue === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Categoría</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorCategoria).map(([categoria, total]) => (
                                <Grid xs={12} sm={6} md={4} key={categoria}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {categoria}
                                            </Typography>
                                            <Typography variant="h4" color="success" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 4: Métodos de Pago */}
                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Método de Pago</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorMetodoPago).map(([metodo, total]) => (
                                <Grid xs={12} sm={6} md={4} key={metodo}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {metodo}
                                            </Typography>
                                            <Typography variant="h4" color="info" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>

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

export default ReporteVentas; 
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        vendedor: 'todos',
        categoria: 'todas'
    });
    const [tabValue, setTabValue] = useState(0);
    const [mensaje, setMensaje] = useState('');

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
                categoria: 'Tecnología',
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
                categoria: 'Ropa',
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
                categoria: 'Tecnología',
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
                categoria: 'Oficina',
                metodoPago: 'Efectivo',
                productos: 1
            },
            {
                id: 5,
                numeroVenta: 'V005',
                cliente: 'Luis Mendoza',
                vendedor: 'Ana Martínez',
                fecha: '2024-01-13',
                total: 1800000,
                categoria: 'Tecnología',
                metodoPago: 'Tarjeta',
                productos: 4
            }
        ]);
    }, []);

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtros.vendedor !== 'todos' && venta.vendedor !== filtros.vendedor) return false;
        if (filtros.categoria !== 'todas' && venta.categoria !== filtros.categoria) return false;
        if (filtros.fechaInicio && venta.fecha < filtros.fechaInicio) return false;
        if (filtros.fechaFin && venta.fecha > filtros.fechaFin) return false;
        return true;
    });

    const estadisticas = {
        totalVentas: ventasFiltradas.length,
        totalIngresos: ventasFiltradas.reduce((sum, v) => sum + v.total, 0),
        promedioVenta: ventasFiltradas.length > 0 ? ventasFiltradas.reduce((sum, v) => sum + v.total, 0) / ventasFiltradas.length : 0,
        totalProductos: ventasFiltradas.reduce((sum, v) => sum + v.productos, 0)
    };

    const ventasPorVendedor = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.vendedor] = (acc[venta.vendedor] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorCategoria = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.categoria] = (acc[venta.categoria] || 0) + venta.total;
        return acc;
    }, {});

    const ventasPorMetodoPago = ventasFiltradas.reduce((acc, venta) => {
        acc[venta.metodoPago] = (acc[venta.metodoPago] || 0) + venta.total;
        return acc;
    }, {});

    const handleExportar = () => {
        setMensaje('Reporte exportado correctamente');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Ventas
            </Typography>

            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros del Reporte
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                label="Categoría"
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="Tecnología">Tecnología</MenuItem>
                                <MenuItem value="Ropa">Ropa</MenuItem>
                                <MenuItem value="Oficina">Oficina</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Estadísticas principales */}
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
                                <TrendingUp sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.promedioVenta.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promedio Venta
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
                                        {estadisticas.totalProductos}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Productos
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabs para diferentes vistas */}
            <Paper sx={{ mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Resumen General" />
                    <Tab label="Por Vendedor" />
                    <Tab label="Por Categoría" />
                    <Tab label="Métodos de Pago" />
                </Tabs>

                {/* Tab 1: Resumen General */}
                {tabValue === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Detalle de Ventas</Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Download />}
                                onClick={handleExportar}
                            >
                                Exportar Reporte
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>N° Venta</TableCell>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Vendedor</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Categoría</TableCell>
                                        <TableCell>Productos</TableCell>
                                        <TableCell>Método Pago</TableCell>
                                        <TableCell>Total</TableCell>
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
                                                <Chip
                                                    label={venta.categoria}
                                                    size="small"
                                                    variant="outlined"
                                                />
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
                                                    size="small"
                                                    color="success"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="bold">
                                                    ${venta.total.toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}

                {/* Tab 2: Por Vendedor */}
                {tabValue === 1 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Vendedor</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorVendedor).map(([vendedor, total]) => (
                                <Grid xs={12} sm={6} md={4} key={vendedor}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {vendedor}
                                            </Typography>
                                            <Typography variant="h4" color="primary" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 3: Por Categoría */}
                {tabValue === 2 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Categoría</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorCategoria).map(([categoria, total]) => (
                                <Grid xs={12} sm={6} md={4} key={categoria}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {categoria}
                                            </Typography>
                                            <Typography variant="h4" color="success" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Tab 4: Métodos de Pago */}
                {tabValue === 3 && (
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>Ventas por Método de Pago</Typography>
                        <Grid container spacing={2}>
                            {Object.entries(ventasPorMetodoPago).map(([metodo, total]) => (
                                <Grid xs={12} sm={6} md={4} key={metodo}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight="bold">
                                                {metodo}
                                            </Typography>
                                            <Typography variant="h4" color="info" fontWeight="bold">
                                                ${total.toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Total de ventas
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>

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

export default ReporteVentas; 