const express = require('express');
const router = express.Router();
const createConnection = require('../db');

// Rota para criar um novo produto
router.post('/', async (req, res) => {
    const { nome_produto, descricao, preco, categoria, imagem_url, estoque, status } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO produtos (nome_produto, descricao, preco, categoria, imagem_url, estoque, status) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [nome_produto, descricao, preco, categoria, imagem_url, estoque, status]);
    res.status(201).send('Produto criado!');
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM produtos');
    res.json(rows);
});

// Rota para busca parcial por nome de produto
router.get('/buscar/:nome', async (req, res) => {
    const { nome } = req.params;  // Parâmetro de rota para o nome parcial do produto
    const connection = await createConnection();

    // Verifica se foi fornecido um nome para a busca
    if (!nome) {
        return res.status(400).send('Nome do produto é obrigatório para a busca.');
    }

    // Consulta com LIKE para buscar o nome parcial
    const [rows] = await connection.execute('SELECT * FROM produtos WHERE nome_produto LIKE ?', [`%${nome}%`]);
    res.json(rows);
});

// Rota para atualizar um produto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_produto, descricao, preco, categoria, imagem_url, estoque, status } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE produtos SET nome_produto = ?, descricao = ?, preco = ?, categoria = ?, imagem_url = ?, estoque = ?, status = ? WHERE id_produto = ?', 
        [nome_produto, descricao, preco, categoria, imagem_url, estoque, status, id]);
    res.send('Produto atualizado!');
});

// Rota para deletar um produto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
    res.send('Produto deletado!');
});

module.exports = router;
