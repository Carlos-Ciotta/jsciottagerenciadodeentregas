const sequelize = require('../config/db')
const DataTypes = require('sequelize');


const Entrega = sequelize.define('Entrega', {
  id_entrega: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nome_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  telefone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_cadastro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora_cadastro: {
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
    allowNull: false,
  },
  vendedor: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

  module.exports = Entrega;