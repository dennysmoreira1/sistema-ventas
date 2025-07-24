import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Paper, Card, CardContent, Grid,
    List, ListItem, ListItemIcon, ListItemText, Chip,
    Avatar, LinearProgress, Button
} from '@mui/material';
import {
    TrendingUp, ShoppingCart, People, Inventory, AttachMoney,
    Receipt, Assessment, Security, Notifications, CheckCircle,
    Warning, Error, Info, Dashboard, Star
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Inicio = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [estadisticas] = useState({
        ventas: {
            total: 125,
            monto: 2850000,
            crecimiento: 12.5,
            completadas: 118,
            pendientes: 7
        },
        clientes: {
            total: 342,
            nuevos: 28,
            activos: 315,
            inactivos: 27
        },
        productos: {
            total: 156,
            enStock: 142,
            bajoStock: 14,
            sinStock: 0
        },
        finanzas: {
            ingresos: 2850000,
            gastos: 1250000,
            utilidad: 1600000,
            crecimiento: 8.3
        }
    });

    const [actividadReciente] = useState([
        {
            id: 1,
            tipo: 'venta',
            descripcion: 'Venta completada - Cliente: María González',
            monto: 45000,
            fecha: '2024-01-15 14:30',
            estado: 'completada'
        },
        {
            id: 2,
            tipo: 'cliente',
            descripcion: 'Nuevo cliente registrado - Juan Pérez',
            monto: null,
            fecha: '2024-01-15 13:45',
            estado: 'nuevo'
        },
        {
            id: 3,
            tipo: 'producto',
            descripcion: 'Stock bajo - Producto: Laptop HP',
            monto: null,
            fecha: '2024-01-15 12:20',
            estado: 'advertencia'
        },
        {
            id: 4,
            tipo: 'venta',
            descripcion: 'Venta pendiente - Cliente: Carlos López',
            monto: 32000,
            fecha: '2024-01-15 11:15',
            estado: 'pendiente'
        },
        {
            id: 5,
            tipo: 'finanza',
            descripcion: 'Gasto registrado - Material de oficina',
            monto: -8500,
            fecha: '2024-01-15 10:30',
            estado: 'gasto'
        }
    ]);

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'completada': return 'success';
            case 'pendiente': return 'warning';
            case 'nuevo': return 'info';
            case 'advertencia': return 'warning';
            case 'gasto': return 'error';
            default: return 'default';
        }
    };

    const getEstadoIcon = (estado) => {
        switch (estado) {
            case 'completada': return <CheckCircle />;
            case 'pendiente': return <Warning />;
            case 'nuevo': return <Info />;
            case 'advertencia': return <Warning />;
            case 'gasto': return <Receipt />;
            default: return <Info />;
        }
    };

    // Funciones para las acciones rápidas
    const handleNuevaVenta = () => {
        navigate('/registro-ventas');
    };

    const handleAgregarCliente = () => {
        navigate('/clientes');
    };

    const handleRegistrarProducto = () => {
        navigate('/productos');
    };

    const handleVerReportes = () => {
        navigate('/reporte-ventas');
    };

    const handleVerGastos = () => {
        navigate('/salidas-gastos');
    };

    const handleVerControlVentas = () => {
        navigate('/control-ventas');
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header con bienvenida */}
            <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            ¡Bienvenido, {user?.nombre || 'Usuario'}!
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Panel de control del sistema de gestión de ventas
                        </Typography>
                    </Box>
                    <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.2)' }}>
                        <Dashboard />
                    </Avatar>
                </Box>
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
                                        {estadisticas.ventas.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ventas Totales
                                    </Typography>
                                </Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(estadisticas.ventas.completadas / estadisticas.ventas.total) * 100}
                                sx={{ mt: 1 }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                {estadisticas.ventas.completadas} completadas
                            </Typography>
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
                                        ${(estadisticas.finanzas.ingresos / 1000000).toFixed(1)}M
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ingresos Totales
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" mt={1}>
                                <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                                <Typography variant="caption" color="success.main">
                                    +{estadisticas.finanzas.crecimiento}%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <People sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.clientes.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Clientes Registrados
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                                {estadisticas.clientes.nuevos} nuevos este mes
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Inventory sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.productos.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Productos en Catálogo
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                                {estadisticas.productos.bajoStock} con stock bajo
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Actividad Reciente */}
                <Grid xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Actividad Reciente
                                </Typography>
                            </Box>
                            <List>
                                {actividadReciente.map((actividad) => (
                                    <ListItem key={actividad.id} divider>
                                        <ListItemIcon>
                                            {getEstadoIcon(actividad.estado)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={actividad.descripcion}
                                            secondary={actividad.fecha}
                                        />
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {actividad.monto && (
                                                <Typography variant="body2" fontWeight="bold">
                                                    ${actividad.monto.toLocaleString()}
                                                </Typography>
                                            )}
                                            <Chip
                                                label={actividad.estado}
                                                color={getEstadoColor(actividad.estado)}
                                                size="small"
                                            />
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Resumen Rápido */}
                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Star sx={{ mr: 1, color: 'warning.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Resumen Rápido
                                </Typography>
                            </Box>
                            <List dense>
                                <ListItem>
                                    <ListItemIcon>
                                        <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Ventas del día"
                                        secondary={`${estadisticas.ventas.total} ventas`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <People color="info" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Clientes activos"
                                        secondary={`${estadisticas.clientes.activos} clientes`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Inventory color="warning" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Productos en stock"
                                        secondary={`${estadisticas.productos.enStock} productos`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <AttachMoney color="success" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Utilidad mensual"
                                        secondary={`$${(estadisticas.finanzas.utilidad / 1000000).toFixed(1)}M`}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    {/* Acciones Rápidas */}
                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Acciones Rápidas
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ShoppingCart />}
                                    fullWidth
                                    onClick={handleNuevaVenta}
                                >
                                    Nueva Venta
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<People />}
                                    fullWidth
                                    onClick={handleAgregarCliente}
                                >
                                    Agregar Cliente
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Inventory />}
                                    fullWidth
                                    onClick={handleRegistrarProducto}
                                >
                                    Registrar Producto
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Assessment />}
                                    fullWidth
                                    onClick={handleVerReportes}
                                >
                                    Ver Reportes
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Receipt />}
                                    fullWidth
                                    onClick={handleVerGastos}
                                >
                                    Gestionar Gastos
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<TrendingUp />}
                                    fullWidth
                                    onClick={handleVerControlVentas}
                                >
                                    Control de Ventas
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Inicio; 