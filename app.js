const routes = require('./routers/route');
const express = require('express');
const connectToDatabase = require('./config/db_mongoose');
const handlebars = require('express-handlebars');
const app = express();

app.engine('handlebars', handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//app.get('/', function (req, res) {
  //  res.render("./ouvinte");
//});

app.use(routes);

connectToDatabase();

app.listen(8081, function(){
console.log("Servidor no http://localhost:8081")
});
