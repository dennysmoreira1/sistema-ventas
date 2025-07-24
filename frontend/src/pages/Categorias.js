import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Category } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

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
            setMensaje('Categoría actualizada correctamente');
        } else {
            // Agregar nueva categoría
            const newCategoria = {
                id: Date.now(),
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                estado: formData.estado,
                productosAsociados: 0,
                fechaCreacion: new Date().toISOString().split('T')[0]
            };
            setCategorias([...categorias, newCategoria]);
            setMensaje('Categoría agregada correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        const categoria = categorias.find(c => c.id === id);
        if (categoria.productosAsociados > 0) {
            setError('No se puede eliminar una categoría que tiene productos asociados');
            return;
        }
        setCategorias(categorias.filter(c => c.id !== id));
        setMensaje('Categoría eliminada correctamente');
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Categorías
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Categoría
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Productos Asociados</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Category sx={{ mr: 1, color: 'primary.main' }} />
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {categoria.nombre}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                        {categoria.descripcion}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={categoria.productosAsociados}
                                        color={categoria.productosAsociados > 0 ? 'primary' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(categoria.fechaCreacion).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={categoria.estado}
                                        color={getEstadoColor(categoria.estado)}
                                        size="small"
                                    />
                                </TableCell>
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
                                        disabled={categoria.productosAsociados > 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog para agregar/editar categoría */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre de la categoría"
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
                        {editingCategoria ? 'Actualizar' : 'Agregar'}
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

export default Categorias;
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
        setMensaje('Categoría actualizada correctamente');
    } else {
        // Agregar nueva categoría
        const newCategoria = {
            id: Date.now(),
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            estado: formData.estado,
            productosAsociados: 0,
            fechaCreacion: new Date().toISOString().split('T')[0]
        };
        setCategorias([...categorias, newCategoria]);
        setMensaje('Categoría agregada correctamente');
    }

    handleCloseDialog();
};

const handleDelete = (id) => {
    const categoria = categorias.find(c => c.id === id);
    if (categoria.productosAsociados > 0) {
        setError('No se puede eliminar una categoría que tiene productos asociados');
        return;
    }
    setCategorias(categorias.filter(c => c.id !== id));
    setMensaje('Categoría eliminada correctamente');
};

const getEstadoColor = (estado) => {
    return estado === 'activo' ? 'success' : 'default';
};

return (
    <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
                Gestión de Categorías
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
            >
                Agregar Categoría
            </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Productos Asociados</TableCell>
                        <TableCell>Fecha Creación</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categorias.map((categoria) => (
                        <TableRow key={categoria.id}>
                            <TableCell>{categoria.id}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Category sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {categoria.nombre}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                    {categoria.descripcion}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.productosAsociados}
                                    color={categoria.productosAsociados > 0 ? 'primary' : 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {new Date(categoria.fechaCreacion).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.estado}
                                    color={getEstadoColor(categoria.estado)}
                                    size="small"
                                />
                            </TableCell>
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
                                    disabled={categoria.productosAsociados > 0}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Dialog para agregar/editar categoría */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
                {editingCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre de la categoría"
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
                    {editingCategoria ? 'Actualizar' : 'Agregar'}
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

export default Categorias;
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
        setMensaje('Categoría actualizada correctamente');
    } else {
        // Agregar nueva categoría
        const newCategoria = {
            id: Date.now(),
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            estado: formData.estado,
            productosAsociados: 0,
            fechaCreacion: new Date().toISOString().split('T')[0]
        };
        setCategorias([...categorias, newCategoria]);
        setMensaje('Categoría agregada correctamente');
    }

    handleCloseDialog();
};

const handleDelete = (id) => {
    const categoria = categorias.find(c => c.id === id);
    if (categoria.productosAsociados > 0) {
        setError('No se puede eliminar una categoría que tiene productos asociados');
        return;
    }
    setCategorias(categorias.filter(c => c.id !== id));
    setMensaje('Categoría eliminada correctamente');
};

const getEstadoColor = (estado) => {
    return estado === 'activo' ? 'success' : 'default';
};

return (
    <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
                Gestión de Categorías
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
            >
                Agregar Categoría
            </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Productos Asociados</TableCell>
                        <TableCell>Fecha Creación</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categorias.map((categoria) => (
                        <TableRow key={categoria.id}>
                            <TableCell>{categoria.id}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Category sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {categoria.nombre}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                    {categoria.descripcion}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.productosAsociados}
                                    color={categoria.productosAsociados > 0 ? 'primary' : 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {new Date(categoria.fechaCreacion).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.estado}
                                    color={getEstadoColor(categoria.estado)}
                                    size="small"
                                />
                            </TableCell>
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
                                    disabled={categoria.productosAsociados > 0}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Dialog para agregar/editar categoría */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
                {editingCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre de la categoría"
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
                    {editingCategoria ? 'Actualizar' : 'Agregar'}
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

export default Categorias;
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
        setMensaje('Categoría actualizada correctamente');
    } else {
        // Agregar nueva categoría
        const newCategoria = {
            id: Date.now(),
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            estado: formData.estado,
            productosAsociados: 0,
            fechaCreacion: new Date().toISOString().split('T')[0]
        };
        setCategorias([...categorias, newCategoria]);
        setMensaje('Categoría agregada correctamente');
    }

    handleCloseDialog();
};

const handleDelete = (id) => {
    const categoria = categorias.find(c => c.id === id);
    if (categoria.productosAsociados > 0) {
        setError('No se puede eliminar una categoría que tiene productos asociados');
        return;
    }
    setCategorias(categorias.filter(c => c.id !== id));
    setMensaje('Categoría eliminada correctamente');
};

const getEstadoColor = (estado) => {
    return estado === 'activo' ? 'success' : 'default';
};

return (
    <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
                Gestión de Categorías
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
            >
                Agregar Categoría
            </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Productos Asociados</TableCell>
                        <TableCell>Fecha Creación</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categorias.map((categoria) => (
                        <TableRow key={categoria.id}>
                            <TableCell>{categoria.id}</TableCell>
                            <TableCell>
                                <Box display="flex" alignItems="center">
                                    <Category sx={{ mr: 1, color: 'primary.main' }} />
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {categoria.nombre}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                    {categoria.descripcion}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.productosAsociados}
                                    color={categoria.productosAsociados > 0 ? 'primary' : 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {new Date(categoria.fechaCreacion).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={categoria.estado}
                                    color={getEstadoColor(categoria.estado)}
                                    size="small"
                                />
                            </TableCell>
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
                                    disabled={categoria.productosAsociados > 0}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Dialog para agregar/editar categoría */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
                {editingCategoria ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre de la categoría"
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
                    {editingCategoria ? 'Actualizar' : 'Agregar'}
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

export default Categorias; 