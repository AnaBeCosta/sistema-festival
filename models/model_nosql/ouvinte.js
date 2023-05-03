const mongoose = require('mongoose');

const ouvinte = mongoose.Schema({
    ra: {type: String, required: true},
    nota: {type: Number}
})

module.exports = mongoose.model("Ouvinte", ouvinte);