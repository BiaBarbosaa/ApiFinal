const express = require('express');
const clienteController = require('../controller/controller');
const veiculoController = require('../controller/veiculoController');
const routers = express.Router();

//cadastro usuario
routers.post('/cadastro',clienteController.cadastroUsuario);
//autenticacao
routers.post('/autenticacao',clienteController.autenticacao)
//ROTA RAIZ
routers.get('/',clienteController.getRoot);

//veiculos
routers.post('/api/cadastroveiculo',veiculoController.criarNovoVeiculo);
routers.get('/api/listar',veiculoController.listarTodos);
routers.get('/api/listarId/:id', veiculoController.listaId);
routers.put('/api/atualizar/:id', veiculoController.atualizar);
routers.delete('/api/deletar/:id', veiculoController.deletar);

module.exports = routers;