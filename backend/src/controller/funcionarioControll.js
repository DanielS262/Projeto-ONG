const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

const getAll = (req,res) => {
    let string = 'select * from funcionario'
    con.query(string, (err,result) => {
        res.json(result)
    })
}