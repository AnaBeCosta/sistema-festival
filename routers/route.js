const express = require('express');
const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const controllerAdministrador = require('../controllers/controllerAdministrador');
const controllerUsuario = require('../controllers/controllerUsuario');
const Administrador = require('../models/model_nosql/administrador');
const route = express.Router();

module.exports = route;

// Login
route.get('/', controllerUsuario.logar);
route.post("/login",controllerUsuario.postLogin);

// Home
route.get("/home",async function(req,res){
    const adm = await Administrador.findOne();
    let status;
    if(adm.votacaoAberta == true){
        status = 'aberta'
    }
    else {
        status = 'fechada'
    }
    res.render('home', {status: status, value: adm.votacaoAberta});
});


// Ouvinte
route.post('/cadastrarOuvinte', controllerOuvinte.cadastrarOuvinte);
route.get('/ouvinte', controllerOuvinte.getOuvinte);
route.post('/votar', controllerOuvinte.votar);
route.get('/votacaoAberta', controllerOuvinte.votacaoEstaAberta);
route.get('/votacao', controllerOuvinte.getVotacao);

// Candidato
route.post('/cadastrarCandidato', controllerCandidato.cadastrarCandidato);
route.get('/candidato', controllerCandidato.getCandidato);
route.get('/apresentacao', controllerCandidato.getApresentacao);
route.post('/cadastrarApresentacao', controllerCandidato.cadastrarApresentacao);
route.get('/candidato/apresentacoes', controllerCandidato.getApresentacoesCandidato);
route.post('/editarApresentacao', controllerCandidato.editarApresentacaoCandidato);
route.post('/excluirApresentacao', controllerCandidato.excluirApresentacaoCandidato);

// Administrador
route.post('/cadastrarAdministrador', controllerAdministrador.cadastrarAdm);
route.get('/administrador', controllerAdministrador.getAdm);
route.get('/ouvintes', controllerAdministrador.getOuvintes);
route.get('/candidatos', controllerAdministrador.getCandidatos);
route.post('/editarCandidato', controllerAdministrador.editarCandidato);
route.post('/editarOuvinte', controllerAdministrador.editarOuvinte);
route.post('/excluirOuvinte', controllerAdministrador.excluirOuvinte);
route.post('/excluirCandidato', controllerAdministrador.excluirCandidato);
route.get('/apresentacoes', controllerAdministrador.getApresentacoes);
route.get('/iniciarVotacao', controllerAdministrador.iniciarVotacao);
route.get('/encerrarVotacao', controllerAdministrador.encerrarVotacao);
route.get('/resultados', controllerAdministrador.getApresentacoesByQtdVotos);
