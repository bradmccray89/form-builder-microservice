'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('form_response_answers', [
			// Responses for form_response_id: 1 (Customer Feedback Form)
			{
				id: 1,
				form_response_id: 1,
				form_field_id: 1, // Name
				value: 'Jane Doe',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 2,
				form_response_id: 1,
				form_field_id: 2, // Email
				value: 'jane.doe@example.com',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 3,
				form_response_id: 1,
				form_field_id: 3, // Feedback Type
				value: 'suggestion',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 4,
				form_response_id: 1,
				form_field_id: 4, // Additional Comments
				value: 'Great service overall!',
				created_at: new Date(),
				updated_at: new Date(),
			},

			// Responses for form_response_id: 2 (Employee Survey)
			{
				id: 5,
				form_response_id: 2,
				form_field_id: 5, // Employee ID
				value: 'EMP12345',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 6,
				form_response_id: 2,
				form_field_id: 6, // Department
				value: 'engineering',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 7,
				form_response_id: 2,
				form_field_id: 7, // Satisfaction Level
				value: 'satisfied',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 8,
				form_response_id: 2,
				form_field_id: 8, // Suggestions for Improvement
				value: 'Provide more training opportunities.',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);

		// Reset sequence counter
		await queryInterface.sequelize.query(
			`SELECT setval('"form_response_answers_id_seq"', (SELECT MAX(id) FROM "form_response_answers"))`
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('form_response_answers', null, {});
	},
};
