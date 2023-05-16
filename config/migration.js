const mongoose = require('mongoose');
const Ouvinte = require('../models/model_nosql/ouvinte');
const Candidato = require('../models/model_nosql/candidato');

async function updateCampoVoto() {
  try {
    await Ouvinte.updateMany({}, { $set: { votos: false } });
    await Candidato.updateMany({}, { $set: { votos: false } });

    console.log('Tabela atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar tabela Ouvintes:', error);
  }
}

module.exports = updateCampoVoto;