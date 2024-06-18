'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lak extends Model {
    
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'lak_id' });
      this.hasMany(models.Massiv, { foreignKey: 'lak_id' });
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