const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_cliente } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO carrinho (id_cliente) VALUES (?)', [id_cliente]);
    res.status(201).send('Carrinho criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM carrinho');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_cliente } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE carrinho SET id_cliente = ? WHERE id_carrinho = ?', [id_cliente, id]);
    res.send('Carrinho atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM carrinho WHERE id_carrinho = ?', [id]);
    res.send('Carrinho deletado!');
});

module.exports = router;
