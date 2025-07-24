import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem, Avatar
} from '@mui/material';
import { Add, Edit, Delete, Branding } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

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
                nombre: 'Samsung',
                descripcion: 'Empresa surcoreana de tecnología',
                pais: 'Corea del Sur',
                estado: 'activo',
                productosAsociados: 15,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Apple',
                descripcion: 'Empresa estadounidense de tecnología',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 8,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Nike',
                descripcion: 'Empresa de calzado y ropa deportiva',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 22,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'Adidas',
                descripcion: 'Empresa alemana de calzado deportivo',
                pais: 'Alemania',
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
            setMensaje('Marca actualizada correctamente');
        } else {
            // Agregar nueva marca
            const newMarca = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                pais: formData.pais,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setMarcas([...marcas, newMarca]);
            setMensaje('Marca agregada correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const marca = marcas.find(m => m.id === id);
        if (marca.productosAsociados > 0) {
            setError('No se puede eliminar una marca que tiene productos asociados');
            return;
        }
        setMarcas(marcas.filter(m => m.id !== id));
        setMensaje('Marca eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Marcas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Marca
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>País</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca) => (
                            <TableRow key={marca.id}>
                                <TableCell>{marca.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(marca.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {marca.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {marca.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.pais}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.productosAsociados}
                                        color={marca.productosAsociados > 0 ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(marca.fechaCreacion).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.estado}
                                        color={getEstadoColor(marca.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
                                        disabled={marca.productosAsociados > 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar marca */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarca ? 'Editar Marca' : 'Agregar Nueva Marca'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la marca"
                            name="nombre"
                            value={formData.nombre}
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
                        <TextField
                            fullWidth
                            label="País de origen"
                            name="pais"
                            value={formData.pais}
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
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingMarca ? 'Actualizar' : 'Agregar'}
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

export default Marcas; 
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
                nombre: 'Samsung',
                descripcion: 'Empresa surcoreana de tecnología',
                pais: 'Corea del Sur',
                estado: 'activo',
                productosAsociados: 15,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Apple',
                descripcion: 'Empresa estadounidense de tecnología',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 8,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Nike',
                descripcion: 'Empresa de calzado y ropa deportiva',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 22,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'Adidas',
                descripcion: 'Empresa alemana de calzado deportivo',
                pais: 'Alemania',
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
            setMensaje('Marca actualizada correctamente');
        } else {
            // Agregar nueva marca
            const newMarca = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                pais: formData.pais,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setMarcas([...marcas, newMarca]);
            setMensaje('Marca agregada correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const marca = marcas.find(m => m.id === id);
        if (marca.productosAsociados > 0) {
            setError('No se puede eliminar una marca que tiene productos asociados');
            return;
        }
        setMarcas(marcas.filter(m => m.id !== id));
        setMensaje('Marca eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Marcas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Marca
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>País</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca) => (
                            <TableRow key={marca.id}>
                                <TableCell>{marca.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(marca.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {marca.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {marca.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.pais}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.productosAsociados}
                                        color={marca.productosAsociados > 0 ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(marca.fechaCreacion).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.estado}
                                        color={getEstadoColor(marca.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
                                        disabled={marca.productosAsociados > 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar marca */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarca ? 'Editar Marca' : 'Agregar Nueva Marca'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la marca"
                            name="nombre"
                            value={formData.nombre}
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
                        <TextField
                            fullWidth
                            label="País de origen"
                            name="pais"
                            value={formData.pais}
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
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingMarca ? 'Actualizar' : 'Agregar'}
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

export default Marcas; 
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
                nombre: 'Samsung',
                descripcion: 'Empresa surcoreana de tecnología',
                pais: 'Corea del Sur',
                estado: 'activo',
                productosAsociados: 15,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Apple',
                descripcion: 'Empresa estadounidense de tecnología',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 8,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Nike',
                descripcion: 'Empresa de calzado y ropa deportiva',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 22,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'Adidas',
                descripcion: 'Empresa alemana de calzado deportivo',
                pais: 'Alemania',
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
            setMensaje('Marca actualizada correctamente');
        } else {
            // Agregar nueva marca
            const newMarca = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                pais: formData.pais,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setMarcas([...marcas, newMarca]);
            setMensaje('Marca agregada correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const marca = marcas.find(m => m.id === id);
        if (marca.productosAsociados > 0) {
            setError('No se puede eliminar una marca que tiene productos asociados');
            return;
        }
        setMarcas(marcas.filter(m => m.id !== id));
        setMensaje('Marca eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Marcas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Marca
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>País</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca) => (
                            <TableRow key={marca.id}>
                                <TableCell>{marca.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(marca.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {marca.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {marca.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.pais}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.productosAsociados}
                                        color={marca.productosAsociados > 0 ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(marca.fechaCreacion).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.estado}
                                        color={getEstadoColor(marca.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
                                        disabled={marca.productosAsociados > 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar marca */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarca ? 'Editar Marca' : 'Agregar Nueva Marca'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la marca"
                            name="nombre"
                            value={formData.nombre}
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
                        <TextField
                            fullWidth
                            label="País de origen"
                            name="pais"
                            value={formData.pais}
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
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingMarca ? 'Actualizar' : 'Agregar'}
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

export default Marcas; 
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
                nombre: 'Samsung',
                descripcion: 'Empresa surcoreana de tecnología',
                pais: 'Corea del Sur',
                estado: 'activo',
                productosAsociados: 15,
                fechaCreacion: '2024-01-01'
            },
            {
                id: 2,
                nombre: 'Apple',
                descripcion: 'Empresa estadounidense de tecnología',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 8,
                fechaCreacion: '2024-01-02'
            },
            {
                id: 3,
                nombre: 'Nike',
                descripcion: 'Empresa de calzado y ropa deportiva',
                pais: 'Estados Unidos',
                estado: 'activo',
                productosAsociados: 22,
                fechaCreacion: '2024-01-03'
            },
            {
                id: 4,
                nombre: 'Adidas',
                descripcion: 'Empresa alemana de calzado deportivo',
                pais: 'Alemania',
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
            setMensaje('Marca actualizada correctamente');
        } else {
            // Agregar nueva marca
            const newMarca = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                pais: formData.pais,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setMarcas([...marcas, newMarca]);
            setMensaje('Marca agregada correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const marca = marcas.find(m => m.id === id);
        if (marca.productosAsociados > 0) {
            setError('No se puede eliminar una marca que tiene productos asociados');
            return;
        }
        setMarcas(marcas.filter(m => m.id !== id));
        setMensaje('Marca eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    const getInitials = (nombre) => {
        return nombre.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Marcas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Marca
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>País</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {marcas.map((marca) => (
                            <TableRow key={marca.id}>
                                <TableCell>{marca.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                            {getInitials(marca.nombre)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                {marca.nombre}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {marca.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.pais}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.productosAsociados}
                                        color={marca.productosAsociados > 0 ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(marca.fechaCreacion).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={marca.estado}
                                        color={getEstadoColor(marca.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
                                        disabled={marca.productosAsociados > 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar marca */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarca ? 'Editar Marca' : 'Agregar Nueva Marca'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la marca"
                            name="nombre"
                            value={formData.nombre}
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
                        <TextField
                            fullWidth
                            label="País de origen"
                            name="pais"
                            value={formData.pais}
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
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="inactivo">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingMarca ? 'Actualizar' : 'Agregar'}
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

export default Marcas; 