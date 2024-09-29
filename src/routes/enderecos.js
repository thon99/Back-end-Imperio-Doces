const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_cliente, endereco, cidade, estado, cep, tipo_endereco, principal } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'INSERT INTO enderecos (id_cliente, endereco, cidade, estado, cep, tipo_endereco, principal) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [id_cliente, endereco, cidade, estado, cep, tipo_endereco, principal]
    );
    res.status(201).send('Endereço criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM enderecos');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_cliente, endereco, cidade, estado, cep, tipo_endereco, principal } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'UPDATE enderecos SET id_cliente = ?, endereco = ?, cidade = ?, estado = ?, cep = ?, tipo_endereco = ?, principal = ? WHERE id_endereco = ?', 
        [id_cliente, endereco, cidade, estado, cep, tipo_endereco, principal, id]
    );
    res.send('Endereço atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM enderecos WHERE id_endereco = ?', [id]);
    res.send('Endereço deletado!');
});

module.exports = router;
