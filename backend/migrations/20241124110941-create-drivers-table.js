'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DRIVERS', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      NAME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DESCRIPTION: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CAR: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      TAXA_KM: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      MINIMO: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drivers');
  },
};