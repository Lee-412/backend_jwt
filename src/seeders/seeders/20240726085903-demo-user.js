'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        email: 'JohnDoe@gmail.com',
        password: '123456',
        username: 'JohnDoe',
      },
      {
        email: 'fake1@gmail.com',
        password: '123456',
        username: 'fack1',
      },
      {
        email: 'fake2@gmail.com',
        password: '123456',
        username: 'fack2',
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
