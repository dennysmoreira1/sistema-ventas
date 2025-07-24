// Datos simulados
const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200 },
    { id: 2, nombre: 'Mouse', precio: 25 },
    { id: 3, nombre: 'Teclado', precio: 45 },
    { id: 4, nombre: 'Monitor', precio: 300 },
];

export function listarProductos(req, res) {
    res.json(productos);
}

export function buscarProducto(req, res) {
    const { nombre } = req.query;
    const resultado = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    res.json(resultado);
} 