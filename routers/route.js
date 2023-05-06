const express = require('express');
const controllerCandidato = require('../controllers/controllerCandidato');
const controllerOuvinte = require('../controllers/controllerOuvinte');
const controllerAdministrador = require('../controllers/controllerAdministrador');
const route = express.Router();

module.exports = route;

// Login

// Home


// Ouvinte
route.post('/cadastrarOuvinte', controllerOuvinte.cadastrarOuvinte);
route.get('/ouvinte', controllerOuvinte.getOuvinte);
route.put('/votar', controllerOuvinte.votar);

// Candidato
route.post('/cadastrarCandidato', controllerCandidato.cadastrarCandidato);
route.get('/candidato', controllerCandidato.getCandidato);
route.post('cadastrarApresentacao', controllerCandidato.cadastrarApresentacao);
route.get('/candidato/apresentacoes', controllerCandidato.getApresentacoesCandidato);
route.put('/editarApresentacao', controllerCandidato.editarApresentacaoCandidato);
route.delete('/excluirApresentacao', controllerCandidato.excluirApresentacaoCandidato);

// Administrador
route.post('/cadastrarAdministrador', controllerAdministrador.cadastrarAdm);
route.get('/administrador', controllerAdministrador.getAdm);
route.get('/ouvintes', controllerAdministrador.getOuvintes);
route.get('/candidatos', controllerAdministrador.getCandidatos);
route.put('/editarCandidato', controllerAdministrador.editarCandidato);
route.put('/editarOuvinte', controllerAdministrador.editarOuvinte);
route.delete('/excluirOuvinte', controllerAdministrador.excluirOuvinte);
route.delete('/excluirCandidato', controllerAdministrador.excluirCandidato);
route.get('/apresentacoes', controllerAdministrador.getApresentacoes);
route.put('/iniciarVotacao', controllerAdministrador.iniciarVotacao);
route.put('/encerrarVotacao', controllerAdministrador.encerrarVotacao);
route.get('/resultados', controllerAdministrador.getApresentacoesByQtdVotos);
