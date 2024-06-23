'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patina extends Model {
    
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersPatina,
        foreignKey: 'patina_id',
        otherKey: 'order_id'
      });
    }
  }
  Patina.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patina',
  });
  return Patina;
};