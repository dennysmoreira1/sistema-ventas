import React, { useState } from 'react';
import {
    Box, Typography, Paper, Card, CardContent, Grid,
    List, ListItem, ListItemIcon, ListItemText, Switch,
    Button, Alert, Snackbar, Divider, Chip
} from '@mui/material';
import {
    Security, Lock, Visibility, VisibilityOff, Shield,
    AdminPanelSettings, Person, Warning, CheckCircle
} from '@mui/icons-material';

const Seguridad = () => {
    const [configuraciones, setConfiguraciones] = useState({
        autenticacionDosFactores: false,
        sesionesMultiples: true,
        tiempoSesion: 24,
        complejidadPassword: 'alta',
        bloqueoIntentos: 3,
        notificacionesSeguridad: true,
        auditoria: true,
        backupAutomatico: true
    });

    const [mensaje, setMensaje] = useState('');

    const handleConfigChange = (key, value) => {
        setConfiguraciones(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveConfig = () => {
        setMensaje('Configuración de seguridad actualizada');
        setTimeout(() => setMensaje(''), 3000);
    };

    const getNivelSeguridad = () => {
        const configs = Object.values(configuraciones);
        const activas = configs.filter(Boolean).length;
        const total = configs.length;
        const porcentaje = (activas / total) * 100;

        if (porcentaje >= 80) return { nivel: 'Alto', color: 'success' };
        if (porcentaje >= 60) return { nivel: 'Medio', color: 'warning' };
        return { nivel: 'Bajo', color: 'error' };
    };

    const nivelSeguridad = getNivelSeguridad();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Configuración de Seguridad
            </Typography>

            {/* Nivel de Seguridad */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                    <Security sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                        Nivel de Seguridad del Sistema
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                        label={`Nivel: ${nivelSeguridad.nivel}`}
                        color={nivelSeguridad.color}
                        variant="outlined"
                        size="large"
                    />
                    <Typography variant="body2" color="textSecondary">
                        El sistema está configurado con medidas de seguridad apropiadas
                    </Typography>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {/* Autenticación */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Lock sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Autenticación
                                </Typography>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Shield />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Autenticación de dos factores"
                                        secondary="Requerir código adicional para login"
                                    />
                                    <Switch
                                        checked={configuraciones.autenticacionDosFactores}
                                        onChange={(e) => handleConfigChange('autenticacionDosFactores', e.target.checked)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Sesiones múltiples"
                                        secondary="Permitir múltiples sesiones simultáneas"
                                    />
                                    <Switch
                                        checked={configuraciones.sesionesMultiples}
                                        onChange={(e) => handleConfigChange('sesionesMultiples', e.target.checked)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Visibility />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Tiempo de sesión"
                                        secondary={`${configuraciones.tiempoSesion} horas`}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contraseñas */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <AdminPanelSettings sx={{ mr: 1, color: 'error.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Políticas de Contraseñas
                                </Typography>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <CheckCircle />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Complejidad requerida"
                                        secondary={`Nivel: ${configuraciones.complejidadPassword}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Warning />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Bloqueo por intentos"
                                        secondary={`${configuraciones.bloqueoIntentos} intentos fallidos`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Security />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Expiración de contraseñas"
                                        secondary="90 días"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Auditoría y Monitoreo */}
                <Grid xs={12}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Visibility sx={{ mr: 1, color: 'info.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Auditoría y Monitoreo
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid xs={12} md={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Registro de auditoría"
                                                secondary="Registrar todas las acciones del sistema"
                                            />
                                            <Switch
                                                checked={configuraciones.auditoria}
                                                onChange={(e) => handleConfigChange('auditoria', e.target.checked)}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Notificaciones de seguridad"
                                                secondary="Alertar sobre actividades sospechosas"
                                            />
                                            <Switch
                                                checked={configuraciones.notificacionesSeguridad}
                                                onChange={(e) => handleConfigChange('notificacionesSeguridad', e.target.checked)}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Backup automático"
                                                secondary="Respaldos automáticos de datos"
                                            />
                                            <Switch
                                                checked={configuraciones.backupAutomatico}
                                                onChange={(e) => handleConfigChange('backupAutomatico', e.target.checked)}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Encriptación de datos"
                                                secondary="Datos encriptados en reposo"
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Acciones */}
            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button
                    variant="contained"
                    onClick={handleSaveConfig}
                    startIcon={<Security />}
                >
                    Guardar Configuración
                </Button>
            </Box>

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
        </Box>
    );
};

export default Seguridad;
