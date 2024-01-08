const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:c1eH6deEAg12f3aHCAGFegb15162ddGg@viaduct.proxy.rlwy.net:55196/railway');

sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync();

module.exports = sequelize;