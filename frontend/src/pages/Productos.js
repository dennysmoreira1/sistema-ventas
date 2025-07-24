import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Avatar
} from '@mui/material';
import { Add, Edit, Delete, Inventory, Search } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

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
            setMensaje('Producto actualizado correctamente');
        } else {
            // Agregar nuevo producto
            const newProducto = {
                id: Date.now(),
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                categoria: formData.categoria,
                marca: formData.marca,
                proveedor: formData.proveedor,
                estado: formData.estado,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setProductos([...productos, newProducto]);
            setMensaje('Producto agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje('Producto eliminado correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'error';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
    <Box sx={{ p: 3 }}>
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>
                                    <Chip
                                        label={producto.codigo}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(producto.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {producto.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                        {producto.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${producto.precio.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.stock}
                                        color={getStockColor(producto.stock)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.categoria}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.marca}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                        {producto.proveedor}
                                    </Typography>
                                </TableCell>
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

            {/* Dialog para agregar/editar producto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Código del producto"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Nombre del producto"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Box>
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
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
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
                                    <MenuItem value="Tecnología">Tecnología</MenuItem>
                                    <MenuItem value="Ropa">Ropa</MenuItem>
                                    <MenuItem value="Oficina">Oficina</MenuItem>
                                    <MenuItem value="Hogar">Hogar</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Marca</InputLabel>
                                <Select
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                    label="Marca"
                                >
                                    <MenuItem value="Apple">Apple</MenuItem>
                                    <MenuItem value="Samsung">Samsung</MenuItem>
                                    <MenuItem value="Nike">Nike</MenuItem>
                                    <MenuItem value="HP">HP</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Proveedor</InputLabel>
                            <Select
                                name="proveedor"
                                value={formData.proveedor}
                                onChange={handleInputChange}
                                label="Proveedor"
                            >
                                <MenuItem value="Distribuidora ABC">Distribuidora ABC</MenuItem>
                                <MenuItem value="Suministros XYZ">Suministros XYZ</MenuItem>
                                <MenuItem value="Comercial Delta">Comercial Delta</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
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
                        {editingProducto ? 'Actualizar' : 'Agregar'}
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

export default Productos; 
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
            setMensaje('Producto actualizado correctamente');
        } else {
            // Agregar nuevo producto
            const newProducto = {
                id: Date.now(),
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                categoria: formData.categoria,
                marca: formData.marca,
                proveedor: formData.proveedor,
                estado: formData.estado,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setProductos([...productos, newProducto]);
            setMensaje('Producto agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje('Producto eliminado correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'error';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
    <Box sx={{ p: 3 }}>
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>
                                    <Chip
                                        label={producto.codigo}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(producto.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {producto.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                        {producto.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${producto.precio.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.stock}
                                        color={getStockColor(producto.stock)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.categoria}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.marca}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                        {producto.proveedor}
                                    </Typography>
                                </TableCell>
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

            {/* Dialog para agregar/editar producto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Código del producto"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Nombre del producto"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Box>
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
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
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
                                    <MenuItem value="Tecnología">Tecnología</MenuItem>
                                    <MenuItem value="Ropa">Ropa</MenuItem>
                                    <MenuItem value="Oficina">Oficina</MenuItem>
                                    <MenuItem value="Hogar">Hogar</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Marca</InputLabel>
                                <Select
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                    label="Marca"
                                >
                                    <MenuItem value="Apple">Apple</MenuItem>
                                    <MenuItem value="Samsung">Samsung</MenuItem>
                                    <MenuItem value="Nike">Nike</MenuItem>
                                    <MenuItem value="HP">HP</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Proveedor</InputLabel>
                            <Select
                                name="proveedor"
                                value={formData.proveedor}
                                onChange={handleInputChange}
                                label="Proveedor"
                            >
                                <MenuItem value="Distribuidora ABC">Distribuidora ABC</MenuItem>
                                <MenuItem value="Suministros XYZ">Suministros XYZ</MenuItem>
                                <MenuItem value="Comercial Delta">Comercial Delta</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
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
                        {editingProducto ? 'Actualizar' : 'Agregar'}
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

export default Productos; 
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
            setMensaje('Producto actualizado correctamente');
        } else {
            // Agregar nuevo producto
            const newProducto = {
                id: Date.now(),
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                categoria: formData.categoria,
                marca: formData.marca,
                proveedor: formData.proveedor,
                estado: formData.estado,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setProductos([...productos, newProducto]);
            setMensaje('Producto agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje('Producto eliminado correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'error';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
    <Box sx={{ p: 3 }}>
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>
                                    <Chip
                                        label={producto.codigo}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(producto.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {producto.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                        {producto.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${producto.precio.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.stock}
                                        color={getStockColor(producto.stock)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.categoria}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.marca}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                        {producto.proveedor}
                                    </Typography>
                                </TableCell>
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

            {/* Dialog para agregar/editar producto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Código del producto"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Nombre del producto"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Box>
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
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
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
                                    <MenuItem value="Tecnología">Tecnología</MenuItem>
                                    <MenuItem value="Ropa">Ropa</MenuItem>
                                    <MenuItem value="Oficina">Oficina</MenuItem>
                                    <MenuItem value="Hogar">Hogar</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Marca</InputLabel>
                                <Select
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                    label="Marca"
                                >
                                    <MenuItem value="Apple">Apple</MenuItem>
                                    <MenuItem value="Samsung">Samsung</MenuItem>
                                    <MenuItem value="Nike">Nike</MenuItem>
                                    <MenuItem value="HP">HP</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Proveedor</InputLabel>
                            <Select
                                name="proveedor"
                                value={formData.proveedor}
                                onChange={handleInputChange}
                                label="Proveedor"
                            >
                                <MenuItem value="Distribuidora ABC">Distribuidora ABC</MenuItem>
                                <MenuItem value="Suministros XYZ">Suministros XYZ</MenuItem>
                                <MenuItem value="Comercial Delta">Comercial Delta</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
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
                        {editingProducto ? 'Actualizar' : 'Agregar'}
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

export default Productos; 
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
            setMensaje('Producto actualizado correctamente');
        } else {
            // Agregar nuevo producto
            const newProducto = {
                id: Date.now(),
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                categoria: formData.categoria,
                marca: formData.marca,
                proveedor: formData.proveedor,
                estado: formData.estado,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setProductos([...productos, newProducto]);
            setMensaje('Producto agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setProductos(productos.filter(p => p.id !== id));
        setMensaje('Producto eliminado correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getStockColor = (stock) => {
        if (stock === 0) return 'error';
        if (stock < 10) return 'warning';
        return 'success';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
    <Box sx={{ p: 3 }}>
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

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>
                                    <Chip
                                        label={producto.codigo}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(producto.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {producto.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                        {producto.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        ${producto.precio.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.stock}
                                        color={getStockColor(producto.stock)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.categoria}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={producto.marca}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                                        {producto.proveedor}
                                    </Typography>
                                </TableCell>
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

            {/* Dialog para agregar/editar producto */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <Box display="flex" gap={2}>
                            <TextField
                                fullWidth
                                label="Código del producto"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Nombre del producto"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                            />
                        </Box>
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
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleInputChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
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
                                    <MenuItem value="Tecnología">Tecnología</MenuItem>
                                    <MenuItem value="Ropa">Ropa</MenuItem>
                                    <MenuItem value="Oficina">Oficina</MenuItem>
                                    <MenuItem value="Hogar">Hogar</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Marca</InputLabel>
                                <Select
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleInputChange}
                                    label="Marca"
                                >
                                    <MenuItem value="Apple">Apple</MenuItem>
                                    <MenuItem value="Samsung">Samsung</MenuItem>
                                    <MenuItem value="Nike">Nike</MenuItem>
                                    <MenuItem value="HP">HP</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Proveedor</InputLabel>
                            <Select
                                name="proveedor"
                                value={formData.proveedor}
                                onChange={handleInputChange}
                                label="Proveedor"
                            >
                                <MenuItem value="Distribuidora ABC">Distribuidora ABC</MenuItem>
                                <MenuItem value="Suministros XYZ">Suministros XYZ</MenuItem>
                                <MenuItem value="Comercial Delta">Comercial Delta</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
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
                        {editingProducto ? 'Actualizar' : 'Agregar'}
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

export default Productos; 