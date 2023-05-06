const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Apresentacao = Schema({
    ra_candidato: {type: String, required: true},
    musica: { type: String, required: true },
    integrantes: { type: String, required: true },
    votos: {type: Number, default: 0}
});

module.exports = mongoose.model("Apresentacao", Apresentacao)