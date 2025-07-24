import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Typography, Divider, Avatar, Chip, IconButton, Menu, MenuItem,
    Tooltip, useTheme, useMediaQuery
} from '@mui/material';
import {
    Dashboard, People, Inventory, ShoppingCart, Assessment, Security,
    AccountCircle, Logout, Settings, Category, Label, LocalShipping,
    AttachMoney, TrendingUp, Receipt, ExitToApp, Person
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
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {user.nombre}
                                </Typography>
                                <Chip
                                    label={user.rol}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                                        '& .MuiChip-label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                                    maxWidth: '60%',
                                    color: 'rgba(255,255,255,0.7)',
                                    noWrap: true
                                }}
                            >
                                {user.email}
                            </Typography>
                            <Tooltip title="Menú de usuario">
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Logout sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {menuItems.map((section, sectionIndex) => (
                    <Box key={sectionIndex}>
                        <Typography
                            variant="caption"
                            sx={{
                                px: { xs: 1, md: 2 },
                                py: 0.5,
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.6rem', md: '0.75rem' }
                            }}
                        >
                            {section.title}
                        </Typography>

                        <List dense>
                            {section.items.map((item, itemIndex) => {
                                // Verificar permisos
                                if (item.permission && !hasPermission(item.permission)) {
                                    return null;
                                }

                                return (
                                    <ListItem key={itemIndex} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={isActive(item.path)}
                                            sx={{
                                                mx: { xs: 0.5, md: 1 },
                                                borderRadius: 1,
                                                '&.Mui-selected': {
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark'
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                color: 'inherit',
                                                minWidth: { xs: 32, md: 40 },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                                                }
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* Menu de usuario */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200
                    }
                }}
            >
                <MenuItem onClick={() => handleNavigate('/perfil')}>
                    <Person sx={{ mr: 1 }} />
                    Mi Perfil
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/configuracion')}>
                    <Settings sx={{ mr: 1 }} />
                    Configuración
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </Drawer>
    );
};

export default Sidebar; 
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
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {user.nombre}
                                </Typography>
                                <Chip
                                    label={user.rol}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                                        '& .MuiChip-label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                                    maxWidth: '60%',
                                    color: 'rgba(255,255,255,0.7)',
                                    noWrap: true
                                }}
                            >
                                {user.email}
                            </Typography>
                            <Tooltip title="Menú de usuario">
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Logout sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {menuItems.map((section, sectionIndex) => (
                    <Box key={sectionIndex}>
                        <Typography
                            variant="caption"
                            sx={{
                                px: { xs: 1, md: 2 },
                                py: 0.5,
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.6rem', md: '0.75rem' }
                            }}
                        >
                            {section.title}
                        </Typography>

                        <List dense>
                            {section.items.map((item, itemIndex) => {
                                // Verificar permisos
                                if (item.permission && !hasPermission(item.permission)) {
                                    return null;
                                }

                                return (
                                    <ListItem key={itemIndex} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={isActive(item.path)}
                                            sx={{
                                                mx: { xs: 0.5, md: 1 },
                                                borderRadius: 1,
                                                '&.Mui-selected': {
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark'
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                color: 'inherit',
                                                minWidth: { xs: 32, md: 40 },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                                                }
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* Menu de usuario */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200
                    }
                }}
            >
                <MenuItem onClick={() => handleNavigate('/perfil')}>
                    <Person sx={{ mr: 1 }} />
                    Mi Perfil
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/configuracion')}>
                    <Settings sx={{ mr: 1 }} />
                    Configuración
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </Drawer>
    );
};

export default Sidebar; 
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
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {user.nombre}
                                </Typography>
                                <Chip
                                    label={user.rol}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                                        '& .MuiChip-label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                                    maxWidth: '60%',
                                    color: 'rgba(255,255,255,0.7)',
                                    noWrap: true
                                }}
                            >
                                {user.email}
                            </Typography>
                            <Tooltip title="Menú de usuario">
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Logout sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {menuItems.map((section, sectionIndex) => (
                    <Box key={sectionIndex}>
                        <Typography
                            variant="caption"
                            sx={{
                                px: { xs: 1, md: 2 },
                                py: 0.5,
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.6rem', md: '0.75rem' }
                            }}
                        >
                            {section.title}
                        </Typography>

                        <List dense>
                            {section.items.map((item, itemIndex) => {
                                // Verificar permisos
                                if (item.permission && !hasPermission(item.permission)) {
                                    return null;
                                }

                                return (
                                    <ListItem key={itemIndex} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={isActive(item.path)}
                                            sx={{
                                                mx: { xs: 0.5, md: 1 },
                                                borderRadius: 1,
                                                '&.Mui-selected': {
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark'
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                color: 'inherit',
                                                minWidth: { xs: 32, md: 40 },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                                                }
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* Menu de usuario */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200
                    }
                }}
            >
                <MenuItem onClick={() => handleNavigate('/perfil')}>
                    <Person sx={{ mr: 1 }} />
                    Mi Perfil
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/configuracion')}>
                    <Settings sx={{ mr: 1 }} />
                    Configuración
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </Drawer>
    );
};

export default Sidebar; 
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
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {user.nombre}
                                </Typography>
                                <Chip
                                    label={user.rol}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{
                                        fontSize: { xs: '0.6rem', md: '0.75rem' },
                                        '& .MuiChip-label': {
                                            color: 'white'
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: { xs: '0.6rem', md: '0.75rem' },
                                    maxWidth: '60%',
                                    color: 'rgba(255,255,255,0.7)',
                                    noWrap: true
                                }}
                            >
                                {user.email}
                            </Typography>
                            <Tooltip title="Menú de usuario">
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    <Logout sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

            <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                {menuItems.map((section, sectionIndex) => (
                    <Box key={sectionIndex}>
                        <Typography
                            variant="caption"
                            sx={{
                                px: { xs: 1, md: 2 },
                                py: 0.5,
                                display: 'block',
                                color: 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.6rem', md: '0.75rem' }
                            }}
                        >
                            {section.title}
                        </Typography>

                        <List dense>
                            {section.items.map((item, itemIndex) => {
                                // Verificar permisos
                                if (item.permission && !hasPermission(item.permission)) {
                                    return null;
                                }

                                return (
                                    <ListItem key={itemIndex} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={item.path}
                                            selected={isActive(item.path)}
                                            sx={{
                                                mx: { xs: 0.5, md: 1 },
                                                borderRadius: 1,
                                                '&.Mui-selected': {
                                                    backgroundColor: 'primary.main',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark'
                                                    }
                                                },
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                color: 'inherit',
                                                minWidth: { xs: 32, md: 40 },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                                                }
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.text}
                                                primaryTypographyProps={{
                                                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                ))}
            </Box>

            {/* Menu de usuario */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200
                    }
                }}
            >
                <MenuItem onClick={() => handleNavigate('/perfil')}>
                    <Person sx={{ mr: 1 }} />
                    Mi Perfil
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/configuracion')}>
                    <Settings sx={{ mr: 1 }} />
                    Configuración
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ExitToApp sx={{ mr: 1 }} />
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </Drawer>
    );
};

export default Sidebar; 