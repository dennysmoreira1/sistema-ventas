import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCategoria, setEditingCategoria] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setCategorias([
            {
                id: 1,
                nombre: 'Tecnología',
                descripcion: 'Productos tecnológicos y electrónicos',
                estado: 'activo',
                productosAsociados: 25,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Oficina',
                descripcion: 'Artículos de oficina y papelería',
                estado: 'activo',
                productosAsociados: 18,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Ropa',
                descripcion: 'Vestuario y accesorios',
                estado: 'activo',
                productosAsociados: 32,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'Alimentos',
                descripcion: 'Productos alimenticios y bebidas',
                estado: 'inactivo',
                productosAsociados: 0,
                fechaCreacion: '2024-01-04'
            }
        ]);
    }, []);

    const handleOpenDialog = (categoria = null) => {
        if (categoria) {
            setEditingCategoria(categoria);
            setFormData({
                nombre: categoria.nombre,
                descripcion: categoria.descripcion,
                estado: categoria.estado
            });
        } else {
            setEditingCategoria(null);
            setFormData({
                nombre: '',
                descripcion: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCategoria(null);
        setFormData({
            nombre: '',
            descripcion: '',
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
        if (!formData.nombre) {
            setError('El nombre de la categoría es obligatorio');
            return;
        }

        if (editingCategoria) {
            // Actualizar categoría
            setCategorias(categorias.map(c =>
                c.id === editingCategoria.id
                    ? {
                        ...c,
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        estado: formData.estado
                    }
                    : c
            ));
            setMensaje('Categoría actualizada exitosamente');
        } else {
            // Crear nueva categoría
            const nuevaCategoria = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setCategorias([...categorias, nuevaCategoria]);
            setMensaje('Categoría creada exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setCategorias(categorias.filter(c => c.id !== id));
        setMensaje('Categoría eliminada exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Gestión de Categorías
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Nueva Categoría
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.nombre}</TableCell>
                                <TableCell>{categoria.descripcion}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={categoria.estado}
                                        color={getEstadoColor(categoria.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{categoria.productosAsociados}</TableCell>
                                <TableCell>{categoria.fechaCreacion}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(categoria)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(categoria.id)}
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

            {/* Dialog para crear/editar categoría */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="nombre"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            name="estado"
                            value={formData.estado}
                            label="Estado"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="activo">Activo</MenuItem>
                            <MenuItem value="inactivo">Inactivo</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingCategoria ? 'Actualizar' : 'Crear'}
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

export default Categorias; 