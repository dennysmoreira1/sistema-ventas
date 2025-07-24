import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const Marcas = () => {
    const [marcas, setMarcas] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingMarca, setEditingMarca] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        pais: '',
        estado: 'activo'
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Datos de ejemplo
    useEffect(() => {
        setMarcas([
            {
                id: 1,
                nombre: 'Apple',
                descripcion: 'Empresa tecnológica líder en innovación',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 25,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Samsung',
                descripcion: 'Empresa surcoreana de tecnología',
                pais: 'Corea del Sur',
                estado: 'activo',
                productosAsociados: 18,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Nike',
                descripcion: 'Empresa de calzado y ropa deportiva',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 32,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'HP',
                descripcion: 'Empresa de tecnología informática',
                pais: 'Estados Unidos',
                estado: 'inactivo',
                productosAsociados: 0,
                fechaCreacion: '2024-01-04'
            }
        ]);
    }, []);

    const handleOpenDialog = (marca = null) => {
        if (marca) {
            setEditingMarca(marca);
            setFormData({
                nombre: marca.nombre,
                descripcion: marca.descripcion,
                pais: marca.pais,
                estado: marca.estado
            });
        } else {
            setEditingMarca(null);
            setFormData({
                nombre: '',
                descripcion: '',
                pais: '',
                estado: 'activo'
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingMarca(null);
        setFormData({
            nombre: '',
            descripcion: '',
            pais: '',
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
            setError('El nombre de la marca es obligatorio');
            return;
        }

        if (editingMarca) {
            // Actualizar marca
            setMarcas(marcas.map(m =>
                m.id === editingMarca.id
                    ? {
                        ...m,
                        nombre: formData.nombre,
                        descripcion: formData.descripcion,
                        pais: formData.pais,
                        estado: formData.estado
                    }
                    : m
            ));
            setMensaje('Marca actualizada exitosamente');
        } else {
            // Crear nueva marca
            const nuevaMarca = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                pais: formData.pais,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setMarcas([...marcas, nuevaMarca]);
            setMensaje('Marca creada exitosamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setMarcas(marcas.filter(m => m.id !== id));
        setMensaje('Marca eliminada exitosamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'error';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Gestión de Marcas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Nueva Marca
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>País</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca) => (
                            <TableRow key={marca.id}>
                                <TableCell>{marca.nombre}</TableCell>
                                <TableCell>{marca.descripcion}</TableCell>
                                <TableCell>{marca.pais}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.estado}
                                        color={getEstadoColor(marca.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{marca.productosAsociados}</TableCell>
                                <TableCell>{marca.fechaCreacion}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(marca)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(marca.id)}
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

            {/* Dialog para crear/editar marca */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarca ? 'Editar Marca' : 'Nueva Marca'}
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
                    <TextField
                        margin="dense"
                        name="pais"
                        label="País"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.pais}
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
                        {editingMarca ? 'Actualizar' : 'Crear'}
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

export default Marcas; 