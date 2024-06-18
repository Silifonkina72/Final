'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paint extends Model {
   
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'paint_id' });
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