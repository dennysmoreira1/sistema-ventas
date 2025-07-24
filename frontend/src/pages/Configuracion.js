import React, { useState } from 'react';
import {
    Box, Typography, Switch, FormControlLabel, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Grid, Alert, Snackbar
} from '@mui/material';
import {
    Settings, Notifications, Brightness4, Brightness7,
    VolumeUp, VolumeOff, Wifi, WifiOff
} from '@mui/icons-material';

const Configuracion = () => {
    const [configuraciones, setConfiguraciones] = useState({
        notificaciones: true,
        temaOscuro: false,
        sonido: true,
        wifi: true
    });
    const [mensaje, setMensaje] = useState('');

    const handleConfigChange = (key, value) => {
        setConfiguraciones(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        setMensaje('Configuración guardada exitosamente');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Configuración del Sistema
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Notificaciones</Typography>
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={configuraciones.notificaciones}
                                    onChange={(e) => handleConfigChange('notificaciones', e.target.checked)}
                                />
                            }
                            label="Activar notificaciones"
                        />
                    </Box>
                </Grid>

                <Grid xs={12} md={6}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Brightness4 sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Tema</Typography>
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={configuraciones.temaOscuro}
                                    onChange={(e) => handleConfigChange('temaOscuro', e.target.checked)}
                                />
                            }
                            label="Tema oscuro"
                        />
                    </Box>
                </Grid>

                <Grid xs={12} md={6}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <VolumeUp sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Sonido</Typography>
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={configuraciones.sonido}
                                    onChange={(e) => handleConfigChange('sonido', e.target.checked)}
                                />
                            }
                            label="Activar sonidos"
                        />
                    </Box>
                </Grid>

                <Grid xs={12} md={6}>
                    <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Wifi sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Conexión</Typography>
                        </Box>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={configuraciones.wifi}
                                    onChange={(e) => handleConfigChange('wifi', e.target.checked)}
                                />
                            }
                            label="Sincronización automática"
                        />
                    </Box>
                </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                    variant="contained"
                    startIcon={<Settings />}
                    onClick={handleSave}
                >
                    Guardar Configuración
                </Button>
            </Box>

            <Snackbar
                open={!!mensaje}
                autoHideDuration={6000}
                onClose={() => setMensaje('')}
            >
                <Alert onClose={() => setMensaje('')} severity="success">
                    {mensaje}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Configuracion; 