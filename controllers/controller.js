const Sequelize = require('sequelize');
const db = require('../config/db_sequelize');
const path = require('path');

/*db.sequelize.sync({force: true}).then(() => {
console.log('{ force: true }');
});*/

module.exports = {
    async postVoto(req, res) {
        db.Ouvinte.findAll({ where: {ra: req.body.ra, nota: req.body.nota}}).then (ouvintes => res.redirect('/'))
    }
}
