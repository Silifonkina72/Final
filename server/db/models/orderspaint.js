'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersPaint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrdersPaint.init({
    order_id: DataTypes.INTEGER,
    paint_id: DataTypes.INTEGER,
    quantity: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'OrdersPaint',
  });
  return OrdersPaint;
};