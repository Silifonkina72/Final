'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersPrimerInsulator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdersPrimerInsulator.init({
    order_id: DataTypes.INTEGER,
    primerInsulator_id: DataTypes.INTEGER,
    quantity: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'OrdersPrimerInsulator',
  });
  return OrdersPrimerInsulator;
};