const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)', 
        [id_pedido, id_produto, quantidade, preco_unitario]);
    res.status(201).send('Item do pedido criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM itens_pedido');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE itens_pedido SET id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ? WHERE id_item = ?', 
        [id_pedido, id_produto, quantidade, preco_unitario, id]);
    res.send('Item do pedido atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM itens_pedido WHERE id_item = ?', [id]);
    res.send('Item do pedido deletado!');
});

module.exports = router;
