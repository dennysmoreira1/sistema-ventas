import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Chip, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material';

const API_URL = 'http://localhost:4000/api';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        rol: 'usuario',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Datos de ejemplo
    useEffect(() => {
        setUsuarios([
            { id: 1, nombre: 'Admin Principal', email: 'admin@empresa.com', rol: 'admin', estado: 'activo' },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'vendedor', estado: 'activo' },
            { id: 3, nombre: 'María García', email: 'maria@empresa.com', rol: 'usuario', estado: 'inactivo' }
        ]);
    }, []);

    const handleOpenDialog = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                password: '',
                confirmPassword: ''
            });
        } else {
            setEditingUser(null);
            setFormData({
                nombre: '',
                email: '',
                rol: 'usuario',
                password: '',
                confirmPassword: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUser(null);
        setFormData({
            nombre: '',
            email: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (editingUser) {
            // Actualizar usuario
            setUsuarios(usuarios.map(u =>
                u.id === editingUser.id
                    ? { ...u, nombre: formData.nombre, email: formData.email, rol: formData.rol }
                    : u
            ));
            setMensaje('Usuario actualizado correctamente');
        } else {
            // Agregar nuevo usuario
            const newUser = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                estado: 'activo'
            };
            setUsuarios([...usuarios, newUser]);
            setMensaje('Usuario agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
        setMensaje('Usuario eliminado correctamente');
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'admin': return 'error';
            case 'vendedor': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Usuario
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.rol}
                                        color={getRolColor(usuario.rol)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.estado}
                                        color={getEstadoColor(usuario.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(usuario)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(usuario.id)}
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

            {/* Dialog para agregar/editar usuario */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                                label="Rol"
                            >
                                <MenuItem value="usuario">Usuario</MenuItem>
                                <MenuItem value="vendedor">Vendedor</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        {!editingUser && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirmar contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingUser ? 'Actualizar' : 'Agregar'}
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

export default Usuarios; 
        nombre: '',
        email: '',
        rol: 'usuario',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Datos de ejemplo
    useEffect(() => {
        setUsuarios([
            { id: 1, nombre: 'Admin Principal', email: 'admin@empresa.com', rol: 'admin', estado: 'activo' },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'vendedor', estado: 'activo' },
            { id: 3, nombre: 'María García', email: 'maria@empresa.com', rol: 'usuario', estado: 'inactivo' }
        ]);
    }, []);

    const handleOpenDialog = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                password: '',
                confirmPassword: ''
            });
        } else {
            setEditingUser(null);
            setFormData({
                nombre: '',
                email: '',
                rol: 'usuario',
                password: '',
                confirmPassword: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUser(null);
        setFormData({
            nombre: '',
            email: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (editingUser) {
            // Actualizar usuario
            setUsuarios(usuarios.map(u =>
                u.id === editingUser.id
                    ? { ...u, nombre: formData.nombre, email: formData.email, rol: formData.rol }
                    : u
            ));
            setMensaje('Usuario actualizado correctamente');
        } else {
            // Agregar nuevo usuario
            const newUser = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                estado: 'activo'
            };
            setUsuarios([...usuarios, newUser]);
            setMensaje('Usuario agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
        setMensaje('Usuario eliminado correctamente');
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'admin': return 'error';
            case 'vendedor': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Usuario
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.rol}
                                        color={getRolColor(usuario.rol)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.estado}
                                        color={getEstadoColor(usuario.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(usuario)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(usuario.id)}
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

            {/* Dialog para agregar/editar usuario */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                                label="Rol"
                            >
                                <MenuItem value="usuario">Usuario</MenuItem>
                                <MenuItem value="vendedor">Vendedor</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        {!editingUser && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirmar contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingUser ? 'Actualizar' : 'Agregar'}
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

export default Usuarios; 
        nombre: '',
        email: '',
        rol: 'usuario',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Datos de ejemplo
    useEffect(() => {
        setUsuarios([
            { id: 1, nombre: 'Admin Principal', email: 'admin@empresa.com', rol: 'admin', estado: 'activo' },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'vendedor', estado: 'activo' },
            { id: 3, nombre: 'María García', email: 'maria@empresa.com', rol: 'usuario', estado: 'inactivo' }
        ]);
    }, []);

    const handleOpenDialog = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                password: '',
                confirmPassword: ''
            });
        } else {
            setEditingUser(null);
            setFormData({
                nombre: '',
                email: '',
                rol: 'usuario',
                password: '',
                confirmPassword: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUser(null);
        setFormData({
            nombre: '',
            email: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (editingUser) {
            // Actualizar usuario
            setUsuarios(usuarios.map(u =>
                u.id === editingUser.id
                    ? { ...u, nombre: formData.nombre, email: formData.email, rol: formData.rol }
                    : u
            ));
            setMensaje('Usuario actualizado correctamente');
        } else {
            // Agregar nuevo usuario
            const newUser = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                estado: 'activo'
            };
            setUsuarios([...usuarios, newUser]);
            setMensaje('Usuario agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
        setMensaje('Usuario eliminado correctamente');
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'admin': return 'error';
            case 'vendedor': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Usuario
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.rol}
                                        color={getRolColor(usuario.rol)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.estado}
                                        color={getEstadoColor(usuario.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(usuario)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(usuario.id)}
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

            {/* Dialog para agregar/editar usuario */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                                label="Rol"
                            >
                                <MenuItem value="usuario">Usuario</MenuItem>
                                <MenuItem value="vendedor">Vendedor</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        {!editingUser && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirmar contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingUser ? 'Actualizar' : 'Agregar'}
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

export default Usuarios; 
        nombre: '',
        email: '',
        rol: 'usuario',
        password: '',
        confirmPassword: ''
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Datos de ejemplo
    useEffect(() => {
        setUsuarios([
            { id: 1, nombre: 'Admin Principal', email: 'admin@empresa.com', rol: 'admin', estado: 'activo' },
            { id: 2, nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'vendedor', estado: 'activo' },
            { id: 3, nombre: 'María García', email: 'maria@empresa.com', rol: 'usuario', estado: 'inactivo' }
        ]);
    }, []);

    const handleOpenDialog = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                password: '',
                confirmPassword: ''
            });
        } else {
            setEditingUser(null);
            setFormData({
                nombre: '',
                email: '',
                rol: 'usuario',
                password: '',
                confirmPassword: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUser(null);
        setFormData({
            nombre: '',
            email: '',
            rol: 'usuario',
            password: '',
            confirmPassword: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.nombre || !formData.email) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (!editingUser && (!formData.password || formData.password !== formData.confirmPassword)) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (editingUser) {
            // Actualizar usuario
            setUsuarios(usuarios.map(u =>
                u.id === editingUser.id
                    ? { ...u, nombre: formData.nombre, email: formData.email, rol: formData.rol }
                    : u
            ));
            setMensaje('Usuario actualizado correctamente');
        } else {
            // Agregar nuevo usuario
            const newUser = {
                id: Date.now(),
                nombre: formData.nombre,
                email: formData.email,
                rol: formData.rol,
                estado: 'activo'
            };
            setUsuarios([...usuarios, newUser]);
            setMensaje('Usuario agregado correctamente');
        }

        handleCloseDialog();
    };

    const handleDelete = (id) => {
        setUsuarios(usuarios.filter(u => u.id !== id));
        setMensaje('Usuario eliminado correctamente');
    };

    const getRolColor = (rol) => {
        switch (rol) {
            case 'admin': return 'error';
            case 'vendedor': return 'warning';
            default: return 'default';
        }
    };

    const getEstadoColor = (estado) => {
        return estado === 'activo' ? 'success' : 'default';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Agregar Usuario
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.rol}
                                        color={getRolColor(usuario.rol)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={usuario.estado}
                                        color={getEstadoColor(usuario.estado)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(usuario)}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(usuario.id)}
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

            {/* Dialog para agregar/editar usuario */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Rol</InputLabel>
                            <Select
                                name="rol"
                                value={formData.rol}
                                onChange={handleInputChange}
                                label="Rol"
                            >
                                <MenuItem value="usuario">Usuario</MenuItem>
                                <MenuItem value="vendedor">Vendedor</MenuItem>
                                <MenuItem value="admin">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        {!editingUser && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Confirmar contraseña"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingUser ? 'Actualizar' : 'Agregar'}
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

export default Usuarios; 