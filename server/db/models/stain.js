'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stain extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersStain,
        foreignKey: 'stain_id',
        otherKey: 'order_id'
      });
    }
  }
  Stain.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    intensity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stain',
  });
  return Stain;
};