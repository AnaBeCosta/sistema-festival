const express = require('express');
const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const controllerAdministrador = require('../controllers/controllerAdministrador');
const controllerUsuario = require('../controllers/controllerUsuario');
const route = express.Router();

module.exports = route;

// Login
route.get('/', controllerUsuario.logar);
route.post("/login",controllerUsuario.postLogin);

// Home
route.get("/home",function(req,res){res.render('home')});


// Ouvinte
route.post('/cadastrarOuvinte', controllerOuvinte.cadastrarOuvinte);
route.get('/ouvinte', controllerOuvinte.getOuvinte);
route.put('/votar', controllerOuvinte.votar);
route.get('/votacaoAberta', controllerOuvinte.votacaoEstaAberta);

// Candidato
route.post('/cadastrarCandidato', controllerCandidato.cadastrarCandidato);
route.get('/candidato', controllerCandidato.getCandidato);
route.get('/apresentacao', controllerCandidato.getApresentacao);
route.post('/cadastrarApresentacao', controllerCandidato.cadastrarApresentacao);
route.get('/candidato/apresentacoes', controllerCandidato.getApresentacoesCandidato);
route.put('/editarApresentacao', controllerCandidato.editarApresentacaoCandidato);
route.delete('/excluirApresentacao', controllerCandidato.excluirApresentacaoCandidato);

// Administrador
route.post('/cadastrarAdministrador', controllerAdministrador.cadastrarAdm);
route.get('/administrador', controllerAdministrador.getAdm);
route.get('/ouvintes', controllerAdministrador.getOuvintes);
route.get('/candidatos', controllerAdministrador.getCandidatos);
route.put('/editarCandidato', controllerAdministrador.editarCandidato);
route.post('/editarOuvinte', controllerAdministrador.editarOuvinte);
route.post('/excluirOuvinte', controllerAdministrador.excluirOuvinte);
route.delete('/excluirCandidato', controllerAdministrador.excluirCandidato);
route.get('/apresentacoes', controllerAdministrador.getApresentacoes);
route.get('/iniciarVotacao', controllerAdministrador.iniciarVotacao);
route.get('/encerrarVotacao', controllerAdministrador.encerrarVotacao);
route.get('/resultados', controllerAdministrador.getApresentacoesByQtdVotos);
