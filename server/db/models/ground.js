'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ground extends Model {
   
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'ground_id' });
      this.hasMany(models.Massiv, { foreignKey: 'ground_id' });
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