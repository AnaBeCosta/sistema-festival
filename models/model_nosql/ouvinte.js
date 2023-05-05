const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ouvinte = Schema({
    ra: {type: String, required: true},
    nota: {type: Number}
});

module.exports = mongoose.model("Ouvinte", Ouvinte)