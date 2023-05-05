const db_mongoose = require('./config/db_mongoose');
const mongoose = require('mongoose');
const routes = require('./routers/route');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(db_mongoose.connection, {useUnifiedTopology:true, useNewUrlParser:true}).then(()=>{
    console.log('Conectado com o BD do mongo');
}).catch(()=>{
        console.log('Erro na conexão com o BD');
});

app.listen(8081, function(){
console.log("Servidor no http://localhost:8081")
});