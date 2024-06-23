'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ground extends Model {
   
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersGround,
        foreignKey: 'ground_id',
        otherKey: 'order_id'
      });
    }
  }
  Ground.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ground',
  });
  return Ground;
};