const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { codigo_cupom, desconto, data_validade } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'INSERT INTO cupons (codigo_cupom, desconto, data_validade) VALUES (?, ?, ?)', 
        [codigo_cupom, desconto, data_validade]
    );
    res.status(201).send('Cupom criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM cupons');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { codigo_cupom, desconto, data_validade } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'UPDATE cupons SET codigo_cupom = ?, desconto = ?, data_validade = ? WHERE id_cupom = ?', 
        [codigo_cupom, desconto, data_validade, id]
    );
    res.send('Cupom atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM cupons WHERE id_cupom = ?', [id]);
    res.send('Cupom deletado!');
});

module.exports = router;
