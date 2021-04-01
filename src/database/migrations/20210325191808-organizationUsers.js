'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('orgUsers', { 
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sexo: {
        type: Sequelize.STRING
      },
      data_nasc: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('orgUsers');

  }
};
