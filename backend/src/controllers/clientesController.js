// Datos simulados
const clientes = [
    { id: 1, documento: '12345678', nombre: 'Juan Pérez' },
    { id: 2, documento: '87654321', nombre: 'Ana Gómez' },
    { id: 3, documento: '11223344', nombre: 'Carlos Ruiz' },
];

export function listarClientes(req, res) {
    res.json(clientes);
}

export function buscarCliente(req, res) {
    const { documento } = req.query;
    const cliente = clientes.find(c => c.documento === documento);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ error: 'Cliente no encontrado' });
    }
} 