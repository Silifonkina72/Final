'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Massiv extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id' });
      this.belongsTo(models.Lak, { foreignKey: 'lak_id' });
      this.belongsTo(models.Ground, { foreignKey: 'ground_id' });
      this.belongsTo(models.Stain, { foreignKey: 'stain_id' });
      this.belongsTo(models.Solvent, { foreignKey: 'solvent_id' });
    }
  }
  Massiv.init({
    stain_id: DataTypes.INTEGER,
    ground_id: DataTypes.INTEGER,
    lak_id: DataTypes.INTEGER,
    solvent_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Massiv',
  });
  return Massiv;
};