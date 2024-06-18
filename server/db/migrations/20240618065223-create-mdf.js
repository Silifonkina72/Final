'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mdfs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primerInsulator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PrimerInsulators',
          key: 'id',
        },
      },
      ground_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Grounds',
          key: 'id',
        },
      },
      paint_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Paints',
          key: 'id',
        },
      },
      acrylicPrimer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AcrylicPrimers',
          key: 'id',
        },
      },
      patina_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patinas',
          key: 'id',
        },
      },
      lak_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laks',
          key: 'id',
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mdfs');
  }
};