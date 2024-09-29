const express = require('express');
const router = express.Router();

const clientesRouter = require('./clientes');
const produtosRouter = require('./produtos');
const categoriasRouter = require('./categorias');
const pedidosRouter = require('./pedidos');
const itensPedidoRouter = require('./itens_pedido');
const enderecosRouter = require('./enderecos');
const pagamentosRouter = require('./pagamentos');
const cuponsRouter = require('./cupons');
const avaliacoesRouter = require('./avaliacoes');
const carrinhoRouter = require('./carrinho');

router.use('/clientes', clientesRouter);
router.use('/produtos', produtosRouter);
router.use('/categorias', categoriasRouter);
router.use('/pedidos', pedidosRouter);
router.use('/itens_pedido', itensPedidoRouter);
router.use('/enderecos', enderecosRouter);
router.use('/pagamentos', pagamentosRouter);
router.use('/cupons', cuponsRouter);
router.use('/avaliacoes', avaliacoesRouter);
router.use('/carrinho', carrinhoRouter);

module.exports = router;