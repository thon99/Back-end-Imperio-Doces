const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { nome_categoria } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO categorias (nome_categoria) VALUES (?)', [nome_categoria]);
    res.status(201).send('Categoria criada!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM categorias');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_categoria } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE categorias SET nome_categoria = ? WHERE id_categoria = ?', 
        [nome_categoria, id]);
    res.send('Categoria atualizada!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM categorias WHERE id_categoria = ?', [id]);
    res.send('Categoria deletada!');
});

module.exports = router;
