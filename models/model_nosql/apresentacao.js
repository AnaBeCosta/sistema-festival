const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Apresentacao = Schema({
    musica: { type: String, required: true },
    integrantes: { type: String, required: true },
});

module.exports = mongoose.model("Apresentacao", Apresentacao)