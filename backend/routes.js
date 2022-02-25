const express = require('express')

const route = express.Router()
const funcionarioControll = require("./src/controller/funcionarioControll")

route.get('/funcionarios', funcionarioControll.getAll)
route.get('/funcionarios/:id_funcionario', funcionarioControll.getID)
route.post('/funcionarios/', funcionarioControll.postFuncionario)

module.exports = route