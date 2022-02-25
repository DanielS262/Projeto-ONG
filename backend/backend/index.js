
require('dotenv').config()

const route = require('./routes')

const Express = require('express')

const app = Express()

app.use(Express.json())
app.use(route)

app.listen(process.env.APP_PORT, () => {
    console.log("Servidor rodando na porta 3000")
})