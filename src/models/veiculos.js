const sequelize = require('./config/db')
const DataTypes = require('sequelize');
const Entrega = require('./entregas');

const Veiculo = sequelize.define('Veiculo', {
  id_veiculo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_veiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  n_entregas_m: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  p_retorno_m: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  n_entregas_t: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  p_retorno_t: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Entrega,
      key: 'id_entrega',
    },
  },
});