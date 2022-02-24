//require('dotenv').config();
//const Express = require('express');

//const Connection = require('./src/database/Connection.js');
//const route = require('./routes');

require('dotenv').config()

const Connection = require('./src/database/Connection')
const route = require('./routes')

const Express = require('express')

const app = Express()

app.use(Express.json())
app.use(route)

app.listen(process.env.APP_PORT, () => {
    console.log("Servidor rodando na porta 3000")
})