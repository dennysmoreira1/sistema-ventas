import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar, Grid, Card, CardContent,
    Avatar, useTheme, useMediaQuery
} from '@mui/material';
import { Add, Edit, Delete, Inventory, Category, Label } from '@mui/icons-material';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingProducto, setEditingProducto] = useState(null);
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        marca: '',
        proveedor: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Datos de ejemplo
    useEffect(() => {
        setProductos([
            {
                id: 1,
                codigo: 'PROD001',
                nombre: 'iPhone 15 Pro',
                descripcion: 'Smartphone de última generación',
                precio: 2500000,
                stock: 15,
                categoria: 'Tecnología',
                marca: 'Apple',
                proveedor: 'Distribuidora ABC',
                estado: 'activo',
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                codigo: 'PROD002',
                nombre: 'Samsung Galaxy S24',
                descripcion: 'Smartphone Android premium',
                precio: 1800000,
                stock: 8,
                categoria: 'Tecnología',
                marca: 'Samsung',
                proveedor: 'Distribuidora ABC',
                estado: 'activo',
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                codigo: 'PROD003',
                nombre: 'Nike Air Max',
                descripcion: 'Zapatillas deportivas',
                precio: 450000,
                stock: 25,
                categoria: 'Ropa',
                marca: 'Nike',
                proveedor: 'Suministros XYZ',
                estado: 'activo',
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                codigo: 'PROD004',
                nombre: 'Laptop HP Pavilion',
                descripcion: 'Computador portátil para trabajo',
                precio: 3200000,
                stock: 0,
                categoria: 'Tecnología',
                marca: 'HP',
                proveedor: 'Distribuidora ABC',
                estado: 'inactivo',
                fechaCreacion: '2024-01-04'
            }
        ]);
    }, []);

    const handleOpenDialog = (producto = null) => {
        if (producto) {
            setEditingProducto(producto);
            setFormData({
                codigo: producto.codigo,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio.toString(),
                stock: producto.stock.toString(),
                categoria: producto.categoria,
                marca: producto.marca,
                proveedor: producto.proveedor,
                estado: producto.estado
            });
        } else {
            setEditingProducto(null);
            setFormData({
                codigo: '',
                nombre: '',
                descripcion: '',
                precio: '',
                stock: '',
                categoria: '',
                marca: '',
                proveedor: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingProducto(null);
        setFormData({
            codigo: '',
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            categoria: '',
            marca: '',
            proveedor: '',
            estado: 'activo'
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.codigo || !formData.nombre || !formData.precio) {
            setError('Los campos código, nombre y precio son obligatorios');
            return;
        }

        if (editingProducto) {
            // Actualizar producto
            setProductos(productos.map(p =>
                p.id === editingProducto.id
                    ? {
                        ...p,
                        codigo: formData.codigo,
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        precio: parseFloat(formData.precio),
                        stock: parseInt(formData.stock),
                        categoria: formData.categoria,
                        marca: formData.marca,
                        proveedor: formData.proveedor,
                        estado: formData.estado
                    }
                    : p
            ));
            setMensaje('Producto actualizado exitosamente');
        } else {
            // Crear nuevo producto
            const nuevoProducto = {
                id: Date.now(),
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock) || 0,
                categoria: formData.categoria,
                marca: formData.marca,
                proveedor: formData.proveedor,
                estado: formData.estado,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setProductos([...productos, nuevoProducto]);
            setMensaje('Producto creado exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje('Producto eliminado exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'error';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const renderCardView = () => (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fill, minmax(300px, 1fr))' } }}>
            {productos.map((producto) => (
                <Card key={producto.id} sx={{ height: 'fit-content' }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                <Inventory />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {producto.nombre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {producto.codigo}
                                </Typography>
                            </Box>
                            <Box>
                                <Chip
                                    label={producto.estado}
                                    color={getEstadoColor(producto.estado)}
                                    size="small"
                                    sx={{ mb: 1 }}
                                />
                                <Chip
                                    label={`Stock: ${producto.stock}`}
                                    color={getStockColor(producto.stock)}
                                    size="small"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                {producto.descripcion}
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                                ${producto.precio.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Category sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                <Typography variant="body2">{producto.categoria}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Label sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                                <Typography variant="body2">{producto.marca}</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="textSecondary">
                                {producto.fechaCreacion}
                            </Typography>
                            <Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(producto)}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(producto.id)}
                                    color="error"
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    const renderTableView = () => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Código</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Categoría</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.map((producto) => (
                        <TableRow key={producto.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 32, height: 32 }}>
                                        <Inventory />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {producto.nombre}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {producto.descripcion}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>{producto.codigo}</TableCell>
                            <TableCell>${producto.precio.toLocaleString()}</TableCell>
                            <TableCell>
                                <Chip
                                    label={producto.stock}
                                    color={getStockColor(producto.stock)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{producto.categoria}</TableCell>
                            <TableCell>{producto.marca}</TableCell>
                            <TableCell>
                                <Chip
                                    label={producto.estado}
                                    color={getEstadoColor(producto.estado)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(producto)}
                                    color="primary"
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(producto.id)}
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
    );

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, height: '100vh', overflow: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Producto
                </Button>
            </Box>

            {isMobile ? renderCardView() : renderTableView()}

            {/* Dialog para agregar/editar producto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Precio"
                            name="precio"
                            type="number"
                            value={formData.precio}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleInputChange}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Categoría"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleInputChange}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Marca"
                            name="marca"
                            value={formData.marca}
                            onChange={handleInputChange}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Proveedor"
                            name="proveedor"
                            value={formData.proveedor}
                            onChange={handleInputChange}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={formData.estado}
                                onChange={handleInputChange}
                                label="Estado"
                            >
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingProducto ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes */}
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

export default Productos; 