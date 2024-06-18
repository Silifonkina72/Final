'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solvent extends Model {
    
    static associate(models) {
      this.hasMany(models.Massiv, { foreignKey: 'solvent_id' });
    }
  }
  Solvent.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Solvent',
  });
  return Solvent;
};