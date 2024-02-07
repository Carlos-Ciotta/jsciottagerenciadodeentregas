const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:4BgCdHFahH64he5FC2BeEg3642CeGCC5@monorail.proxy.rlwy.net:22414/railway');

sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync();

module.exports = sequelize;