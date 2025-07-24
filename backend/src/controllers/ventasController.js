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