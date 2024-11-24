'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('drivers', [
      {
        NAME: 'Homer Simpson',
        DESCRIPTION: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        CAR: 'Plymouth Valiant 1973 rosa e enferrujado',
        TAXA_KM: 2.50,
        MINIMO: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        NAME: 'Dominic Toretto',
        DESCRIPTION: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        CAR: 'Dodge Charger R/T 1970 modificado',
        TAXA_KM: 5.00,
        MINIMO: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        NAME: 'James Bond',
        DESCRIPTION: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        CAR: 'Aston Martin DB5 clássico',
        TAXA_KM: 10.00,
        MINIMO: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    },
    
   
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('drivers', null, {});
  },
};
