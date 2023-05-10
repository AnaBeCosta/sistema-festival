const { identity } = require('lodash');
const Ouvinte = require('../models/model_nosql/ouvinte');


module.exports = {
    async getVotos(req, res) {
        console.log('Entrou no getVotos')
        Ouvinte.find().then((ouvintes) => {
            console.log(ouvintes)
            console.log(ouvintes.length)
            //res.render('/votar', {ouvintes: ouvintes.map(ouv => ouv.toJSON())})
            res.redirect('/votar')
            console.log('terminou o getVotos')
        });
    },
    async postVoto(req, res) {
        console.log('Entrou no postVoto')
        Ouvinte.find().then((ouvintes) => {
            res.render('/votos', {ouvintes: ouvintes.map(ouv => ouv.toJSON())});
        });
    },
    async logar(req, res) {
        console.log('ENTROU NO LOGAR');
        res.render('usuario/login',{layout: 'noMenu.handlebars'});
    },
    async postLogin(req,res){
        console.log(req.body);
        const {ra, senha} = req.body;
        const ouvinte = new Ouvinte({ra, senha});

        Ouvinte.find()
        console.log("OUV");
        console.log(ouvinte);
        await ouvinte.save();

        Ouvinte.find().then((ouvintes) => {
            console.log(ouvintes);
            if(ouvintes.length > 0) {
                res.render('home');
            }
            else{
                res.redirect('/'); 
            }
            // res.render('/votos', {ouvintes: ouvintes.map(ouv => ouv.toJSON())});
        });
    },
}
