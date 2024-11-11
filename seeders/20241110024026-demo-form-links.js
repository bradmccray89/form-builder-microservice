'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('form_links', [
			{
				id: uuidv4(),
				form_id: 1, // Assuming form with ID 1 exists
				recipient_email: 'jane.doe@example.com',
				token: uuidv4(),
				expiration_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
				is_active: true,
				created_by: 1, // Assuming admin user with ID 1 exists
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				form_id: 2, // Assuming form with ID 2 exists
				recipient_email: 'john.smith@example.com',
				token: uuidv4(),
				expiration_date: null, // No expiration
				is_active: true,
				created_by: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			// Add more form links as needed
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('form_links', null, {});
	},
};
