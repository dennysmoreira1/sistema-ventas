import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Typography, Divider, Avatar, Chip, IconButton, Menu, MenuItem,
    useTheme, useMediaQuery
} from '@mui/material';
import {
    Dashboard, People, Inventory, ShoppingCart, Assessment, Security,
    AccountCircle, Logout, Settings, Category, Label, LocalShipping,
    TrendingUp, Receipt, Person
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logout, hasPermission } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    const isActive = (path) => pathname === path;

    const menuItems = [
        {
            title: 'GENERAL',
            items: [
                { text: 'Inicio', path: '/', icon: <Dashboard />, permission: null }
            ]
        },
        {
            title: 'GESTIÓN DE USUARIOS',
            items: [
                { text: 'Usuarios', path: '/usuarios', icon: <People />, permission: 'usuarios' },
                { text: 'Vendedores', path: '/vendedores', icon: <People />, permission: 'usuarios' },
                { text: 'Clientes', path: '/clientes', icon: <People />, permission: null },
                { text: 'Proveedores', path: '/proveedores', icon: <LocalShipping />, permission: null }
            ]
        },
        {
            title: 'INVENTARIO',
            items: [
                { text: 'Categorías', path: '/categorias', icon: <Category />, permission: 'productos' },
                { text: 'Marcas', path: '/marcas', icon: <Label />, permission: 'productos' },
                { text: 'Productos', path: '/productos', icon: <Inventory />, permission: 'productos' }
            ]
        },
        {
            title: 'VENTAS',
            items: [
                { text: 'Registro de Ventas', path: '/registro-ventas', icon: <ShoppingCart />, permission: 'ventas' },
                { text: 'Control de Ventas', path: '/control-ventas', icon: <ShoppingCart />, permission: 'ventas' },
                { text: 'Reporte de Ventas', path: '/reporte-ventas', icon: <Assessment />, permission: 'reportes' }
            ]
        },
        {
            title: 'FINANZAS',
            items: [
                { text: 'Salidas / Gastos', path: '/salidas-gastos', icon: <Receipt />, permission: 'configuracion' },
                { text: 'Reporte de Salidas', path: '/reporte-salidas', icon: <TrendingUp />, permission: 'reportes' }
            ]
        },
        {
            title: 'SEGURIDAD',
            items: [
                { text: 'Seguridad', path: '/seguridad', icon: <Security />, permission: 'configuracion' }
            ]
        }
    ];

    const drawerWidth = isMobile ? 240 : 280;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    overflowX: 'hidden'
                }
            }}
        >
            <Box sx={{ p: { xs: 1, md: 2 } }}>
                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    fontWeight="bold"
                    gutterBottom
                    sx={{ fontSize: { xs: '1.1rem', md: '1.5rem' } }}
                >
                    Mi Panel
                </Typography>

                {/* Información del usuario */}
                {user && (
                    <Box sx={{
                        mt: 2,
                        p: { xs: 1, md: 2 },
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderRadius: 1,
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}>
                                <AccountCircle />
                            </Avatar>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="bold"
                                    noWrap
                                    sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                                >
                                    {user.nombre || 'Usuario'}
                                </Typography>
                                <Chip
                                    label={user.rol || 'Usuario'}
                                    size="small"
                                    sx={{
                                        fontSize: { xs: '0.6rem', md: '0.7rem' },
                                        height: { xs: 16, md: 20 },
                                        bgcolor: 'primary.main',
                                        color: 'white'
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Botón de menú de usuario */}
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <IconButton
                                size="small"
                                onClick={handleMenuOpen}
                                sx={{ color: 'white' }}
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
                                        bgcolor: 'white',
                                        '& .MuiMenuItem-root': {
                                            fontSize: '0.875rem'
                                        }
                                    }
                                }}
                            >
                                <MenuItem onClick={() => handleNavigate('/perfil')}>
                                    <Person sx={{ mr: 1, fontSize: '1.2rem' }} />
                                    Perfil
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Logout sx={{ mr: 1, fontSize: '1.2rem' }} />
                                    Cerrar Sesión
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                )}

                <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />

                {/* Navegación */}
                <List sx={{ pt: 0 }}>
                    {menuItems.map((section, sectionIndex) => (
                        <React.Fragment key={sectionIndex}>
                            <Typography
                                variant="caption"
                                sx={{
                                    px: 2,
                                    py: 1,
                                    display: 'block',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {section.title}
                            </Typography>
                            {section.items.map((item, itemIndex) => {
                                // Verificar permisos si es necesario
                                if (item.permission && !hasPermission(item.permission)) {
                                    return null;
                                }

                                return (
                                    <ListItem key={itemIndex} disablePadding sx={{ mb: 0.5 }}>
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            sx={{
                                                borderRadius: 1,
                                                mx: 1,
                                                '&:hover': {
                                                    bgcolor: 'rgba(255,255,255,0.1)',
                                                    transform: 'translateX(5px)',
                                                    transition: 'all 0.3s ease'
                                                },
                                                '&.active': {
                                                    bgcolor: 'primary.main',
                                                    '&:hover': {
                                                        bgcolor: 'primary.dark'
                                                    }
                                                }
                                            }}
                                            className={isActive(item.path) ? 'active' : ''}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                sx={{
                                                    '& .MuiTypography-root': {
                                                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                        fontWeight: isActive(item.path) ? 600 : 400
                                                    }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                            {sectionIndex < menuItems.length - 1 && (
                                <Divider sx={{ my: 1, bgcolor: 'rgba(255,255,255,0.1)' }} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar; 