import React from 'react';
import { Box, Typography } from '@mui/material';
import { Store, TrendingUp } from '@mui/icons-material';

const Logo = ({ variant = 'default' }) => {
    if (variant === 'compact') {
        return (
            <Box display="flex" alignItems="center" gap={1}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #1565c0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <Store sx={{ color: 'white', fontSize: 18 }} />
                </Box>
            </Box>
        );
    }

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #1565c0',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Store sx={{ color: 'white', fontSize: 22 }} />

                {/* Punto de venta */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: '#ff9800',
                        border: '1px solid white'
                    }}
                />

                {/* Gráfico de barras pequeñas */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 2,
                        left: 2,
                        display: 'flex',
                        gap: 0.5,
                        alignItems: 'flex-end',
                        height: 8
                    }}
                >
                    <Box sx={{ width: 1, height: 3, bgcolor: '#4caf50', borderRadius: 0.5 }} />
                    <Box sx={{ width: 1, height: 5, bgcolor: '#4caf50', borderRadius: 0.5 }} />
                    <Box sx={{ width: 1, height: 2, bgcolor: '#4caf50', borderRadius: 0.5 }} />
                    <Box sx={{ width: 1, height: 6, bgcolor: '#4caf50', borderRadius: 0.5 }} />
                </Box>
            </Box>

            <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
                    Sistema de Ventas
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TrendingUp sx={{ fontSize: 12 }} />
                    Gestión Completa
                </Typography>
            </Box>
        </Box>
    );
};

export default Logo; 