'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paint extends Model {
   
    static associate(models) {
      this.belongsToMany(models.Order, { 
        through: models.OrdersPaint,
        foreignKey: 'paint_id',
        otherKey: 'order_id'
      });
    }
  }
  Paint.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    highGrade: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paint',
  });
  return Paint;
};