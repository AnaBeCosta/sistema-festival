const Apresentacao = require('../models/model_nosql/apresentacao');
const Ouvinte = require('../models/model_nosql/ouvinte');

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
    async votar(req, res) {
        const {musica} = req.body;
        let apresentacao = await Apresentacao.findOne({musica});
        apresentacao.votos = apresentacao.votos + 1;
        await apresentacao.save;
        res.redirect('/home');

    }

}