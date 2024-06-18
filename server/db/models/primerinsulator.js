'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrimerInsulator extends Model {
   
    static associate(models) {
      this.hasMany(models.Mdf, { foreignKey: 'primerInsulator_id' });
      
    }
  }
  PrimerInsulator.init({
    priceArea: DataTypes.INTEGER,
    priceVolume: DataTypes.INTEGER,
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrimerInsulator',
  });
  return PrimerInsulator;
};