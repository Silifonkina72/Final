'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stain extends Model {
    
    static associate(models) {
      this.hasMany(models.Massiv, { foreignKey: 'stain_id' });
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