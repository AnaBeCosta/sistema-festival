const mongoose = require('mongoose');

const candidato = mongoose.Schema({
    ra: {type: String, required: true}
})

module.exports = mongoose.model("Candidato", candidato);