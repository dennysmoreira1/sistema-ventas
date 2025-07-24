import React, { useState } from 'react';
import {
    Box, Typography, Paper, Card, CardContent, Grid,
    TextField, Button, FormControl, InputLabel, Select,
    MenuItem, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, Alert, Snackbar
} from '@mui/material';
import {
    TrendingDown, FilterList, Download, Print,
    AttachMoney, Category, Receipt, TrendingUp
} from '@mui/icons-material';

const ReporteSalidas = () => {
    const [filtros, setFiltros] = useState({
        fechaInicio: '',
        fechaFin: '',
        categoria: 'todas',
        proveedor: 'todos',
        estado: 'todos'
    });

    const [estadisticas, setEstadisticas] = useState({
        totalGastos: 45,
        totalMonto: 125000,
        gastosPagados: 38,
        gastosPendientes: 7,
        promedioGasto: 2778,
        gastoMasAlto: 8500,
        gastoMasBajo: 150
    });

    const [gastos] = useState([
        {
            id: 1,
            concepto: 'Material de oficina',
            categoria: 'Oficina',
            monto: 2500,
            fecha: '2024-01-15',
            proveedor: 'Papelería Central',
            metodoPago: 'Transferencia',
            estado: 'pagado'
        },
        {
            id: 2,
            concepto: 'Servicios de internet',
            categoria: 'Tecnología',
            monto: 3500,
            fecha: '2024-01-10',
            proveedor: 'Telecom SA',
            metodoPago: 'Débito automático',
            estado: 'pagado'
        },
        {
            id: 3,
            concepto: 'Mantenimiento de equipos',
            categoria: 'Mantenimiento',
            monto: 8500,
            fecha: '2024-01-08',
            proveedor: 'Técnicos Pro',
            metodoPago: 'Efectivo',
            estado: 'pendiente'
        },
        {
            id: 4,
            concepto: 'Publicidad digital',
            categoria: 'Marketing',
            monto: 4200,
            fecha: '2024-01-12',
            proveedor: 'Ads Digital',
            metodoPago: 'Tarjeta de crédito',
            estado: 'pagado'
        },
        {
            id: 5,
            concepto: 'Seguros empresariales',
            categoria: 'Seguros',
            monto: 6800,
            fecha: '2024-01-05',
            proveedor: 'Seguros Total',
            metodoPago: 'Transferencia',
            estado: 'pagado'
        }
    ]);

    const [mensaje, setMensaje] = useState('');

    const handleFiltroChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleExportar = () => {
        setMensaje('Reporte exportado exitosamente');
        setTimeout(() => setMensaje(''), 3000);
    };

    const handleImprimir = () => {
        setMensaje('Reporte enviado a impresión');
        setTimeout(() => setMensaje(''), 3000);
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'pagado': return 'success';
            case 'pendiente': return 'warning';
            case 'cancelado': return 'error';
            default: return 'default';
        }
    };

    const getCategoriaColor = (categoria) => {
        switch (categoria) {
            case 'Oficina': return 'primary';
            case 'Tecnología': return 'info';
            case 'Marketing': return 'secondary';
            case 'Mantenimiento': return 'warning';
            case 'Seguros': return 'error';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Salidas y Gastos
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
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="categoria"
                                value={filtros.categoria}
                                onChange={handleFiltroChange}
                                label="Categoría"
                            >
                                <MenuItem value="todas">Todas</MenuItem>
                                <MenuItem value="Oficina">Oficina</MenuItem>
                                <MenuItem value="Tecnología">Tecnología</MenuItem>
                                <MenuItem value="Marketing">Marketing</MenuItem>
                                <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                                <MenuItem value="Seguros">Seguros</MenuItem>
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
                                <MenuItem value="pagado">Pagado</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Estadísticas */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Receipt sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.totalGastos}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Gastos
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
                                <AttachMoney sx={{ mr: 2, color: 'error.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        ${estadisticas.totalMonto.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Total Monto
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
                                        ${estadisticas.promedioGasto.toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Promedio por Gasto
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
                                <Category sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.gastosPendientes}
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

            {/* Acciones */}
            <Box display="flex" gap={2} mb={3}>
                <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={handleExportar}
                >
                    Exportar Reporte
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<Print />}
                    onClick={handleImprimir}
                >
                    Imprimir
                </Button>
            </Box>

            {/* Tabla de gastos */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Método Pago</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gastos.map((gasto) => (
                            <TableRow key={gasto.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {gasto.concepto}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={gasto.categoria}
                                        color={getCategoriaColor(gasto.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${gasto.monto.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {new Date(gasto.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {gasto.proveedor}
                                </TableCell>
                                <TableCell>
                                    {gasto.metodoPago}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={gasto.estado}
                                        color={getEstadoColor(gasto.estado)}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

export default ReporteSalidas;
