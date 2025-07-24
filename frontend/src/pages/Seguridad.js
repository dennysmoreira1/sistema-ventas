import React, { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Card, CardContent, Switch, FormControlLabel,
    Button, TextField, Alert, Snackbar, Dialog, DialogTitle, DialogContent,
    DialogActions
} from '@mui/material';
import {
    Security, Lock, Visibility, VisibilityOff, Save, Cancel,
    Notifications, VpnKey, Shield
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
                    {/* Removed Chip component as per edit hint */}
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
                            {/* Removed List component as per edit hint */}
                            {/* Removed ListItem components as per edit hint */}
                            {/* Removed ListItemIcon components as per edit hint */}
                            {/* Removed ListItemText components as per edit hint */}
                            {/* Removed Switch components as per edit hint */}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contraseñas */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                {/* Removed AdminPanelSettings icon as per edit hint */}
                                <Typography variant="h6" fontWeight="bold">
                                    Políticas de Contraseñas
                                </Typography>
                            </Box>
                            {/* Removed List component as per edit hint */}
                            {/* Removed ListItem components as per edit hint */}
                            {/* Removed ListItemIcon components as per edit hint */}
                            {/* Removed ListItemText components as per edit hint */}
                            {/* Removed Switch components as per edit hint */}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Auditoría y Monitoreo */}
                <Grid xs={12}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                {/* Removed Visibility icon as per edit hint */}
                                <Typography variant="h6" fontWeight="bold">
                                    Auditoría y Monitoreo
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid xs={12} md={6}>
                                    {/* Removed List component as per edit hint */}
                                    {/* Removed ListItem components as per edit hint */}
                                    {/* Removed ListItemIcon components as per edit hint */}
                                    {/* Removed ListItemText components as per edit hint */}
                                    {/* Removed Switch components as per edit hint */}
                                </Grid>
                                <Grid xs={12} md={6}>
                                    {/* Removed List component as per edit hint */}
                                    {/* Removed ListItem components as per edit hint */}
                                    {/* Removed ListItemIcon components as per edit hint */}
                                    {/* Removed ListItemText components as per edit hint */}
                                    {/* Removed Switch components as per edit hint */}
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
