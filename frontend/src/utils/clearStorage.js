// Utilidad para limpiar el localStorage y reiniciar la aplicación
export const clearStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
};

// Función para verificar si hay datos de sesión
export const hasSession = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return !!(user && token);
};

// Función para obtener datos de usuario
export const getUserData = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
        return null;
    }
}; 