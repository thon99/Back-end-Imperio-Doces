const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { id_produto, id_cliente, nota, comentario } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'INSERT INTO avaliacoes (id_produto, id_cliente, nota, comentario) VALUES (?, ?, ?, ?)', 
        [id_produto, id_cliente, nota, comentario]
    );
    res.status(201).send('Avaliação criada!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM avaliacoes');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_produto, id_cliente, nota, comentario } = req.body;
    const connection = await createConnection();
    await connection.execute(
        'UPDATE avaliacoes SET id_produto = ?, id_cliente = ?, nota = ?, comentario = ? WHERE id_avaliacao = ?', 
        [id_produto, id_cliente, nota, comentario, id]
    );
    res.send('Avaliação atualizada!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM avaliacoes WHERE id_avaliacao = ?', [id]);
    res.send('Avaliação deletada!');
});

module.exports = router;
