const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const Administrador = require('../models/model_nosql/administrador');
const Ouvinte = require('../models/model_nosql/ouvinte');
const Candidato = require('../models/model_nosql/candidato');
const Apresentacao = require('../models/model_nosql/apresentacao');

module.exports = {
    async logar(req, res) {
        res.render('usuario/login',{layout: 'noMenu.handlebars'});
    },
    async postLogin(req,res){
        console.log(req.body);
        const {ra, senha} = req.body;
        const ouvinte = new Ouvinte({ra, senha});

        let ouvinteBusca = await Ouvinte.findOne({ra : ra});

        if(ouvinteBusca == null) {
            await ouvinte.save();
        }
        res.redirect('/home');
    },
}