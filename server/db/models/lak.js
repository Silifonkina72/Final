'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lak extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersLak,
        foreignKey: 'lak_id',
        otherKey: 'order_id'
      });
    }
  }
  Lak.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    onlyMdf: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lak',
  });
  return Lak;
};