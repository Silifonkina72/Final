'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcrylicPrimer extends Model {
    
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'acrylicPrimer_id' });
    }
  }
  AcrylicPrimer.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AcrylicPrimer',
  });
  return AcrylicPrimer;
};