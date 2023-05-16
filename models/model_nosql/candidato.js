const mongoose = require('mongoose');

const candidato = mongoose.Schema({
    ra: {type: String, required: true},
    senha: {type: String, required: true},
    voto: {type: Boolean, default: false}
})

module.exports = mongoose.model("Candidato", candidato);