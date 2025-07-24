import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Chip, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, FormControl, InputLabel,
    Select, MenuItem, Alert, Snackbar, Grid, Card, CardContent
} from '@mui/material';
import { Search, Print, FilterList, Receipt, AttachMoney, TrendingUp, Category } from '@mui/icons-material';

const ReporteSalidas = () => {
    const [salidas, setSalidas] = useState([]);
    const [filtro, setFiltro] = useState({
        tipo: '',
        estado: '',
        fecha: ''
    });
    const [mensaje, setMensaje] = useState('');

    const handleFiltroChange = (e) => {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    };

    const handlePrint = () => {
        setMensaje('Generando reporte...');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Reporte de Salidas y Gastos
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Receipt sx={{ mr: 2, color: 'error.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Total Gastos
                                    </Typography>
                                    <Typography variant="h4" color="error.main">
                                        $125,000
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <AttachMoney sx={{ mr: 2, color: 'success.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Gastos Pagados
                                    </Typography>
                                    <Typography variant="h4" color="success.main">
                                        $98,500
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <TrendingUp sx={{ mr: 2, color: 'info.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Promedio
                                    </Typography>
                                    <Typography variant="h4" color="info.main">
                                        $2,778
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Category sx={{ mr: 2, color: 'warning.main' }} />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        Categorías
                                    </Typography>
                                    <Typography variant="h4" color="warning.main">
                                        8
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Filtros
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Gasto</InputLabel>
                            <Select
                                name="tipo"
                                value={filtro.tipo}
                                onChange={handleFiltroChange}
                                label="Tipo de Gasto"
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="oficina">Oficina</MenuItem>
                                <MenuItem value="tecnologia">Tecnología</MenuItem>
                                <MenuItem value="marketing">Marketing</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Estado</InputLabel>
                            <Select
                                name="estado"
                                value={filtro.estado}
                                onChange={handleFiltroChange}
                                label="Estado"
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="pagado">Pagado</MenuItem>
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Fecha"
                            name="fecha"
                            type="date"
                            value={filtro.fecha}
                            onChange={handleFiltroChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Box display="flex" gap={1}>
                            <Button
                                variant="contained"
                                startIcon={<Search />}
                                fullWidth
                            >
                                Buscar
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Print />}
                                onClick={handlePrint}
                            >
                                Imprimir
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Material de oficina</TableCell>
                            <TableCell>Oficina</TableCell>
                            <TableCell>$2,500</TableCell>
                            <TableCell>2024-01-15</TableCell>
                            <TableCell>Papelería Central</TableCell>
                            <TableCell>
                                <Chip label="Pagado" color="success" size="small" />
                            </TableCell>
                            <TableCell>
                                <IconButton>
                                    <Print />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={!!mensaje}
                autoHideDuration={6000}
                onClose={() => setMensaje('')}
            >
                <Alert onClose={() => setMensaje('')} severity="info">
                    {mensaje}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ReporteSalidas; 