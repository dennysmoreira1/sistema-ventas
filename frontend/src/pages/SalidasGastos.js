import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Grid,
    Card, CardContent
} from '@mui/material';
import {
    Add, Edit, Delete, Visibility, FilterList,
    TrendingDown, AttachMoney, Category, Receipt
} from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const SalidasGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingGasto, setEditingGasto] = useState(null);
    const [formData, setFormData] = useState({
        concepto: '',
        monto: '',
        categoria: '',
        fecha: '',
        proveedor: '',
        metodoPago: 'Efectivo',
        estado: 'pendiente'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setGastos([
            {
                id: 1,
                concepto: 'Compra de productos',
                monto: 2500000,
                categoria: 'Inventario',
                fecha: '2024-01-15',
                proveedor: 'Distribuidora ABC',
                metodoPago: 'Transferencia',
                estado: 'pagado',
                descripcion: 'Compra de productos tecnológicos para inventario'
            },
            {
                id: 2,
                concepto: 'Servicios de internet',
                monto: 150000,
                categoria: 'Servicios',
                fecha: '2024-01-14',
                proveedor: 'Empresa de Telecomunicaciones',
                metodoPago: 'Tarjeta',
                estado: 'pagado',
                descripcion: 'Pago mensual de servicios de internet'
            },
            {
                id: 3,
                concepto: 'Mantenimiento de equipos',
                monto: 320000,
                categoria: 'Mantenimiento',
                fecha: '2024-01-13',
                proveedor: 'Servicios Técnicos XYZ',
                metodoPago: 'Efectivo',
                estado: 'pendiente',
                descripcion: 'Mantenimiento preventivo de equipos de cómputo'
            },
            {
                id: 4,
                concepto: 'Publicidad y marketing',
                monto: 450000,
                categoria: 'Marketing',
                fecha: '2024-01-12',
                proveedor: 'Agencia Publicitaria',
                metodoPago: 'Transferencia',
                estado: 'pendiente',
                descripcion: 'Campaña publicitaria en redes sociales'
            }
        ]);
    }, []);

    const handleOpenDialog = (gasto = null) => {
        if (gasto) {
            setEditingGasto(gasto);
            setFormData({
                concepto: gasto.concepto,
                monto: gasto.monto.toString(),
                categoria: gasto.categoria,
                fecha: gasto.fecha,
                proveedor: gasto.proveedor,
                metodoPago: gasto.metodoPago,
                estado: gasto.estado,
                descripcion: gasto.descripcion
            });
        } else {
            setEditingGasto(null);
            setFormData({
                concepto: '',
                monto: '',
                categoria: '',
                fecha: new Date().toISOString().split('T')[0],
                proveedor: '',
                metodoPago: 'Efectivo',
                estado: 'pendiente',
                descripcion: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingGasto(null);
        setFormData({
            concepto: '',
            monto: '',
            categoria: '',
            fecha: new Date().toISOString().split('T')[0],
            proveedor: '',
            metodoPago: 'Efectivo',
            estado: 'pendiente',
            descripcion: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.concepto || !formData.monto || !formData.categoria) {
            setError('Los campos concepto, monto y categoría son obligatorios');
            return;
        }

        if (editingGasto) {
            // Actualizar gasto
            setGastos(gastos.map(g =>
                g.id === editingGasto.id
                    ? {
                        ...g,
                        concepto: formData.concepto,
                        monto: parseFloat(formData.monto),
                        categoria: formData.categoria,
                        fecha: formData.fecha,
                        proveedor: formData.proveedor,
                        metodoPago: formData.metodoPago,
                        estado: formData.estado,
                        descripcion: formData.descripcion
                    }
                    : g
            ));
            setMensaje('Gasto actualizado correctamente');
        } else {
            // Agregar nuevo gasto
            const newGasto = {
                id: Date.now(),
                concepto: formData.concepto,
                monto: parseFloat(formData.monto),
                categoria: formData.categoria,
                fecha: formData.fecha,
                proveedor: formData.proveedor,
                metodoPago: formData.metodoPago,
                estado: formData.estado,
                descripcion: formData.descripcion
            };
            setGastos([...gastos, newGasto]);
            setMensaje('Gasto agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setGastos(gastos.filter(g => g.id !== id));
        setMensaje('Gasto eliminado correctamente');
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
            case 'Inventario': return 'primary';
            case 'Servicios': return 'secondary';
            case 'Mantenimiento': return 'warning';
            case 'Marketing': return 'info';
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

    const estadisticas = {
        totalGastos: gastos.length,
        totalMonto: gastos.reduce((sum, g) => sum + g.monto, 0),
        gastosPagados: gastos.filter(g => g.estado === 'pagado').length,
        gastosPendientes: gastos.filter(g => g.estado === 'pendiente').length
    };

    return (
        <Box sx={{
            p: 3,
            transform: 'scale(0.9)',
            transformOrigin: 'top left',
            width: '111.11%', // Compensar el scale
            height: '111.11%' // Compensar el scale
        }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Salidas y Gastos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Gasto
                </Button>
            </Box>

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
                                <TrendingDown sx={{ mr: 2, color: 'error.main' }} />
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
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {estadisticas.gastosPagados}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Pagados
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
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gastos.map((gasto) => (
                            <TableRow key={gasto.id}>
                                <TableCell>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {gasto.concepto}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" noWrap sx={{ maxWidth: 200 }}>
                                            {gasto.descripcion}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={gasto.categoria}
                                        color={getCategoriaColor(gasto.categoria)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold" color="error">
                                        ${gasto.monto.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {new Date(gasto.fecha).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                        {gasto.proveedor}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={gasto.metodoPago}
                                        color={getMetodoPagoColor(gasto.metodoPago)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={gasto.estado}
                                        color={getEstadoColor(gasto.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(gasto)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(gasto.id)}
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

            {/* Dialog para agregar/editar gasto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingGasto ? 'Editar Gasto' : 'Agregar Nuevo Gasto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Concepto del gasto"
                            name="concepto"
                            value={formData.concepto}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Monto"
                                name="monto"
                                type="number"
                                value={formData.monto}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Fecha"
                                name="fecha"
                                type="date"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box display="flex" gap={2}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleInputChange}
                                    label="Categoría"
                                >
                                    <MenuItem value="Inventario">Inventario</MenuItem>
                                    <MenuItem value="Servicios">Servicios</MenuItem>
                                    <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                    <MenuItem value="Personal">Personal</MenuItem>
                                    <MenuItem value="Otros">Otros</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Método de Pago</InputLabel>
                                <Select
                                    name="metodoPago"
                                    value={formData.metodoPago}
                                    onChange={handleInputChange}
                                    label="Método de Pago"
                                >
                                    <MenuItem value="Efectivo">Efectivo</MenuItem>
                                    <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                                    <MenuItem value="Transferencia">Transferencia</MenuItem>
                                    <MenuItem value="Cheque">Cheque</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            fullWidth
                            label="Proveedor"
                            name="proveedor"
                            value={formData.proveedor}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={formData.estado}
                                onChange={handleInputChange}
                                label="Estado"
                            >
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="pagado">Pagado</MenuItem>
                                <MenuItem value="cancelado">Cancelado</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingGasto ? 'Actualizar' : 'Agregar'}
                    </Button>
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

            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SalidasGastos; 