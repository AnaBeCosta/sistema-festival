const routes = require('./routers/route');
const express = require('express');
const connectToDatabase = require('./config/db_mongoose');
const app = express();

connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(8081, function(){
console.log("Servidor no http://localhost:8081")
});