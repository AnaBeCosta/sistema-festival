const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const Administrador = require('../models/model_nosql/administrador');
const Ouvinte = require('../models/model_nosql/ouvinte');
const Candidato = require('../models/model_nosql/candidato');
const Apresentacao = require('../models/model_nosql/apresentacao');

module.exports = {
    async cadastrarAdm(req, res) {
        const {ra, senha} = req.body;
        const adm = new Administrador({ra, senha});
        await adm.save();
        res.redirect('/home');
    },
    async getAdm(req, res) {
        const {ra} = req.body;
        let adm = await Administrador.findOne({ra});
        if(adm != null) return adm;
        return null;
    },
    async getOuvintes(req, res) {
        await Ouvinte.find().then((ouvintes) => {
            res.render('/ouvintes', {ouvintes: ouvintes.map(ouvintes => ouvintes.toJSON())});
        });
    },
    async getCandidatos(req, res) {
        await Candidato.find().then((candidatos) => {
            res.render('/candidatos', {candidatos: candidatos.map(candidatos => candidatos.toJSON())});
        });
    },
    async editarOuvinte(req, res) {
        const {ra, senha} = req.body;
        const update = {ra, senha};
        let ouvinte = await Ouvinte.findOne({ra : ra});
        await Ouvinte.updateOne(ouvinte, update);

        ouvinte.ra = update.ra;
        ouvinte.senha = update.senha;
        await ouvinte.save();

        res.redirect('/home');
    },
    async editarCandidato(req, res) {
        const {ra, senha} = req.body;
        const update = {ra, senha};
        let candidato = await Candidato.findOne({ra : ra});
        await Candidato.updateOne(candidato, update);

        candidato.ra = update.ra;
        candidato.senha = update.senha;
        await candidato.save();

        res.redirect('/home');
    },
    async excluirOuvinte(req, res) {
        let ouvinte = await controllerOuvinte.getOuvinte(req);
        if(ouvinte == null) return;

        await ouvinte.remove();
        res.redirect('/home');
    },
    async excluirCandidato(req, res) {
        let candidato = await controllerCandidato.getCandidato(req);
        if(candidato == null) return;

        await candidato.remove();
        res.redirect('/home');
    },
    async getApresentacoes(req, res) {
        await Apresentacao.find().then((apresentacoes) => {
            res.render('/apresentacoes', {apresentacoes: apresentacoes.map(apresentacoes => apresentacoes.toJSON())});
        });
    },
    async editarApresentacao(req, res) {
        await controllerCandidato.editarApresentacaoCandidato(req, res);
    },
    async excluirApresentacaoAdministrador(req, res) {
        await controllerCandidato.excluirApresentacaoCandidato(req, res);
    },
    async iniciarVotacao(req, res) {
        let adm = await Administrador.findOne();
        adm.votacaoAberta = true;
        await Administrador.updateOne(adm, {votacaoAberta: true});
        await adm.save();
    },
    async encerrarVotacao(req, res) {
        let adm = await Administrador.findOne();
        adm.votacaoAberta = false;
        await Administrador.updateOne(adm, {votacaoAberta: false});
        await adm.save();
    },
    async getApresentacoesByQtdVotos(req, res) {
        let apresentacoes = await Apresentacao.find();
        apresentacoes.sort((a, b) => b.votos - a.votos);
        res.render('/apresentacoesByVotos', {apresentacoes: apresentacoes.map(apresentacoes => apresentacoes.toJSON())});
    }
}
