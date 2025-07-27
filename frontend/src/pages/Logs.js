import React, { useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, Chip,
    TextField, FormControl, InputLabel, Select, MenuItem,
    IconButton, Alert, Grid
} from '@mui/material';
import {
    Search, FilterList, Download, Visibility, Block,
    CheckCircle, Warning, Error, Info
} from '@mui/icons-material';

const Logs = () => {
    const [filtros, setFiltros] = useState({
        usuario: '',
        tipo: '',
        fecha: '',
        estado: ''
    });

    const [logs] = useState([
        {
            id: 1,
            usuario: 'admin@empresa.com',
            accion: 'Login exitoso',
            tipo: 'AUTH',
            ip: '192.168.1.100',
            fecha: '2024-01-15 10:30:25',
            estado: 'success',
            detalles: 'Inicio de sesión desde navegador Chrome'
        },
        {
            id: 2,
            usuario: 'juan@empresa.com',
            accion: 'Crear venta',
            tipo: 'VENTA',
            ip: '192.168.1.101',
            fecha: '2024-01-15 10:25:15',
            estado: 'success',
            detalles: 'Nueva venta registrada - ID: V-001'
        },
        {
            id: 3,
            usuario: 'maria@empresa.com',
            accion: 'Acceso denegado',
            tipo: 'AUTH',
            ip: '192.168.1.102',
            fecha: '2024-01-15 10:20:10',
            estado: 'error',
            detalles: 'Contraseña incorrecta'
        },
        {
            id: 4,
            usuario: 'admin@empresa.com',
            accion: 'Modificar producto',
            tipo: 'PRODUCTO',
            ip: '192.168.1.100',
            fecha: '2024-01-15 10:15:30',
            estado: 'success',
            detalles: 'Producto actualizado - ID: P-123'
        },
        {
            id: 5,
            usuario: 'juan@empresa.com',
            accion: 'Eliminar cliente',
            tipo: 'CLIENTE',
            ip: '192.168.1.101',
            fecha: '2024-01-15 10:10:45',
            estado: 'warning',
            detalles: 'Cliente eliminado - ID: C-456'
        },
        {
            id: 6,
            usuario: 'admin@empresa.com',
            accion: 'Exportar reporte',
            tipo: 'REPORTE',
            ip: '192.168.1.100',
            fecha: '2024-01-15 10:05:20',
            estado: 'info',
            detalles: 'Reporte de ventas exportado'
        }
    ]);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'success':
                return 'success';
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'default';
        }
    };

    const getEstadoIcon = (estado) => {
        switch (estado) {
            case 'success':
                return <CheckCircle />;
            case 'error':
                return <Error />;
            case 'warning':
                return <Warning />;
            case 'info':
                return <Info />;
            default:
                return <Info />;
        }
    };

    const getTipoColor = (tipo) => {
        switch (tipo) {
            case 'AUTH':
                return 'primary';
            case 'VENTA':
                return 'success';
            case 'PRODUCTO':
                return 'info';
            case 'CLIENTE':
                return 'warning';
            case 'REPORTE':
                return 'secondary';
            default:
                return 'default';
        }
    };

    const logsFiltrados = logs.filter(log => {
        return (
            log.usuario.toLowerCase().includes(filtros.usuario.toLowerCase()) &&
            (filtros.tipo === '' || log.tipo === filtros.tipo) &&
            (filtros.estado === '' || log.estado === filtros.estado) &&
            (filtros.fecha === '' || log.fecha.includes(filtros.fecha))
        );
    });

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Logs de Acceso
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Registro de actividades y accesos al sistema
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<Download />}
                >
                    Exportar Logs
                </Button>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                    Los logs registran todas las actividades importantes del sistema para auditoría y seguridad.
                </Typography>
            </Alert>

            {/* Filtros */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <FilterList sx={{ mr: 1 }} />
                    <Typography variant="h6">Filtros</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Usuario"
                            name="usuario"
                            value={filtros.usuario}
                            onChange={handleFiltroChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Acción</InputLabel>
                            <Select
                                name="tipo"
                                value={filtros.tipo}
                                onChange={handleFiltroChange}
                                label="Tipo de Acción"
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="AUTH">Autenticación</MenuItem>
                                <MenuItem value="VENTA">Ventas</MenuItem>
                                <MenuItem value="PRODUCTO">Productos</MenuItem>
                                <MenuItem value="CLIENTE">Clientes</MenuItem>
                                <MenuItem value="REPORTE">Reportes</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtros.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="success">Exitoso</MenuItem>
                                <MenuItem value="error">Error</MenuItem>
                                <MenuItem value="warning">Advertencia</MenuItem>
                                <MenuItem value="info">Información</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha"
                            name="fecha"
                            type="date"
                            value={filtros.fecha}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de logs */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Acción</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>IP</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Detalles</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logsFiltrados.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {log.usuario}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {log.accion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={log.tipo}
                                        color={getTipoColor(log.tipo)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="textSecondary">
                                        {log.ip}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {log.fecha}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={log.estado}
                                        color={getEstadoColor(log.estado)}
                                        size="small"
                                        icon={getEstadoIcon(log.estado)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="textSecondary" noWrap sx={{ maxWidth: 200 }}>
                                        {log.detalles}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <IconButton size="small" color="primary">
                                            <Visibility />
                                        </IconButton>
                                        {log.estado === 'error' && (
                                            <IconButton size="small" color="error">
                                                <Block />
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main" fontWeight="bold">
                            {logs.filter(l => l.estado === 'success').length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Acciones Exitosas
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="error.main" fontWeight="bold">
                            {logs.filter(l => l.estado === 'error').length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Errores
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main" fontWeight="bold">
                            {logs.filter(l => l.estado === 'warning').length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Advertencias
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main" fontWeight="bold">
                            {logs.length}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Total de Logs
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Logs; 