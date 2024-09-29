const express = require('express');
const router = express.Router();
const createConnection = require('../db');

router.post('/', async (req, res) => {
    const { nome_produto, descricao, preco, categoria, imagem_url, estoque, status } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO produtos (nome_produto, descricao, preco, categoria, imagem_url, estoque, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [nome_produto, descricao, preco, categoria, imagem_url, estoque, status]);
    res.status(201).send('Produto criado!');
});

router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM produtos');
    res.json(rows);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_produto, descricao, preco, categoria, imagem_url, estoque, status } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE produtos SET nome_produto = ?, descricao = ?, preco = ?, categoria = ?, imagem_url = ?, estoque = ?, status = ? WHERE id_produto = ?', 
        [nome_produto, descricao, preco, categoria, imagem_url, estoque, status, id]);
    res.send('Produto atualizado!');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
    res.send('Produto deletado!');
});

module.exports = router;
