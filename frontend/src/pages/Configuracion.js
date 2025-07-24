import React, { useState } from 'react';
import {
    Box, Typography, Paper, Grid, Card, CardContent, Switch, FormControlLabel,
    TextField, Button, Divider, Alert, Snackbar, Dialog, DialogTitle,
    DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem,
    Chip, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction
} from '@mui/material';
import {
    Settings, Notifications, Security, Business, Language, Palette,
    Save, Refresh, Backup, Restore, Download, Upload, Lock, Visibility
} from '@mui/icons-material';

const Configuracion = () => {
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [backupDialog, setBackupDialog] = useState(false);
    const [restoreDialog, setRestoreDialog] = useState(false);

    // Configuraciones del sistema
    const [configuraciones, setConfiguraciones] = useState({
        // Notificaciones
        notificacionesEmail: true,
        notificacionesPush: false,
        notificacionesVentas: true,
        notificacionesStock: true,

        // Seguridad
        autenticacionDoble: false,
        sesionTimeout: 30,
        intentosLogin: 3,
        passwordMinLength: 8,

        // Empresa
        nombreEmpresa: 'Mi Empresa S.A.',
        rucEmpresa: '12345678-9',
        direccionEmpresa: 'Calle Principal #123',
        telefonoEmpresa: '+57 300-123-4567',
        emailEmpresa: 'contacto@miempresa.com',

        // Sistema
        idioma: 'es',
        tema: 'light',
        zonaHoraria: 'America/Bogota',
        moneda: 'COP',

        // Backup
        backupAutomatico: true,
        frecuenciaBackup: 'diario',
        retenerBackups: 30
    });

    const handleConfigChange = (key, value) => {
        setConfiguraciones(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveConfig = () => {
        // Aquí iría la lógica para guardar las configuraciones
        setMensaje('Configuraciones guardadas correctamente');
    };

    const handleBackup = () => {
        setBackupDialog(true);
        // Aquí iría la lógica para crear backup
        setTimeout(() => {
            setMensaje('Backup creado correctamente');
            setBackupDialog(false);
        }, 2000);
    };

    const handleRestore = () => {
        setRestoreDialog(true);
        // Aquí iría la lógica para restaurar backup
        setTimeout(() => {
            setMensaje('Sistema restaurado correctamente');
            setRestoreDialog(false);
        }, 2000);
    };

    const handleResetConfig = () => {
        if (window.confirm('¿Estás seguro de que quieres restablecer todas las configuraciones?')) {
            // Aquí iría la lógica para resetear configuraciones
            setMensaje('Configuraciones restablecidas');
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Configuración del Sistema
            </Typography>

            <Grid container spacing={3}>
                {/* Configuración de Notificaciones */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Notificaciones
                                </Typography>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Notificaciones por Email"
                                        secondary="Recibir notificaciones por correo electrónico"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={configuraciones.notificacionesEmail}
                                            onChange={(e) => handleConfigChange('notificacionesEmail', e.target.checked)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Notificaciones Push"
                                        secondary="Notificaciones en tiempo real"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={configuraciones.notificacionesPush}
                                            onChange={(e) => handleConfigChange('notificacionesPush', e.target.checked)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Alertas de Ventas"
                                        secondary="Notificar nuevas ventas"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={configuraciones.notificacionesVentas}
                                            onChange={(e) => handleConfigChange('notificacionesVentas', e.target.checked)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Settings />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Alertas de Stock"
                                        secondary="Notificar productos con bajo stock"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={configuraciones.notificacionesStock}
                                            onChange={(e) => handleConfigChange('notificacionesStock', e.target.checked)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Configuración de Seguridad */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Security sx={{ mr: 1, color: 'error.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Seguridad
                                </Typography>
                            </Box>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Lock />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Autenticación de dos factores"
                                        secondary="Requerir código adicional para login"
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            checked={configuraciones.autenticacionDoble}
                                            onChange={(e) => handleConfigChange('autenticacionDoble', e.target.checked)}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Visibility />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Tiempo de sesión"
                                        secondary={`${configuraciones.sesionTimeout} minutos`}
                                    />
                                    <ListItemSecondaryAction>
                                        <TextField
                                            type="number"
                                            size="small"
                                            value={configuraciones.sesionTimeout}
                                            onChange={(e) => handleConfigChange('sesionTimeout', parseInt(e.target.value))}
                                            sx={{ width: 80 }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Security />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Intentos de login"
                                        secondary="Máximo intentos antes del bloqueo"
                                    />
                                    <ListItemSecondaryAction>
                                        <TextField
                                            type="number"
                                            size="small"
                                            value={configuraciones.intentosLogin}
                                            onChange={(e) => handleConfigChange('intentosLogin', parseInt(e.target.value))}
                                            sx={{ width: 80 }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Lock />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Longitud mínima de contraseña"
                                        secondary="Caracteres mínimos requeridos"
                                    />
                                    <ListItemSecondaryAction>
                                        <TextField
                                            type="number"
                                            size="small"
                                            value={configuraciones.passwordMinLength}
                                            onChange={(e) => handleConfigChange('passwordMinLength', parseInt(e.target.value))}
                                            sx={{ width: 80 }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Información de la Empresa */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Business sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Información de la Empresa
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nombre de la empresa"
                                        value={configuraciones.nombreEmpresa}
                                        onChange={(e) => handleConfigChange('nombreEmpresa', e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="RUC/NIT"
                                        value={configuraciones.rucEmpresa}
                                        onChange={(e) => handleConfigChange('rucEmpresa', e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Teléfono"
                                        value={configuraciones.telefonoEmpresa}
                                        onChange={(e) => handleConfigChange('telefonoEmpresa', e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Dirección"
                                        value={configuraciones.direccionEmpresa}
                                        onChange={(e) => handleConfigChange('direccionEmpresa', e.target.value)}
                                        margin="normal"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email de contacto"
                                        value={configuraciones.emailEmpresa}
                                        onChange={(e) => handleConfigChange('emailEmpresa', e.target.value)}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Configuración del Sistema */}
                <Grid xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Settings sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Configuración del Sistema
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Idioma</InputLabel>
                                        <Select
                                            value={configuraciones.idioma}
                                            onChange={(e) => handleConfigChange('idioma', e.target.value)}
                                            label="Idioma"
                                        >
                                            <MenuItem value="es">Español</MenuItem>
                                            <MenuItem value="en">English</MenuItem>
                                            <MenuItem value="pt">Português</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Tema</InputLabel>
                                        <Select
                                            value={configuraciones.tema}
                                            onChange={(e) => handleConfigChange('tema', e.target.value)}
                                            label="Tema"
                                        >
                                            <MenuItem value="light">Claro</MenuItem>
                                            <MenuItem value="dark">Oscuro</MenuItem>
                                            <MenuItem value="auto">Automático</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Zona Horaria</InputLabel>
                                        <Select
                                            value={configuraciones.zonaHoraria}
                                            onChange={(e) => handleConfigChange('zonaHoraria', e.target.value)}
                                            label="Zona Horaria"
                                        >
                                            <MenuItem value="America/Bogota">Bogotá (UTC-5)</MenuItem>
                                            <MenuItem value="America/Mexico_City">México (UTC-6)</MenuItem>
                                            <MenuItem value="America/New_York">Nueva York (UTC-5)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Moneda</InputLabel>
                                        <Select
                                            value={configuraciones.moneda}
                                            onChange={(e) => handleConfigChange('moneda', e.target.value)}
                                            label="Moneda"
                                        >
                                            <MenuItem value="COP">Peso Colombiano (COP)</MenuItem>
                                            <MenuItem value="USD">Dólar Americano (USD)</MenuItem>
                                            <MenuItem value="EUR">Euro (EUR)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Backup y Restauración */}
                <Grid xs={12}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Backup sx={{ mr: 1, color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">
                                    Backup y Restauración
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={configuraciones.backupAutomatico}
                                                onChange={(e) => handleConfigChange('backupAutomatico', e.target.checked)}
                                            />
                                        }
                                        label="Backup automático"
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Frecuencia de backup</InputLabel>
                                        <Select
                                            value={configuraciones.frecuenciaBackup}
                                            onChange={(e) => handleConfigChange('frecuenciaBackup', e.target.value)}
                                            label="Frecuencia de backup"
                                            disabled={!configuraciones.backupAutomatico}
                                        >
                                            <MenuItem value="diario">Diario</MenuItem>
                                            <MenuItem value="semanal">Semanal</MenuItem>
                                            <MenuItem value="mensual">Mensual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Retener backups (días)"
                                        type="number"
                                        value={configuraciones.retenerBackups}
                                        onChange={(e) => handleConfigChange('retenerBackups', parseInt(e.target.value))}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid xs={12} sm={6}>
                                    <Box display="flex" gap={1} mt={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Download />}
                                            onClick={handleBackup}
                                        >
                                            Crear Backup
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Upload />}
                                            onClick={handleRestore}
                                        >
                                            Restaurar
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Botones de acción */}
            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleResetConfig}
                >
                    Restablecer Configuración
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveConfig}
                >
                    Guardar Configuración
                </Button>
            </Box>

            {/* Dialog de Backup */}
            <Dialog open={backupDialog} onClose={() => setBackupDialog(false)}>
                <DialogTitle>Creando Backup</DialogTitle>
                <DialogContent>
                    <Typography>
                        Creando backup del sistema. Por favor espera...
                    </Typography>
                </DialogContent>
            </Dialog>

            {/* Dialog de Restauración */}
            <Dialog open={restoreDialog} onClose={() => setRestoreDialog(false)}>
                <DialogTitle>Restaurando Sistema</DialogTitle>
                <DialogContent>
                    <Typography>
                        Restaurando sistema desde backup. Por favor espera...
                    </Typography>
                </DialogContent>
            </Dialog>

            {/* Snackbars para mensajes */}
            <Snackbar
                open={!!mensaje}
                autoHideDuration={3000}
                onClose={() => setMensaje('')}
            >
                <Alert severity="success" onClose={() => setMensaje('')}>
                    {mensaje}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setError('')}
            >
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Configuracion; 