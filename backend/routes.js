const express = require('express')

const route = express.Router()

route.get('/funcionarios', (req,res) => {
    res.send("Olá mundo")
})


module.exports = route