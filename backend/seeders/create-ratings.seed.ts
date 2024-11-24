'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch drivers to get their IDs
    const drivers = await queryInterface.sequelize.query(
      'SELECT * FROM drivers WHERE drivers."ID" IN (1, 2, 3);',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Create seed data for ratings
    await queryInterface.bulkInsert('ratings', [
      {
        STARS: 5,
        COMMENT: 'Fantastic service!',
        DRIVER_ID:   1, // Reference to the first driver
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        STARS: 4,
        COMMENT: 'Very good experience.',
        DRIVER_ID:   2, // Reference to the second driver
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        STARS: 3,
        COMMENT: 'Average ride, could be better.',
        DRIVER_ID:   3, // Reference to the first driver again
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ratings', null, {});
  },
};
