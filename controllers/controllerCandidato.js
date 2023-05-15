const Candidato = require('../models/model_nosql/candidato');
const Apresentacao = require('../models/model_nosql/apresentacao');
const Ouvinte = require('../models/model_nosql/ouvinte');

module.exports = {

    async cadastrarCandidato(req, res) {
        const { ra, senha } = req.body;
        const candidato = new Candidato({ ra, senha });
        await candidato.save();
        res.redirect('/home');
    },
    async getCandidato(req, res) {
        const { ra } = req.body;
        let candidato = await Candidato.findOne({ ra });
        if (candidato != null) return candidato;
        return null;
    },

    async cadastrarApresentacao(req, res) {
        console.log('entrou no cadastrar apresentacao');
        console.log(req.session)
        const ra_candidato = req.session.ra;
        console.log(ra_candidato)
        const apresentacao = new Apresentacao({ ra_candidato: ra_candidato, musica: req.body.musica, integrantes: req.body.integrantes });
        console.log(apresentacao);
        let candidato = await Candidato.findOne({ ra: ra_candidato });
        
        if (candidato == null) {
            let ouvinte = await Ouvinte.findOne({ ra: ra_candidato });
            console.log(ouvinte);
            const candidato = new Candidato({ ra: ouvinte.ra, senha: ouvinte.senha });
            await candidato.save();
        }

        if(req.session.user =='ouv'){
            req.session.user = 'cand';
        }
        
        await apresentacao.save();
        await Apresentacao.find().then((e) => console.log(e))
        
        res.redirect('/home');
    },

    async getTelaCadastrarApresentacao(req, res) {
        res.render('apresentacao/cadastrarApresentacao');
    },

    async getApresentacaoCadastradas(req, res) {
        await Apresentacao.find().then((apresentacoes) => {
            res.render('apresentacao/apresentacoesCadastradas', {apresentacoes: apresentacoes.map(apresentacoes => apresentacoes.toJSON())});
        });
    },
    async getApresentacoesCandidato(req, res) {
        const ra = req.session.ra;
        await Apresentacao.find({ ra_candidato: ra }).then((apresentacoes) => {
            res.render('apresentacao/apresentacoesList',
                {
                    apresentacoes: apresentacoes.map(
                        apresentacoes => apresentacoes.toJSON()
                    )
                });
        });
    },
    async editarApresentacaoCandidato(req, res) {
        const ra = req.session.ra;
        const { musica, integrantes } = req.body;
        const update = { musica, integrantes };
        let apresentacao = await Apresentacao.findOne({ ra_candidato: ra });
        await Apresentacao.updateOne(apresentacao, update);

        apresentacao.musica = update.musica;
        apresentacao.integrantes = update.integrantes;
        await apresentacao.save();

        res.redirect('/home');
    },
    async excluirApresentacaoCandidato(req, res) {
        const ra = req.session.ra;
        const musica = req.body.musica;
        let apresentacao = await Apresentacao.findOne({ ra_candidato: ra, musica: musica });
        if (apresentacao != null) {
            await Apresentacao.deleteOne({ ra_candidato: apresentacao.ra_candidato, musica: apresentacao.musica })
        }
        res.redirect('/home');
    },
}


/*  console.log('entrou no cadastrar apresentacao');
const { ra_candidato, musica, integrantes } = req.body;
const apresentacao = new Apresentacao({ ra_candidato, musica, integrantes })
let candidato = await Candidato.findOne({ ra: apresentacao.ra_candidato })

if (candidato == null) {
    let ouvinte = await Ouvinte.findOne({ ra: apresentacao.ra_candidato });
    const candidato = new Candidato({ ra: ouvinte.ra, senha: ouvinte.senha });
    await candidato.save();
}

await apresentacao.save();
await Apresentacao.find().then((e) => console.log(e))

res.redirect('/home');*/