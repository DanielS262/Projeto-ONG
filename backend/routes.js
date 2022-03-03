const express = require('express')

const route = express.Router()
const funcionarioControll = require("./src/controller/funcionarioControll")
const assistidoControll = require('./src/controller/assistidoControll')

route.get('/funcionarios', funcionarioControll.getAll)
route.get('/funcionarios/:id_funcionario', funcionarioControll.getID)
route.post('/funcionarios/', funcionarioControll.postFuncionario)
route.put('/funcionarios', funcionarioControll.updateFuncionario)
route.delete('/funcionarios/:id_funcionario', funcionarioControll.deletarFuncionario)

route.get('/assistidos', assistidoControll.getAll)
route.get('/assistidos/:id_assistido', assistidoControll.getID)
route.post('/assistidos', assistidoControll.postAssistido)

module.exports = route