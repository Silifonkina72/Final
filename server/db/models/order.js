'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Massiv, { foreignKey: 'order_id' });
      this.hasMany(models.Mdf, { foreignKey: 'order_id' });
    }
  }
  Order.init({
    allPrice: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    isForm: DataTypes.BOOLEAN,
    isSent: DataTypes.BOOLEAN,
    isAccept: DataTypes.BOOLEAN,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};