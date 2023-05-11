const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const Administrador = require('../models/model_nosql/administrador');
const Ouvinte = require('../models/model_nosql/ouvinte');
const Candidato = require('../models/model_nosql/candidato');
const Apresentacao = require('../models/model_nosql/apresentacao');

module.exports = {
    async logar(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        console.log(req.session)

        // verificação dos campos
        if (req.body.ra == '' || req.body.senha == '') {
            res.render('usuario/login');
        }
        const { ra, senha } = req.body;

        // busca se há usuário com ra indicado
        let ouvinteBusca = await Ouvinte.findOne({ ra: ra });
        let candidatoBusca = await Candidato.findOne({ ra: ra });
        let admBusca = await Administrador.findOne({ ra: ra });

        // verificar se é administrador
        if (admBusca != null) {
            req.session.user = 'adm';
        }
        // se não for administrador, verifica se é candidato
        else if (candidatoBusca != null) {
            req.session.user = 'cand';
        }
        // se não for administrador nem candidato, é ouvinte
        else {
            req.session.user = 'ouv';
        }

        // se não houver, cadastra como ouvinte
        if (ouvinteBusca == null) {
            const ouvinte = new Ouvinte({ ra, senha });
            await ouvinte.save();
        }

        // verificacão da senha
        let senhaVerificada;
        switch (req.session.user) {
            case 'adm':
                senhaVerificada = admBusca.senha === req.body.senha;
                break;
            case 'cand':
                senhaVerificada = candidatoBusca.senha === req.body.senha;
                break;
            case 'ouv':
                if (ouvinteBusca != null) {
                    senhaVerificada = ouvinteBusca.senha === req.body.senha;
                }
                else {
                    // caso onde o ouvinte acabou de ser cadastrado
                    senhaVerificada = true;
                }
                break;
        }

        if (senhaVerificada) {
            req.session.ra = req.body.ra;
            console.log(req.session)
            res.redirect('/home');
        }
        else {
            req.session.destroy();
            res.render('usuario/login');
        }
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.render('usuario/login');
    }
}