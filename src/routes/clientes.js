const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO clientes (nome, email, senha, telefone) VALUES (?, ?, ?, ?)', [nome, email, senha, telefone]);
    res.status(201).send('Cliente criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM clientes');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, telefone } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE clientes SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id_cliente = ?', 
        [nome, email, senha, telefone, id]);
    res.send('Cliente atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    res.send('Cliente deletado!');
});

module.exports = router;
