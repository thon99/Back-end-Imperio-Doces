const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_cliente, valor_total, status_pedido, metodo_pagamento } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO pedidos (id_cliente, valor_total, status_pedido, metodo_pagamento) VALUES (?, ?, ?, ?)', 
        [id_cliente, valor_total, status_pedido, metodo_pagamento]);
    res.status(201).send('Pedido criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pedidos');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_cliente, valor_total, status_pedido, metodo_pagamento } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE pedidos SET id_cliente = ?, valor_total = ?, status_pedido = ?, metodo_pagamento = ? WHERE id_pedido = ?', 
        [id_cliente, valor_total, status_pedido, metodo_pagamento, id]);
    res.send('Pedido atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    res.send('Pedido deletado!');
});

module.exports = router;
