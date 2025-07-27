import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import GestionVentas from './pages/GestionVentas';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import Vendedores from './pages/Vendedores';
import Clientes from './pages/Clientes';
import Proveedores from './pages/Proveedores';
import Categorias from './pages/Categorias';
import Marcas from './pages/Marcas';
import Productos from './pages/Productos';
import ControlVentas from './pages/ControlVentas';
import ReporteVentas from './pages/ReporteVentas';
import SalidasGastos from './pages/SalidasGastos';
import ReporteSalidas from './pages/ReporteSalidas';
import Perfil from './pages/Perfil';
import Configuracion from './pages/Configuracion';
import Permisos from './pages/Permisos';
import Logs from './pages/Logs';

// Componente para el layout principal con sidebar y header
const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          width: { xs: '100%', md: `calc(100% - ${isMobile ? 240 : 280}px)` },
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

// Componente principal de la aplicación
const AppContent = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta de login */}
      <Route
        path="/login"
        element={
          user ? <Navigate to="/" replace /> : <Login />
        }
      />

      {/* Rutas protegidas */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Inicio />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/usuarios" element={
        <ProtectedRoute requiredPermissions={['usuarios']}>
          <MainLayout>
            <Usuarios />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/vendedores" element={
        <ProtectedRoute requiredPermissions={['usuarios']}>
          <MainLayout>
            <Vendedores />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/clientes" element={
        <ProtectedRoute>
          <MainLayout>
            <Clientes />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/proveedores" element={
        <ProtectedRoute>
          <MainLayout>
            <Proveedores />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/categorias" element={
        <ProtectedRoute requiredPermissions={['productos']}>
          <MainLayout>
            <Categorias />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/marcas" element={
        <ProtectedRoute requiredPermissions={['productos']}>
          <MainLayout>
            <Marcas />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/productos" element={
        <ProtectedRoute requiredPermissions={['productos']}>
          <MainLayout>
            <Productos />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/registro-ventas" element={
        <ProtectedRoute requiredPermissions={['ventas']}>
          <MainLayout>
            <GestionVentas />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/control-ventas" element={
        <ProtectedRoute requiredPermissions={['ventas']}>
          <MainLayout>
            <ControlVentas />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/reporte-ventas" element={
        <ProtectedRoute requiredPermissions={['reportes']}>
          <MainLayout>
            <ReporteVentas />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/salidas-gastos" element={
        <ProtectedRoute requiredPermissions={['admin']}>
          <MainLayout>
            <SalidasGastos />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/reporte-salidas" element={
        <ProtectedRoute requiredPermissions={['reportes']}>
          <MainLayout>
            <ReporteSalidas />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/perfil" element={
        <ProtectedRoute requiredPermissions={['admin']}>
          <MainLayout>
            <Perfil />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/configuracion" element={
        <ProtectedRoute requiredPermissions={['admin']}>
          <MainLayout>
            <Configuracion />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/permisos" element={
        <ProtectedRoute requiredPermissions={['admin']}>
          <MainLayout>
            <Permisos />
          </MainLayout>
        </ProtectedRoute>
      } />

      <Route path="/logs" element={
        <ProtectedRoute requiredPermissions={['admin']}>
          <MainLayout>
            <Logs />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Redirigir cualquier ruta no encontrada al login o dashboard */}
      <Route path="*" element={
        <Navigate to={user ? "/" : "/login"} replace />
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
