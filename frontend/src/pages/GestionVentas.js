import React, { useState, useEffect } from 'react';
import {
    Box, Paper, Typography, Button, TextField, Select, MenuItem, Alert, IconButton, Divider, InputLabel, FormControl, Snackbar, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import { Add, RemoveCircle, Search, ShoppingCart, Delete, CheckCircle } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const GestionVentas = () => {
    // Estados para los campos del formulario
    const [clienteDoc, setClienteDoc] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [documento, setDocumento] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [metodoPago, setMetodoPago] = useState('Efectivo');
    const [descuento, setDescuento] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');

    // Cargar productos al inicio
    useEffect(() => {
        fetch(`${API_URL}/productos`)
            .then(res => res.json())
            .then(data => setProductos(data));
    }, []);

    // Buscar cliente por documento
    const buscarCliente = async () => {
        setError('');
        setMensaje('');
        if (!clienteDoc) return;
        try {
            const res = await fetch(`${API_URL}/clientes/buscar?documento=${clienteDoc}`);
            if (!res.ok) throw new Error('Cliente no encontrado');
            const data = await res.json();
            setNombreCliente(data.nombre);
            setDocumento(data.documento);
            setSnackbarType('success');
            setMensaje('Cliente encontrado');
            setOpenSnackbar(true);
        } catch (err) {
            setNombreCliente('');
            setDocumento('');
            setSnackbarType('error');
            setMensaje('Cliente no encontrado');
            setOpenSnackbar(true);
        }
    };

    // Agregar producto al carrito
    const agregarProducto = () => {
        setError('');
        setMensaje('');
        if (!productoSeleccionado || cantidad < 1) return;
        const prod = productos.find(p => p.id === parseInt(productoSeleccionado));
        if (!prod) return;
        const existe = carrito.find(p => p.id === prod.id);
        if (existe) {
            setCarrito(carrito.map(p => p.id === prod.id ? { ...p, cantidad: p.cantidad + parseInt(cantidad) } : p));
        } else {
            setCarrito([...carrito, { ...prod, cantidad: parseInt(cantidad) }]);
        }
        setProductoSeleccionado('');
        setCantidad(1);
        setSnackbarType('success');
        setMensaje('Producto agregado al carrito');
        setOpenSnackbar(true);
    };

    // Quitar producto del carrito
    const quitarProducto = (id) => {
        setCarrito(carrito.filter(p => p.id !== id));
        setSnackbarType('info');
        setMensaje('Producto eliminado del carrito');
        setOpenSnackbar(true);
    };

    // Registrar venta
    const registrarVenta = async () => {
        setError('');
        setMensaje('');
        if (!nombreCliente || !documento || carrito.length === 0) {
            setSnackbarType('error');
            setMensaje('Completa los datos del cliente y agrega productos.');
            setOpenSnackbar(true);
            return;
        }
        const venta = {
            cliente: { nombre: nombreCliente, documento },
            fechaVencimiento,
            metodoPago,
            descuento: parseFloat(descuento),
            productos: carrito,
            total: subtotal - descuentoTotal
        };
        try {
            const res = await fetch(`${API_URL}/ventas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(venta)
            });
            if (!res.ok) throw new Error('Error al registrar venta');
            setSnackbarType('success');
            setMensaje('¡Venta registrada exitosamente!');
            setOpenSnackbar(true);
            limpiarFormulario();
        } catch (err) {
            setSnackbarType('error');
            setMensaje('Error al registrar venta');
            setOpenSnackbar(true);
        }
    };

    // Limpiar formulario
    const limpiarFormulario = () => {
        setClienteDoc('');
        setNombreCliente('');
        setDocumento('');
        setFechaVencimiento('');
        setMetodoPago('Efectivo');
        setDescuento(0);
        setCarrito([]);
        setProductoSeleccionado('');
        setCantidad(1);
    };

    // Cálculos
    const subtotal = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    const descuentoTotal = subtotal * (descuento / 100);
    const totalFinal = subtotal - descuentoTotal;

    return (
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Paper elevation={3} sx={{ p: 3, flex: 2, minWidth: 350, maxWidth: 600 }}>
                <Typography variant="h5" fontWeight="bold" mb={2} display="flex" alignItems="center" gap={1}>
                    <ShoppingCart color="primary" /> Gestión de Ventas
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                    Ingresa los datos del cliente, agrega productos y registra la venta.
                </Alert>
                <Box component="form" autoComplete="off" onSubmit={e => e.preventDefault()}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            label="Buscar Cliente por Documento"
                            value={clienteDoc}
                            onChange={e => setClienteDoc(e.target.value)}
                            size="small"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" startIcon={<Search />} onClick={buscarCliente} sx={{ minWidth: 120 }}>
                            Buscar
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            label="Nombre del cliente"
                            value={nombreCliente}
                            InputProps={{ readOnly: true }}
                            size="small"
                            fullWidth
                        />
                        <TextField
                            label="Documento encontrado"
                            value={documento}
                            InputProps={{ readOnly: true }}
                            size="small"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            label="Fecha de vencimiento"
                            type="date"
                            value={fechaVencimiento}
                            onChange={e => setFechaVencimiento(e.target.value)}
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <FormControl size="small" fullWidth>
                            <InputLabel>Método de pago</InputLabel>
                            <Select
                                label="Método de pago"
                                value={metodoPago}
                                onChange={e => setMetodoPago(e.target.value)}
                            >
                                <MenuItem value="Efectivo">Efectivo</MenuItem>
                                <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                                <MenuItem value="Transferencia">Transferencia</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Descuento global (%)"
                            type="number"
                            inputProps={{ min: 0, max: 100 }}
                            value={descuento}
                            onChange={e => setDescuento(e.target.value)}
                            size="small"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Producto</InputLabel>
                            <Select
                                label="Producto"
                                value={productoSeleccionado}
                                onChange={e => setProductoSeleccionado(e.target.value)}
                            >
                                <MenuItem value="">Selecciona un producto</MenuItem>
                                {productos.map(p => (
                                    <MenuItem key={p.id} value={p.id}>{p.nombre} (${p.precio})</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Cantidad"
                            type="number"
                            inputProps={{ min: 1 }}
                            value={cantidad}
                            onChange={e => setCantidad(e.target.value)}
                            size="small"
                            sx={{ width: 100 }}
                        />
                        <Button variant="contained" color="success" startIcon={<Add />} onClick={agregarProducto}>
                            Agregar
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" mb={1} display="flex" alignItems="center" gap={1}>
                    <ShoppingCart fontSize="small" /> Mi Carrito
                </Typography>
                {carrito.length === 0 ? (
                    <Alert severity="warning">No hay productos seleccionados.</Alert>
                ) : (
                    <List>
                        {carrito.map((prod, idx) => (
                            <ListItem key={idx} secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => quitarProducto(prod.id)}>
                                    <Delete />
                                </IconButton>
                            }>
                                <ListItemText
                                    primary={`${prod.nombre} x${prod.cantidad}`}
                                    secondary={`$${prod.precio} c/u`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography>Subtotal: <b>${subtotal.toFixed(2)}</b></Typography>
                    <Typography>Descuento: <b>-${descuentoTotal.toFixed(2)}</b></Typography>
                    <Typography color="primary.main" fontWeight="bold">Total Final: ${totalFinal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button variant="contained" color="success" startIcon={<CheckCircle />} onClick={registrarVenta}>
                        Registrar Venta
                    </Button>
                    <Button variant="outlined" color="primary" onClick={limpiarFormulario}>
                        Limpiar Formulario
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ p: 3, flex: 1, minWidth: 300 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Comprobante de Pago</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box mb={2}>
                    <Typography><b>Cliente:</b> {nombreCliente || 'No asignado'}</Typography>
                    <Typography><b>Documento:</b> {documento || 'No disponible'}</Typography>
                    <Typography><b>Pago:</b> {metodoPago}</Typography>
                    <Typography><b>Válido hasta:</b> {fechaVencimiento || '-'}</Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography fontWeight="bold">Productos:</Typography>
                {carrito.length === 0 ? (
                    <Typography color="text.secondary">No hay productos seleccionados.</Typography>
                ) : (
                    <List dense>
                        {carrito.map((prod, idx) => (
                            <ListItem key={idx}>
                                <ListItemText primary={`${prod.nombre} x${prod.cantidad}`} />
                            </ListItem>
                        ))}
                    </List>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography>Subtotal: <b>${subtotal.toFixed(2)}</b></Typography>
                <Typography>Descuento: <b>-${descuentoTotal.toFixed(2)}</b></Typography>
                <Typography color="success.main" fontWeight="bold">Total a pagar: ${totalFinal.toFixed(2)}</Typography>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType} sx={{ width: '100%' }}>
                    {mensaje}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default GestionVentas; 