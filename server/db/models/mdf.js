'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mdf extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: 'order_id' });
      this.belongsTo(models.PrimerInsulator, { foreignKey: 'primerInsulator_id' });
      this.belongsTo(models.Paint, { foreignKey: 'paint_id' });
      this.belongsTo(models.AcrylicPrimer, { foreignKey: 'acrylicPrimer_id' });
      this.belongsTo(models.Patina, { foreignKey: 'patina_id' });
      this.belongsTo(models.Lak, { foreignKey: 'lak_id' });
      this.belongsTo(models.Ground, { foreignKey: 'ground_id' });
    }
  }
  Mdf.init({
    primerInsulator_id: DataTypes.INTEGER,
    ground_id: DataTypes.INTEGER,
    paint_id: DataTypes.INTEGER,
    acrylicPrimer_id: DataTypes.INTEGER,
    patina_id: DataTypes.INTEGER,
    lak_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mdf',
  });
  return Mdf;
};