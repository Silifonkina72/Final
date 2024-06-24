'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
    
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      
      this.belongsToMany(models.Lak, { 
        through: models.OrdersLak,
        foreignKey: 'order_id',
        otherKey: 'lak_id'
      });

      this.belongsToMany(models.AcrylicPrimer, { 
        through: models.OrdersAcrylicPrimer,
        foreignKey: 'order_id',
        otherKey: 'acrylicPrimer_id'
      });
      this.belongsToMany(models.Ground, { 
        through: models.OrdersGround,
        foreignKey: 'order_id',
        otherKey: 'ground_id'
      });
      this.belongsToMany(models.Paint, { 
        through: models.OrdersPaint,
        foreignKey: 'order_id',
        otherKey: 'paint_id'
      });
      this.belongsToMany(models.Patina, { 
        through: models.OrdersPatina,
        foreignKey: 'order_id',
        otherKey: 'patina_id'
      });
      this.belongsToMany(models.PrimerInsulator, { 
        through: models.OrdersPrimerInsulator,
        foreignKey: 'order_id',
        otherKey: 'primerInsulator_id'
      });
      this.belongsToMany(models.Stain, { 
        through: models.OrdersStain,
        foreignKey: 'order_id',
        otherKey: 'stain_id'
      });
    }
  }
  Order.init({
    allPrice: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    isForm: DataTypes.BOOLEAN,
    isSent: DataTypes.BOOLEAN,
    isAccept: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
    
  });
  return Order;
};