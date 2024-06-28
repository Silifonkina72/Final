'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersLak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdersLak.init({
    order_id: DataTypes.INTEGER,
    lak_id: DataTypes.INTEGER,
    quantity: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'OrdersLak',
  });
  return OrdersLak;
};