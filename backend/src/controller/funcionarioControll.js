const res = require('express/lib/response')
const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

const getAll = (req,res) => {
    let string = 'select * from funcionario'
    con.query(string, (err,result) => {
        result.forEach((item,index) => {
            delete item.senha
            delete item.status
        });

       res.json(result)
    })
}

const getID = (req,res) => {

    let string = 'select * from funcionario where id_funcionario =' + req.params.id_funcionario
    con.query(string, (err,result) => {

        result.forEach((item,index) => {
            delete item.senha
            delete item.status
        });
        res.json(result)
    })
}

const postFuncionario = (req,res) => {
    let foto = (req.body.foto === undefined) ? "" : req.body.foto
    let status = (req.body.data_demissao === "") ? 1 : 0 
    let string = `insert into funcionario(foto,matricula,nome_completo,rg,cpf,data_nascimento,cargo,sexo,data_admissao,email,senha,status) values ?;`
    let values = [

        [
        foto,
        req.body.matricula,
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

            if(err == null) {
                res.status(200).json({...req.body, id: result.insertId});
            }else {
                res.status(400).json({err: err.message});
            } 
    })
}


const updateFuncionario = (req,res) => {

    let cargo = req.body.cargo
    let email = req.body.email
    let senha = req.body.senha 
    let id_funcionario = req.body.id_funcionario

    let string = [
        `update funcionario set cargo = "${cargo}", email = "${email}", senha = "${senha}" where id_funcionario = ${id_funcionario};`,
        `update funcionario set cargo = "${cargo}" where id_funcionario = "${id_funcionario}";`,
        `update funcionario set email = "${email}" where id_funcionario = "${id_funcionario}";`,
        `update funcionario set senha = "${senha}" where id_funcionario = "${id_funcionario}";`,
        `update funcionario set email = "${email}", senha = "${senha}" where id_funcionario = ${id_funcionario};`
    ]


    function busca() {

        if(cargo && email && senha !== undefined){
            return string[0]
        }
        else if(cargo !== undefined && email === undefined && senha === undefined){
            return string[1]
        }
        else if(cargo == undefined && email !== undefined && senha == undefined){
            return string[2]
        }
        else if(cargo == undefined && email == undefined && senha !== undefined){
            return string[3]
        }
        else{
            return string[4]
        }
    }

    let resultado = busca()

    console.log(resultado)

    con.query(resultado, (err,result) => {
        if(err == null) {
            res.status(200).json({...req.body});
        }else {
            res.status(400).json({err: err.message});
        } 
    })

}

const deletarFuncionario = (req,res) => {

    let string = `delete from funcionario where id_funcionario = ${req.params.id_funcionario};`

    con.query(string, (err,result) => {
        if(err == null) {
            res.status(200).json({...req.body});
        }else {
            res.status(400).json({err: err.message});
        } 
    })
}


module.exports = {
    getAll,
    getID,
    postFuncionario,
    updateFuncionario,
    deletarFuncionario
}