const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ouvinte = Schema({
    ra: {type: String, required: true},
    senha: {type: String, required: true}
});

module.exports = mongoose.model("Ouvinte", Ouvinte)