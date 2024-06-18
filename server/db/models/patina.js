'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patina extends Model {
    
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'patina_id' });
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