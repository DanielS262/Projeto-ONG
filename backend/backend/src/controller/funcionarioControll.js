const res = require('express/lib/response')
const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

const getAll = (req,res) => {
    let string = 'select * from funcionario'
    con.query(string, (err,result) => {
        res.json(result)
    })
}

const getID = (req,res) => {

    let string = 'select * from funcionario where id_funcionario =' + req.params.id_funcionario
    con.query(string, (err,result) => {
        res.json(result)
    })
}

const postFuncionario = (req,res) => {
    //let foto = (req.body.foto === undefined) ? "" : req.body.foto
    let status = (req.body.data_demissao === "") ? 1 : 0 
    let string = `insert into funcionario(matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values ?;`
    let values = [
        [req.body.matricula,
        req.body.nome_completo,
        req.body.rg,
        req.body.cpf,
        req.body.data_nascimento,
        req.body.cargo,
        req.body.sexo,
        req.body.data_admissao,
        req.body.email,
        req.body.senha,
        status]
    
    ]

    con.query(string, [values], (err,result) => {

            if (err) throw err;
                res.status(200).json()
                console.log("All Rows Inserted")

           
    })

    
}


module.exports = {
    getAll,
    getID,
    postFuncionario
}