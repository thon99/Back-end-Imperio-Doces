const express = require('express');
const router = express.Router();
const createConnection = require('../db');

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    const connection = await createConnection();
    await connection.execute('INSERT INTO clientes (nome, email, senha, telefone) VALUES (?, ?, ?, ?)', [nome, email, senha, telefone]);
    res.status(201).send('Cliente criado!');
});

// Rota para listar todos os clientes
router.get('/', async (req, res) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM clientes');
    res.json(rows);
});

// Rota para atualizar um cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, telefone } = req.body;
    const connection = await createConnection();
    await connection.execute('UPDATE clientes SET nome = ?, email = ?, senha = ?, telefone = ? WHERE id_cliente = ?', 
        [nome, email, senha, telefone, id]);
    res.send('Cliente atualizado!');
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await createConnection();
    await connection.execute('DELETE FROM clientes WHERE id_cliente = ?', [id]);
    res.send('Cliente deletado!');
});

// Rota para verificação de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Conexão com o banco de dados
    const connection = await createConnection();
    
    // Verificação se o cliente existe e se a senha está correta
    const [rows] = await connection.execute('SELECT id_cliente FROM clientes WHERE email = ? AND senha = ?', [email, senha]);

    // Se o cliente não for encontrado, retorna uma mensagem de erro
    if (rows.length === 0) {
        return res.status(401).send('Email ou senha incorretos.');
    }

    // Retorna o id_cliente do cliente
    const { id_cliente } = rows[0];
    res.status(200).json({ message: 'Login bem-sucedido!', id_cliente });
});

module.exports = router;
