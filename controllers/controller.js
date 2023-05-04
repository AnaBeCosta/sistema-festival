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
    }
}
