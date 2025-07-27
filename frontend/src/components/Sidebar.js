import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Typography, Divider, useTheme, useMediaQuery
} from '@mui/material';
import {
    Dashboard, People, Inventory, ShoppingCart, Assessment,
    Category, Label, LocalShipping, TrendingUp, Receipt, Settings,
    Security, History
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Sidebar = () => {
    const { pathname } = useLocation();
    const { hasPermission } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                { text: 'Salidas / Gastos', path: '/salidas-gastos', icon: <Receipt />, permission: 'admin' },
                { text: 'Reporte de Salidas', path: '/reporte-salidas', icon: <TrendingUp />, permission: 'reportes' }
            ]
        },
        // Secciones solo para administradores
        {
            title: 'CONFIGURACIÓN',
            items: [
                { text: 'Configuración General', path: '/configuracion', icon: <Settings />, permission: 'admin' }
            ],
            adminOnly: true
        },
        {
            title: 'SEGURIDAD',
            items: [
                { text: 'Gestión de Permisos', path: '/permisos', icon: <Security />, permission: 'admin' },
                { text: 'Logs de Acceso', path: '/logs', icon: <History />, permission: 'admin' }
            ],
            adminOnly: true
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Logo variant="compact" />
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.5rem' },
                            color: 'white'
                        }}
                    >
                        Mi Panel
                    </Typography>
                </Box>

                {/* Navegación */}
                <List sx={{ pt: 0 }}>
                    {menuItems.map((section, sectionIndex) => {
                        // Solo mostrar la sección si el usuario tiene el permiso requerido o si no es adminOnly
                        const showSection = !section.adminOnly || hasPermission('admin');

                        if (!showSection) {
                            return null;
                        }

                        return (
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
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar; 