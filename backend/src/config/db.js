const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:FD-CBH5f65cG1HB-eE-11bdfc16g-55F@viaduct.proxy.rlwy.net:35180/railway');

sequelize
    .authenticate()
    .then(() => console.log('Authenticated'))
    .catch(() => console.log('Error Auth'));

sequelize.sync();

module.exports = sequelize;