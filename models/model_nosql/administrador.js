const mongoose = require('mongoose');

const Administrador = mongoose.Schema({
    ra: {type: String, required: true},
    senha: {type: String, required: true},
    votacaoAberta: {type: Boolean, default: false}
});

module.exports = mongoose.model("Administrador", Administrador);