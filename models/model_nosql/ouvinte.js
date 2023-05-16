const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ouvinte = Schema({
    ra: {type: String, required: true},
    senha: {type: String, required: true},
    voto: {type: Boolean, default: false}
});


module.exports = mongoose.model("Ouvinte", Ouvinte)