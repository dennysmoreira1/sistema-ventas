let ventas = [];

export function registrarVenta(req, res) {
    const venta = req.body;
    venta.id = ventas.length + 1;
    ventas.push(venta);
    res.status(201).json({ mensaje: 'Venta registrada', venta });
}

export function listarVentas(req, res) {
    res.json(ventas);
}

export function buscarVenta(req, res) {
    const { id } = req.query;
    const venta = ventas.find(v => v.id == id);

    if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json(venta);
} 