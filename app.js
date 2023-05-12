const routes = require('./routers/route');
const express = require('express');
const connectToDatabase = require('./config/db_mongoose');
const handlebars = require('express-handlebars');
var session = require('express-session');
const app = express();

app.engine('handlebars', handlebars.engine({defaultLayout:'noMenu'}));
app.set('view engine','handlebars');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'textosecreto', saveUninitialized: true, cookie: {maxAge: 30*60*1000}}));

app.use(routes);

connectToDatabase();

app.listen(8081, function(){
console.log("Servidor no http://localhost:8081")
});
