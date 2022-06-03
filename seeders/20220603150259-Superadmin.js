'use strict';
const bycrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const password = await bycrypt.hash('123456', 10);
     await queryInterface.bulkInsert('Superadmins', [{
      email: 'brizki121@gmail.com',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
