const Apresentacao = require('../models/model_nosql/apresentacao');
const Ouvinte = require('../models/model_nosql/ouvinte');
const Administrador = require('../models/model_nosql/administrador');
const db = require('../config/db_mongoose');

module.exports = {

    async cadastrarOuvinte(req, res) {
        const {ra, senha} = req.body;
        const ouvinte = new Ouvinte({ra, senha});
        await ouvinte.save();
        res.redirect('/home');
    },
    async getOuvinte(req, res) {
        const {ra} = req.body;
        let ouvinte = await Ouvinte.findOne({ra});
        if(ouvinte != null) return ouvinte;
        return null;
    },
    async getOuvintes(req, res) {
        Ouvinte.find().then((ouvintes) => {
            res.render('ouvintes', {ouvintes: ouvintes.map(ouv => ouv.toJSON())});
        });
    },
    async votar(req, res) {
        console.log('entrou no votar')
        const {ra_candidato, musica} = req.body;
        let apresentacao = await Apresentacao.findOne({ra_candidato, musica});
        console.log(apresentacao);
        apresentacao.votos = apresentacao.votos + 1;
        await apresentacao.save();
        res.redirect('/home');
    },
    async votacaoEstaAberta(req, res) {
        res.redirect('/votacao');
    },
    async getVotacao(req, res) {
        const apresentacoes = await Apresentacao.find();
        res.render('votacao/votacao', {apresentacoes: apresentacoes.map(apresentacoes => apresentacoes.toJSON())});
    }

}