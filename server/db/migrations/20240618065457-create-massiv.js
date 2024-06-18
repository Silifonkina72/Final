'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Massivs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stain_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stains',
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
      lak_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Laks',
          key: 'id',
        },
      },
      solvent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Solvents',
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
    await queryInterface.dropTable('Massivs');
  }
};