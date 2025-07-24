import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Grid, Card, CardContent,
    Button, Chip, Alert, Snackbar
} from '@mui/material';
import {
    ShoppingCart, Inventory, People,
    AttachMoney, Assessment
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Inicio = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');

    const estadisticas = {
        ventas: {
            total: 125000,
            porcentaje: 15,
            color: 'success'
        },
        productos: {
            total: 450,
            porcentaje: 8,
            color: 'info'
        },
        clientes: {
            total: 89,
            porcentaje: 12,
            color: 'warning'
        },
        ingresos: {
            total: 89000,
            porcentaje: 22,
            color: 'primary'
        }
    };

    const actividadesRecientes = [
        {
            id: 1,
            tipo: 'venta',
            descripcion: 'Nueva venta registrada',
            monto: 2500,
            hora: '10:30 AM'
        },
        {
            id: 2,
            tipo: 'producto',
            descripcion: 'Producto agregado al inventario',
            monto: null,
            hora: '09:15 AM'
        },
        {
            id: 3,
            tipo: 'cliente',
            descripcion: 'Nuevo cliente registrado',
            monto: null,
            hora: '08:45 AM'
        }
    ];

    const handleCardClick = (ruta) => {
        navigate(ruta);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Bienvenido, {user?.nombre || 'Usuario'}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <ShoppingCart sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Ventas del Mes
                                    </Typography>
                                    <Typography variant="h4" color="success.main">
                                        ${estadisticas.ventas.total.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        +{estadisticas.ventas.porcentaje}% vs mes anterior
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
                                <Inventory sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Productos
                                    </Typography>
                                    <Typography variant="h4" color="info.main">
                                        {estadisticas.productos.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        +{estadisticas.productos.porcentaje}% vs mes anterior
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
                                <People sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Clientes
                                    </Typography>
                                    <Typography variant="h4" color="warning.main">
                                        {estadisticas.clientes.total}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        +{estadisticas.clientes.porcentaje}% vs mes anterior
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
                                <AttachMoney sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Ingresos
                                    </Typography>
                                    <Typography variant="h4" color="primary.main">
                                        ${estadisticas.ingresos.total.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        +{estadisticas.ingresos.porcentaje}% vs mes anterior
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Actividad Reciente
                            </Typography>
                            <Box>
                                {actividadesRecientes.map((actividad) => (
                                    <Box
                                        key={actividad.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1,
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="body1">
                                                {actividad.descripcion}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {actividad.hora}
                                            </Typography>
                                        </Box>
                                        {actividad.monto && (
                                            <Chip
                                                label={`$${actividad.monto}`}
                                                color="success"
                                                size="small"
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Acciones Rápidas
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingCart />}
                                    onClick={() => handleCardClick('/ventas')}
                                    fullWidth
                                >
                                    Nueva Venta
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Inventory />}
                                    onClick={() => handleCardClick('/productos')}
                                    fullWidth
                                >
                                    Gestionar Productos
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<People />}
                                    onClick={() => handleCardClick('/clientes')}
                                    fullWidth
                                >
                                    Ver Clientes
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Assessment />}
                                    onClick={() => handleCardClick('/reportes')}
                                    fullWidth
                                >
                                    Ver Reportes
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

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

export default Inicio; 