const res = require('express/lib/response')
const { con } = require('../database/Connection')

const modeloFuncionario = require('../model/funcionarioModel')

const getAll = (req, res) => {
    let string = 'select * from funcionario'
    con.query(string, (err, result) => {
        result.forEach((item, index) => {
            delete item.senha
            delete item.status
        });

        res.json(result)
    })
}

const login = (req, res) => {
    if(req.body.email !== undefined && req.body.senha !== undefined){
        let string = `select * from funcionario where email = '${req.body.email}' and senha = '${req.body.senha}'`
        con.query(string, (err, result) => {

            if(err === null){

                if(result.length == 0){
                    res.status(404).end()
                }else{
                    result.forEach((item, index) => {
                        delete item.senha
                        delete item.status
                        delete item.foto
                        delete item.matricula
                        delete item.nome_completo
                        delete item.rg
                        delete item.cpf
                        delete item.data_nascimento
                        delete item.cargo
                        delete item.sexo
                        delete item.data_admissao
                        delete item.data_demissao
                        delete item.email
                    });
                    res.json(result[0]).end()
                }

            }

            else{
                res.status(400).json({err: err.message})
            }
            
        })
    }else{
        res.status(400).json({err:`'envie os campos 'email' e 'senha'`})
    }
}

const getMatricula = (req, res) => {

    let string = 'select * from funcionario where matricula =' + req.params.matricula_funcionario
    con.query(string, (err, result) => {

        if(err === null){
            if(result.length == 0){
                res.status(404).end()
            }else{
                result.forEach((item, index) => {
                    delete item.senha
                    delete item.status
                });
                res.json(result)
            }
        }else{
            res.status(404).json({err: err.message})
        }
    })
}

const postFuncionario = (req, res) => {
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
    con.query(string, [values], (err, result) => {

        if (err == null) {
            res.status(200).json({ ...req.body, id: result.insertId });
        } else {
            res.status(400).json({ err: err.message });
        }
    })
}

const updateFotoFuncionario = (req,res) => {

    let cpf = req.body.cpf
    let foto = req.body.foto
    let string = `update funcionario set foto = '${foto}' where cpf = '${cpf}'`

    con.query(string,(err, result) => {
        if (err == null) {
            res.status(200).json({ ...req.body });
        } else {
            res.status(400).json({ err: err.message });
        }
    })

}


const updateFuncionario = (req, res) => {

    let cargo = req.body.cargo
    let email = req.body.email
    let senha = req.body.senha
    let matricula_funcionario = req.body.matricula_funcionario

    let string = [
        `update funcionario set cargo = "${cargo}", email = "${email}", senha = "${senha}" where matricula = ${matricula_funcionario};`,
        `update funcionario set cargo = "${cargo}" where matricula = "${matricula_funcionario}";`,
        `update funcionario set email = "${email}" where matricula = "${matricula_funcionario}";`,
        `update funcionario set senha = "${senha}" where matricula = "${matricula_funcionario}";`,
        `update funcionario set email = "${email}", senha = "${senha}" where matricula = ${matricula_funcionario};`
    ]


    function busca() {

        if (cargo && email && senha !== undefined) {
            return string[0]
        }
        else if (cargo !== undefined && email === undefined && senha === undefined) {
            return string[1]
        }
        else if (cargo == undefined && email !== undefined && senha == undefined) {
            return string[2]
        }
        else if (cargo == undefined && email == undefined && senha !== undefined) {
            return string[3]
        }
        else {
            return string[4]
        }
    }

    let resultado = busca()

    console.log(resultado)

    con.query(resultado, (err, result) => {
        if (err == null) {
            res.status(200).json({ ...req.body });
        } else {
            res.status(400).json({ err: err.message });
        }
    })

}

const deletarFuncionario = (req, res) => {

    let string = `delete from funcionario where id_funcionario = ${req.params.matricula};`

    con.query(string, (err, result) => {
        if (err == null) {
            res.status(200).json({ ...req.body });
        } else {
            res.status(400).json({ err: err.message });
        }
    })
}


module.exports = {
    getAll,
    getMatricula,
    login,
    postFuncionario,
    updateFuncionario,
    updateFotoFuncionario,
    deletarFuncionario
}