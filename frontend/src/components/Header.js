import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Avatar, Chip, IconButton, Menu, MenuItem, Divider
} from '@mui/material';
import {
    AccountCircle, Logout, Settings, Person
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout, hasPermission } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleMenuClose();
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            height: 64
        }}>
            <Typography variant="h6" fontWeight="bold">
                Sistema de Ventas
            </Typography>

            {user && (
                <Box display="flex" alignItems="center" gap={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <AccountCircle />
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                                {user.nombre || 'Usuario'}
                            </Typography>
                            <Chip
                                label={user.rol || 'Usuario'}
                                size="small"
                                sx={{
                                    fontSize: '0.6rem',
                                    height: 16,
                                    bgcolor: 'primary.main',
                                    color: 'white'
                                }}
                            />
                        </Box>
                    </Box>

                    <IconButton
                        size="small"
                        onClick={handleMenuOpen}
                        sx={{
                            '&:hover': {
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        <Settings fontSize="small" />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                minWidth: 150,
                                '& .MuiMenuItem-root': {
                                    fontSize: '0.875rem'
                                }
                            }
                        }}
                    >
                        {hasPermission('admin') && (
                            <MenuItem onClick={() => handleNavigate('/perfil')}>
                                <Person sx={{ mr: 1, fontSize: '1.2rem' }} />
                                Perfil
                            </MenuItem>
                        )}
                        {hasPermission('admin') && (
                            <MenuItem onClick={() => handleNavigate('/configuracion')}>
                                <Settings sx={{ mr: 1, fontSize: '1.2rem' }} />
                                Configuración
                            </MenuItem>
                        )}
                        {(hasPermission('admin') || hasPermission('configuracion')) && (
                            <Divider />
                        )}
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1, fontSize: '1.2rem' }} />
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Box>
            )}
        </Box>
    );
};

export default Header; 