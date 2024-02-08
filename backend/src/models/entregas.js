const sequelize = require('../config/db')
const DataTypes = require('sequelize');


const Entrega = sequelize.define('Entrega', {
  id_entrega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  id_veiculo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_entrega: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

  module.exports = Entrega;