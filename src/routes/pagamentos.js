const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_pedido, metodo_pagamento, status_pagamento, valor_pago } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'INSERT INTO pagamentos (id_pedido, metodo_pagamento, status_pagamento, valor_pago) VALUES (?, ?, ?, ?)', 
        [id_pedido, metodo_pagamento, status_pagamento, valor_pago]
    );
    res.status(201).send('Pagamento criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM pagamentos');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, metodo_pagamento, status_pagamento, valor_pago } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'UPDATE pagamentos SET id_pedido = ?, metodo_pagamento = ?, status_pagamento = ?, valor_pago = ? WHERE id_pagamento = ?', 
        [id_pedido, metodo_pagamento, status_pagamento, valor_pago, id]
    );
    res.send('Pagamento atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM pagamentos WHERE id_pagamento = ?', [id]);
    res.send('Pagamento deletado!');
});

module.exports = router;
