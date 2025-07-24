import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Box, Paper, Typography, Avatar, Chip, Grid,
    Card, CardContent, IconButton, Tooltip
} from '@mui/material';
import {
    Person, Email, Security, AccessTime, Logout
} from '@mui/icons-material';

const UserInfo = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrador':
                return 'error';
            case 'Vendedor':
                return 'primary';
            case 'Inventario':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getPermissionChips = () => {
        return user.permisos.map(permiso => (
            <Chip
                key={permiso}
                label={permiso}
                size="small"
                variant="outlined"
                sx={{ mr: 0.5, mb: 0.5 }}
            />
        ));
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                bgcolor: 'primary.main',
                                mr: 2
                            }}
                        >
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {user.nombre}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Security sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Chip
                                    label={user.rol}
                                    color={getRoleColor(user.rol)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Permisos del Sistema
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {getPermissionChips()}
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información de Sesión
                            </Typography>

                            <Box display="flex" alignItems="center" mb={2}>
                                <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Último acceso
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {user.ultimoAcceso || 'Nunca'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                                    ID de Usuario: {user.id}
                                </Typography>
                                <Tooltip title="Cerrar sesión">
                                    <IconButton
                                        size="small"
                                        onClick={logout}
                                        color="error"
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserInfo; 
import { useAuth } from '../context/AuthContext';
import {
    Box, Paper, Typography, Avatar, Chip, Grid,
    Card, CardContent, IconButton, Tooltip
} from '@mui/material';
import {
    Person, Email, Security, AccessTime, Logout
} from '@mui/icons-material';

const UserInfo = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrador':
                return 'error';
            case 'Vendedor':
                return 'primary';
            case 'Inventario':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getPermissionChips = () => {
        return user.permisos.map(permiso => (
            <Chip
                key={permiso}
                label={permiso}
                size="small"
                variant="outlined"
                sx={{ mr: 0.5, mb: 0.5 }}
            />
        ));
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                bgcolor: 'primary.main',
                                mr: 2
                            }}
                        >
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {user.nombre}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Security sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Chip
                                    label={user.rol}
                                    color={getRoleColor(user.rol)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Permisos del Sistema
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {getPermissionChips()}
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información de Sesión
                            </Typography>

                            <Box display="flex" alignItems="center" mb={2}>
                                <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Último acceso
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {user.ultimoAcceso || 'Nunca'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                                    ID de Usuario: {user.id}
                                </Typography>
                                <Tooltip title="Cerrar sesión">
                                    <IconButton
                                        size="small"
                                        onClick={logout}
                                        color="error"
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserInfo; 
import { useAuth } from '../context/AuthContext';
import {
    Box, Paper, Typography, Avatar, Chip, Grid,
    Card, CardContent, IconButton, Tooltip
} from '@mui/material';
import {
    Person, Email, Security, AccessTime, Logout
} from '@mui/icons-material';

const UserInfo = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrador':
                return 'error';
            case 'Vendedor':
                return 'primary';
            case 'Inventario':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getPermissionChips = () => {
        return user.permisos.map(permiso => (
            <Chip
                key={permiso}
                label={permiso}
                size="small"
                variant="outlined"
                sx={{ mr: 0.5, mb: 0.5 }}
            />
        ));
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                bgcolor: 'primary.main',
                                mr: 2
                            }}
                        >
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {user.nombre}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Security sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Chip
                                    label={user.rol}
                                    color={getRoleColor(user.rol)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Permisos del Sistema
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {getPermissionChips()}
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información de Sesión
                            </Typography>

                            <Box display="flex" alignItems="center" mb={2}>
                                <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Último acceso
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {user.ultimoAcceso || 'Nunca'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                                    ID de Usuario: {user.id}
                                </Typography>
                                <Tooltip title="Cerrar sesión">
                                    <IconButton
                                        size="small"
                                        onClick={logout}
                                        color="error"
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserInfo; 
import { useAuth } from '../context/AuthContext';
import {
    Box, Paper, Typography, Avatar, Chip, Grid,
    Card, CardContent, IconButton, Tooltip
} from '@mui/material';
import {
    Person, Email, Security, AccessTime, Logout
} from '@mui/icons-material';

const UserInfo = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    const getRoleColor = (role) => {
        switch (role) {
            case 'Administrador':
                return 'error';
            case 'Vendedor':
                return 'primary';
            case 'Inventario':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getPermissionChips = () => {
        return user.permisos.map(permiso => (
            <Chip
                key={permiso}
                label={permiso}
                size="small"
                variant="outlined"
                sx={{ mr: 0.5, mb: 0.5 }}
            />
        ));
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
                <Grid xs={12} md={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                            sx={{
                                width: 60,
                                height: 60,
                                bgcolor: 'primary.main',
                                mr: 2
                            }}
                        >
                            <Person />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {user.nombre}
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {user.email}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Security sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                <Chip
                                    label={user.rol}
                                    color={getRoleColor(user.rol)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Permisos del Sistema
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {getPermissionChips()}
                        </Box>
                    </Box>
                </Grid>

                <Grid xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información de Sesión
                            </Typography>

                            <Box display="flex" alignItems="center" mb={2}>
                                <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                                <Box>
                                    <Typography variant="body2" color="textSecondary">
                                        Último acceso
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {user.ultimoAcceso || 'Nunca'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
                                    ID de Usuario: {user.id}
                                </Typography>
                                <Tooltip title="Cerrar sesión">
                                    <IconButton
                                        size="small"
                                        onClick={logout}
                                        color="error"
                                    >
                                        <Logout />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UserInfo; 