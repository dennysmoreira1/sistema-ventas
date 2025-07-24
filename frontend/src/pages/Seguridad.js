import React, { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Card, CardContent, Button, Alert, Snackbar
} from '@mui/material';
import {
    Security, Lock
} from '@mui/icons-material';

const Seguridad = () => {
    const [mensaje, setMensaje] = useState('');

    const handleSave = () => {
        setMensaje('Configuración de seguridad guardada exitosamente');
    };

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
                    onClick={handleSave}
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
