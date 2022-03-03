

const { con } = require('../database/Connection')
const assistidoModelo = require('../model/assistidoModel')


const getAll = (req,res) => {

    let string = `select * from assistido`

    con.query(string, (err, result) => {

        if(err == null){
            res.json(result)
        }
        else{
            res.status(400).json({err: err.message})
        }
    })


}

const getID = (req, res) => {

    let string = `select * from assistido where id_assistido = ${req.params.id_assistido}`

    con.query(string, (err, result) => {

        if(err == null){
            res.json(result)
        }
        else{
            res.status(400).json({err: err.message})
        }
        
    })

}

const postAssistido = (req,res) => {

    let id_saude 
    let id_familiar
    let id_droga 
    let nome_social
    let rg 
    let cpf 
    let naturalidade
    let cartao_cidadao
    let cartao_sus
    let foto 
    let foto_depois
    let relatorio

    if(req.body.id_saude === undefined){
        id_saude = null
    }
    else{
        id_saude = req.body.id_saude
    }

    if(req.body.id_familiar === undefined){
        id_familiar = null
    }
    else{
        id_familiar = req.body.id_familiar
    }

    if(req.body.id_droga === undefined){
        id_droga = null
    }
    else{
        id_droga = req.body.id_droga
    }

    if(req.body.nome_social === undefined){
        nome_social = null
    }
    else{
        nome_social = req.body.nome_social
    }

    if(req.body.rg === undefined){
        rg = null
    }
    else{
        rq = req.body.rg
    }

    if(req.body.cpf === undefined){
        cpf = null
    }
    else{
        cpf = req.body.cpf
    }

    if(req.body.naturalidade === undefined){
        naturalidade = null
    }
    else{
        naturalidade = req.body.naturalidade
    }

    if(req.body.cartao_cidadao === undefined){
        cartao_cidadao = null
    }
    else{
        cartao_cidadao = req.body.cartao_cidadao
    }

    if(req.body.cartao_sus === undefined){
        cartao_sus = null
    }
    else{
        cartao_sus = req.body.cartao_sus
    }

    if(req.body.foto === undefined){
        foto = null
    }
    else{
        foto = req.body.foto
    }
    if(req.body.foto_depois === undefined){
        foto_depois = null
    }
    else{
        foto_depois = req.body.foto_depois
    }

    if(req.body.relatorio === undefined){
        relatorio = null
    }
    else{
        relatorio = req.body.relatorio
    }

    let string = `insert into assistido(id_saude, id_familiar, id_droga, id_funcionario, nome_completo, nome_social, rg,
        cpf, data_nascimento, estado_civil, naturalidade, sexo, cartao_cidadao, cartao_sus, foto, foto_depois, relatorio)
        values ?;`

    let values = [
        [

            id_saude,
            id_familiar,
            id_droga,
            req.body.id_funcionario,
            req.body.nome_completo,
            nome_social,
            rg,
            cpf,
            req.body.data_nascimento,
            req.body.estado_civil,
            naturalidade,
            req.body.sexo,
            cartao_cidadao,
            cartao_sus,
            foto,
            foto_depois,
            relatorio

        ]
        
    ]

    con.query(string, [values], (err,result) => {

        if(err == null){
            res.status(200).json({...req.body, id: result.insertedId})
        }
        else{
            res.status(400).json({err: err.message})
        }
    })

}



module.exports = {
    getAll,
    getID,
    postAssistido
}