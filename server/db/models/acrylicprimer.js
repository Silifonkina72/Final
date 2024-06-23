'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcrylicPrimer extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersAcrylicPrimer,
        foreignKey: 'acrylicPrimer_id',
        otherKey: 'order_id'
      });
    }
  }
  AcrylicPrimer.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AcrylicPrimer',
  });
  return AcrylicPrimer;
};